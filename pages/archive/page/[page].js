import ArchiveIndex from '@/components/ArchiveIndex'
import BLOG from '@/blog.config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { siteConfig } from '@/lib/config'
import { GALLERY_PAGE_SIZE } from '@/lib/gallery/pagination'

export default ArchiveIndex

export async function getStaticProps(context) {
  const { getArchiveProps } = await import('@/lib/gallery/archive.server')
  return getArchiveProps(context)
}

export async function getStaticPaths({ locales }) {
  if (!process.env.EXPORT) return { paths: [], fallback: 'blocking' }

  const paths = []
  for (const locale of locales ?? [undefined]) {
    const props = await fetchGlobalAllData({ from: 'archive-paths', locale })
    if (siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG) !== 'haru')
      continue
    const count = props.allPages.filter(
      post => post.type === 'Post' && post.status === 'Published'
    ).length
    for (let page = 2; page <= Math.ceil(count / GALLERY_PAGE_SIZE); page++) {
      paths.push({ params: { page: String(page) }, ...(locale && { locale }) })
    }
  }
  return { paths, fallback: false }
}
