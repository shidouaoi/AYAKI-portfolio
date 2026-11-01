export const GALLERY_PAGE_SIZE = 24

export function paginateGalleryPosts(posts = [], page = 1) {
  const currentPage = Math.max(1, Number(page) || 1)
  return [...posts]
    .sort((a, b) => (b.publishDate || 0) - (a.publishDate || 0))
    .slice(
      (currentPage - 1) * GALLERY_PAGE_SIZE,
      currentPage * GALLERY_PAGE_SIZE
    )
}
