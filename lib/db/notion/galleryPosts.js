import { fetchNotionPageBlocks } from './getPostBlocks'
import { adapterNotionBlockMap } from '@/lib/utils/notion.util'
import { getPublicPostBlockMap } from '@/lib/utils/publicPost'
import BLOG from '@/blog.config'
import { galleryEnabled as danbouruGalleryEnabled } from '@/themes/danbouru/lib/gallery'
import { galleryEnabled as haruGalleryEnabled } from '@/themes/haru/lib/gallery'
import { mapImgUrl } from './mapImage'

export function isGalleryPage(props, taxonomy) {
  const theme = props.NOTION_CONFIG?.THEME || BLOG.THEME
  if (theme === 'haru') return haruGalleryEnabled(props.NOTION_CONFIG, taxonomy)
  if (theme === 'danbouru')
    return danbouruGalleryEnabled(props.NOTION_CONFIG, taxonomy)
  return false
}

export function firstContentImage(recordMap, pageId) {
  const blocks = recordMap?.block || {}
  const read = id => {
    const entry =
      blocks[id] ||
      blocks[
        Object.keys(blocks).find(
          key => key.replace(/-/g, '') === id.replace(/-/g, '')
        )
      ]
    return entry?.value?.value || entry?.value
  }
  const visited = new Set()
  const walk = id => {
    if (visited.has(id)) return null
    visited.add(id)
    const block = read(id)
    if (!block) return null
    if (block.type === 'image') {
      const source =
        block.properties?.source?.[0]?.[0] || block.format?.display_source
      if (source) return mapImgUrl(source, block)
    }
    if (
      id !== pageId &&
      ['page', 'collection_view', 'collection_view_page'].includes(block.type)
    )
      return null
    for (const child of block.content || []) {
      const image = walk(child)
      if (image) return image
    }
    return null
  }
  return walk(pageId)
}

export async function addGalleryImages(props) {
  // Haru uses public bodies for image counts and missing summaries.
  if ((props.NOTION_CONFIG?.THEME || BLOG.THEME) === 'haru') {
    const posts = [...props.posts]
    let cursor = 0
    await Promise.all(
      Array.from({ length: Math.min(3, posts.length) }, async () => {
        while (cursor < posts.length) {
          const index = cursor++
          const post = posts[index]
          if (post.password) continue
          try {
            const raw = await fetchNotionPageBlocks(
              post.id,
              'haru-gallery-summary'
            )
            const recordMap = getPublicPostBlockMap(
              post,
              adapterNotionBlockMap(raw),
              props.allPages
            )
            posts[index] = {
              ...post,
              summary: post.summary?.trim()
                ? post.summary
                : bodyExcerpt(recordMap, post.id),
              ext: {
                ...post.ext,
                galleryImageCount: countContentImages(recordMap, post.id)
              }
            }
          } catch (error) {
            console.warn(
              'Unable to generate gallery summary',
              post.id,
              error.message
            )
          }
        }
      })
    )
    props.posts = posts
  }
  props.posts = props.posts.map(post => ({
    ...post,
    galleryImage: post.password
      ? ''
      : post.pageCoverThumbnail || post.pageCover || ''
  }))
}

export function bodyExcerpt(recordMap, pageId, length = 120) {
  const blocks = recordMap?.block || {}
  const visited = new Set()
  const parts = []
  const walk = id => {
    if (visited.has(id) || parts.join(' ').length >= length) return
    visited.add(id)
    const block = blocks[id]?.value
    if (!block) return
    if (
      id !== pageId &&
      ['page', 'collection_view', 'collection_view_page', 'callout'].includes(
        block.type
      )
    )
      return
    if (
      [
        'text',
        'header',
        'sub_header',
        'sub_sub_header',
        'bulleted_list',
        'numbered_list',
        'quote',
        'to_do'
      ].includes(block.type)
    ) {
      const text = (block.properties?.title || [])
        .map(part => part[0])
        .join('')
        .replace(/\s+/g, ' ')
        .trim()
      if (text) parts.push(text)
    }
    for (const child of block.content || []) walk(child)
  }
  walk(pageId)
  const text = parts.join(' ')
  return text.length > length ? text.slice(0, length).trimEnd() + '…' : text
}

export function countContentImages(recordMap, pageId) {
  const blocks = recordMap?.block || {}
  const visited = new Set()
  const walk = id => {
    if (visited.has(id)) return 0
    visited.add(id)
    const block = blocks[id]?.value
    if (!block) return 0
    if (
      id !== pageId &&
      ['page', 'collection_view', 'collection_view_page'].includes(block.type)
    )
      return 0
    let count = block.type === 'image' ? 1 : 0
    for (const child of block.content || []) count += walk(child)
    const source = block.format?.transclusion_reference_pointer?.id
    if (source) count += walk(source)
    return count
  }
  return walk(pageId)
}
