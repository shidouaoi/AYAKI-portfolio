import { addGalleryImages } from '@/lib/db/notion/galleryPosts'
import {
  GALLERY_PAGE_SIZE,
  paginateGalleryPosts
} from '@/lib/gallery/pagination'
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { formatDateFmt } from '@/lib/utils/formatDate'

export async function getArchiveProps({ locale, params }) {
  const page = Number(params?.page ?? 1)
  if (!Number.isSafeInteger(page) || page < 1) return { notFound: true }
  const props = await fetchGlobalAllData({ from: 'archive-index', locale })
  const posts = (props.allPages || []).filter(
    post => post.type === 'Post' && post.status === 'Published'
  )
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  if (theme === 'haru') {
    if (page > 1 && (page - 1) * GALLERY_PAGE_SIZE >= posts.length) {
      return { notFound: true }
    }
    props.postCount = posts.length
    props.page = page
    props.posts = paginateGalleryPosts(posts, page)
    await addGalleryImages(props)
  } else {
    if (page > 1) return { notFound: true }
    props.posts = posts
    props.archivePosts = {}
    for (const post of [...posts].sort(
      (a, b) => b.publishDate - a.publishDate
    )) {
      const month = formatDateFmt(post.publishDate, 'yyyy-MM')
      ;(props.archivePosts[month] ??= []).push(post)
    }
  }
  delete props.allPages

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}
