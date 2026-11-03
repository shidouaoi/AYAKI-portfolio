import CONFIG from '../config'

export {
  GALLERY_PAGE_SIZE,
  paginateGalleryPosts
} from '@/lib/gallery/pagination'

export function galleryNames(value) {
  if (Array.isArray(value)) {
    return [
      ...new Set(
        value
          .filter(name => typeof name === 'string')
          .map(name => name.trim())
          .filter(Boolean)
      )
    ]
  }
  if (typeof value !== 'string') return []
  const normalized = value.trim()
  try {
    const parsed = JSON.parse(normalized)
    if (Array.isArray(parsed)) return galleryNames(parsed)
  } catch (_) {
    // Accept common Notion text formats without evaluating configuration as code.
  }
  const list = normalized.replace(/^\s*\[/, '').replace(/\]\s*$/, '')
  return [
    ...new Set(
      list
        .split(/[,，\n]/)
        .map(name =>
          name
            .trim()
            .replace(/^["']|["']$/g, '')
            .trim()
        )
        .filter(Boolean)
    )
  ]
}

export function homeHiddenCategories(config = {}) {
  return [
    ...new Set([
      ...galleryNames(
        config.HARU_GALLERY_CATEGORIES ?? CONFIG.HARU_GALLERY_CATEGORIES
      ),
      ...galleryNames(
        config.HARU_HOME_HIDDEN_CATEGORIES ?? CONFIG.HARU_HOME_HIDDEN_CATEGORIES
      )
    ])
  ]
}

export function galleryEnabled(config = {}, taxonomy) {
  const all = config.HARU_GALLERY_ALL ?? CONFIG.HARU_GALLERY_ALL
  if (all === true || all === 'true')
    return Boolean(taxonomy.category || taxonomy.tag)

  return Boolean(
    (taxonomy.category &&
      galleryNames(
        config.HARU_GALLERY_CATEGORIES ?? CONFIG.HARU_GALLERY_CATEGORIES
      ).includes(taxonomy.category)) ||
    (taxonomy.tag &&
      galleryNames(
        config.HARU_GALLERY_TAGS ?? CONFIG.HARU_GALLERY_TAGS
      ).includes(taxonomy.tag))
  )
}
