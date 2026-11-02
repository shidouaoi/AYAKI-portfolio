import { JA } from '../labels'
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import TagItemMini from './TagItemMini'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import SOCIAL_LINKS from '../socialLinks'
import { newestPosts } from '../lib/home'
import { HomeStyle } from '../homeStyle'
import { ArticleStyle } from '../articleStyle'
import { HomeFooter } from './HaruHome'

function MenuEntry({ item }) {
  const [open, setOpen] = useState(false)
  const hasChildren = item.subMenus?.some(child => child.show !== false)
  const label = (
    <>
      {item.icon && <i className={item.icon} aria-hidden='true' />}
      <span>{item.title}</span>
    </>
  )
  return (
    <li>
      {hasChildren ? (
        <button
          type='button'
          className='haru-menu-toggle'
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {label}
          <i
            className={
              open ? 'fa-solid fa-angle-down' : 'fa-solid fa-angle-right'
            }
            aria-hidden='true'
          />
        </button>
      ) : (
        <SmartLink href={item.href || '#'} title={item.title}>
          {label}
        </SmartLink>
      )}
      {hasChildren && open && <MenuLinks items={item.subMenus} />}
    </li>
  )
}
function MenuLinks({ items = [] }) {
  return (
    <ul className='haru-article-menu'>
      {items
        .filter(item => item.show !== false)
        .map((item, index) => (
          <MenuEntry key={item.id || index} item={item} />
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
              aria-label={JA.home}
              className='haru-home-avatar'
            >
              {siteInfo?.icon && <img src={siteInfo.icon} alt={name} />}
            </SmartLink>
            <div className='haru-article-profile-copy'>
              <SmartLink href='/' className='haru-article-name'>
                {name}
              </SmartLink>
              <p>{siteInfo?.description}</p>
              <nav className='haru-home-socials' aria-label={JA.links}>
                {SOCIAL_LINKS.filter(link => link.url).map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={link.label || JA.links}
                  >
                    <i className={link.icon} aria-hidden='true' />
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className='haru-sidebar-links'>
            <nav className='haru-article-sidebar-section' aria-label={JA.menu}>
              <MenuLinks items={customMenu || []} />
            </nav>
            <SidebarSection title={JA.recent} icon='fa-solid fa-clock'>
              <ul className='haru-article-recent'>
                {recent.map(item => (
                  <li key={item.id || item.slug}>
                    <SmartLink
                      href={item.href || '/' + item.slug}
                      title={item.title}
                    >
                      {item.title || JA.untitled}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </SidebarSection>
          </div>
          <div className='haru-sidebar-taxonomies'>
            <SidebarSection title={JA.categories} icon='fa-solid fa-book'>
              <ul className='haru-article-categories'>
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
            <SidebarSection title={JA.tags} icon='fa-solid fa-tags'>
              <div className='haru-article-tags'>
                {(tagOptions || []).map(item => (
                  <TagItemMini key={item.name} tag={item} footerStyle />
                ))}
              </div>
            </SidebarSection>
          </div>
        </aside>
      </div>
      <HomeFooter NOTION_CONFIG={NOTION_CONFIG} siteInfo={siteInfo} />
    </div>
  )
}
