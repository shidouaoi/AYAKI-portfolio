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

export function addGalleryImages(props) {
  // Covers already belong to the catalog; gallery generation needs no body requests.
  props.posts = props.posts.map(post => ({
    ...post,
    galleryImage: post.password
      ? ''
      : post.pageCoverThumbnail || post.pageCover || ''
  }))
}
