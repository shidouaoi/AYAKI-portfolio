/* eslint-disable @next/next/no-img-element */
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import SOCIAL_LINKS from '../socialLinks'
import { newestPosts } from '../lib/home'
import { HomeStyle } from '../homeStyle'
import { ArticleStyle } from '../articleStyle'
import { HomeFooter } from './HaruHome'

function MenuLinks({ items = [] }) {
  return (
    <ul className='haru-article-menu'>
      {items
        .filter(item => item.show !== false)
        .map((item, index) => (
          <li key={item.id || index}>
            <SmartLink href={item.href || '#'} title={item.title}>
              {item.icon && <i className={item.icon} aria-hidden='true' />}
              <span>{item.title}</span>
            </SmartLink>
            {item.subMenus?.length > 0 && <MenuLinks items={item.subMenus} />}
          </li>
        ))}
    </ul>
  )
}
function SidebarSection({ title, icon, children }) {
  return (
    <section className='haru-article-sidebar-section'>
      <h2>
        <i className={icon} aria-hidden='true' />
        {title}
      </h2>
      {children}
    </section>
  )
}
export default function HaruArticleLayout(props) {
  const {
    children,
    siteInfo,
    NOTION_CONFIG,
    customMenu = [],
    allNavPages = [],
    latestPosts = [],
    categoryOptions = [],
    tagOptions = []
  } = props
  const recent = newestPosts(
    allNavPages.length ? allNavPages : latestPosts
  ).slice(0, 10)
  const name = siteInfo?.title || siteConfig('AUTHOR')
  return (
    <div id='theme-haru' className='haru-home-shell haru-article-shell'>
      <HomeStyle />
      <ArticleStyle />
      <div className='haru-article-layout'>
        <main className='haru-article-main'>{children}</main>
        <aside className='haru-article-sidebar' aria-label='博客导航'>
          <div className='haru-article-profile'>
            <SmartLink
              href='/'
              aria-label='返回首页'
              className='haru-home-avatar'
            >
              {siteInfo?.icon && <img src={siteInfo.icon} alt={name} />}
            </SmartLink>
            <SmartLink href='/' className='haru-article-name'>
              {name}
            </SmartLink>
            <p>{siteInfo?.description}</p>
            <nav className='haru-home-socials' aria-label='个人链接'>
              {SOCIAL_LINKS.filter(link => link.url).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={link.label || '社交链接'}
                >
                  <i className={link.icon} aria-hidden='true' />
                </a>
              ))}
            </nav>
          </div>
          <SidebarSection title='自定义菜单' icon='fa-solid fa-book'>
            <MenuLinks items={customMenu || []} />
          </SidebarSection>
          <SidebarSection title='最新发布' icon='fa-solid fa-clock'>
            <ul className='haru-article-recent'>
              {recent.map(item => (
                <li key={item.id || item.slug}>
                  <SmartLink
                    href={item.href || '/' + item.slug}
                    title={item.title}
                  >
                    {item.title || '无标题'}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </SidebarSection>
          <SidebarSection title='分类' icon='fa-solid fa-book'>
            <ul>
              {(categoryOptions || []).map(item => (
                <li key={item.name}>
                  <SmartLink
                    href={'/category/' + encodeURIComponent(item.name)}
                  >
                    {item.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </SidebarSection>
          <SidebarSection title='标签' icon='fa-solid fa-tags'>
            <div className='haru-article-tags'>
              {(tagOptions || []).map(item => (
                <SmartLink
                  key={item.name}
                  href={'/tag/' + encodeURIComponent(item.name)}
                >
                  #{item.name}
                </SmartLink>
              ))}
            </div>
          </SidebarSection>
        </aside>
      </div>
      <HomeFooter NOTION_CONFIG={NOTION_CONFIG} siteInfo={siteInfo} />
    </div>
  )
}
