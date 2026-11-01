import CONFIG from '../config'
import { formatDateFmt } from '@/lib/utils/formatDate'

export { GALLERY_PAGE_SIZE, paginateGalleryPosts } from '@/lib/gallery/pagination'

export function galleryNames(value) {
  if (Array.isArray(value)) {
    return [...new Set(value.filter(name => typeof name === 'string').map(name => name.trim()).filter(Boolean))]
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
  return [...new Set(list.split(/[,，\n]/).map(name => name.trim().replace(/^["']|["']$/g, '').trim()).filter(Boolean))]
}

export function homeHiddenCategories(config = {}) {
  return [...new Set([
    ...galleryNames(config.HARU_GALLERY_CATEGORIES ?? CONFIG.HARU_GALLERY_CATEGORIES),
    ...galleryNames(config.HARU_HOME_HIDDEN_CATEGORIES ?? CONFIG.HARU_HOME_HIDDEN_CATEGORIES)
  ])]
}

export function galleryEnabled(config = {}, taxonomy) {
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

export function groupGalleryPosts(posts = []) {
  const groups = {}
  const sorted = [...posts].sort(
    (a, b) => (b.publishDate || 0) - (a.publishDate || 0)
  )
  sorted.forEach(post => {
    const month = Number.isFinite(post.publishDate)
      ? formatDateFmt(post.publishDate, 'yyyy-MM')
      : post.date?.start_date?.slice(0, 7) || '日期未定'
    if (!groups[month]) groups[month] = []
    groups[month].push(post)
  })
  return groups
}
