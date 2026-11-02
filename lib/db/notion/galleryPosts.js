import { bodyExcerpt, countContentImages } from '@/lib/gallery/content'
export { bodyExcerpt, countContentImages } from '@/lib/gallery/content'
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
