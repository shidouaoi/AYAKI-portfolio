/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import HOME_TOPICS from '../homeTopics'
import SOCIAL_LINKS from '../socialLinks'
import { CHAT_CATEGORY, hasCategory, newestPosts } from '../lib/home'
import { normalizeNotionIconUrl } from '../lib/normalizeNotionIconUrl'
import { HomeStyle } from '../homeStyle'
const NotionPage = dynamic(() => import('@/components/NotionPage'), {
  ssr: true
})
const Fa = ({ name = 'fas fa-layer-group' }) => (
  <i className={name} aria-hidden='true' />
)
const url = post => post.href || '/' + post.slug
const imageIcon = value =>
  typeof value === 'string' &&
  (value.startsWith('http') ||
    value.startsWith('data:image') ||
    value.startsWith('/'))
function PostIcon({ value }) {
  const icon = normalizeNotionIconUrl(value)
  return (
    <span className='haru-home-post-icon'>
      {imageIcon(icon) ? (
        <img src={icon} alt='' loading='lazy' />
      ) : icon ? (
        <span>{icon}</span>
      ) : (
        <Fa />
      )}
    </span>
  )
}
function PostCard({ post }) {
  return (
    <SmartLink href={url(post)} className='haru-home-post-card'>
      <PostIcon value={post.pageIcon} />
      <span className='haru-home-post-copy'>
        <span className='haru-home-post-title'>{post.title || '无标题'}</span>
        <span className='haru-home-post-summary'>{post.summary}</span>
      </span>
    </SmartLink>
  )
}
function ChatCard({ post }) {
  return (
    <article className='haru-home-chat'>
      <svg
        className='haru-home-chat-outline'
        viewBox='0 0 500 720'
        preserveAspectRatio='none'
        aria-hidden='true'
      >
        <path
          d='M62 8 C100 -5 135 23 196 18 L367 9 C441 13 479 42 473 108 C486 105 498 96 503 92 Q507 89 505 95 C501 113 489 124 468 128 C455 221 483 298 471 390 C461 483 478 566 470 646 C474 689 435 715 383 710 C279 704 233 708 172 712 C109 716 53 720 24 691 C-9 657 16 583 16 535 C10 461 0 419 9 350 C18 275 23 232 13 171 C1 108 -2 39 35 17 C43 11 52 8 62 8 Z'
          fill='white'
          stroke='#e3d7d2'
          strokeWidth='3.5'
          vectorEffect='non-scaling-stroke'
        />
        <path
          d='M35 17 C43 11 52 8 62 8 C100 -5 135 23 196 18 C165 38 133 62 90 62 C55 63 35 49 35 17 Z'
          fill='#e3d7d2'
        />
        <image
          href='/haru/chat-title.png'
          x='53'
          y='12'
          width='100'
          height='43'
          preserveAspectRatio='xMidYMid meet'
        />
      </svg>
      <div
        className='haru-home-chat-content'
        tabIndex={0}
        role='region'
        aria-label='最新杂谈正文'
      >
        {post ? (
          <>
            <h2>
              <SmartLink href={url(post)}>{post.title || '无标题'}</SmartLink>
            </h2>
            {post.blockMap ? (
              <NotionPage post={post} />
            ) : (
              <>
                <p>{post.summary}</p>
                {!post.password &&
                  (post.pageCoverThumbnail || post.pageCover) && (
                    <img
                      className='haru-home-chat-cover'
                      src={post.pageCoverThumbnail || post.pageCover}
                      alt=''
                    />
                  )}
                <SmartLink className='haru-home-more' href={url(post)}>
                  <span>more</span>
                  <Fa name='fa-solid fa-angles-right' />
                </SmartLink>
              </>
            )}
          </>
        ) : (
          <p className='haru-home-empty'>还没有杂谈，下一次见面再聊吧。</p>
        )}
      </div>
    </article>
  )
}
function Profile({ siteInfo, NOTION_CONFIG, chatPosts }) {
  const settings = NOTION_CONFIG || {}
  const get = key => siteConfig(key, '', settings)
  const socials = SOCIAL_LINKS
  return (
    <aside className='haru-home-profile'>
      <div className='haru-home-avatar'>
        {siteInfo?.icon && (
          <img src={siteInfo.icon} alt={siteInfo.title || '头像'} />
        )}
      </div>
      <h1>{siteInfo?.title || get('AUTHOR')}</h1>
      <p className='haru-home-bio'>{siteInfo?.description}</p>
      <nav className='haru-home-socials' aria-label='个人链接'>
        {socials.map((link, index) =>
          link.url ? (
            <a
              key={index}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={link.label || '社交链接'}
            >
              <Fa name={link.icon} />
            </a>
          ) : (
            <span
              className='haru-home-social-placeholder'
              key={index}
              aria-hidden='true'
            >
              <Fa name={link.icon} />
            </span>
          )
        )}
      </nav>
      <div className='haru-home-chat-list'>
        {chatPosts.map(post => (
          <SmartLink key={post.id || post.slug} href={url(post)}>
            <span>{post.title || '无标题'}</span>
            <time dateTime={post.date?.start_date || undefined}>
              {formatDate(post)}
            </time>
          </SmartLink>
        ))}
        {chatPosts.length === 0 && (
          <p className='haru-home-empty'>杂谈更新会出现在这里。</p>
        )}
        <SmartLink
          className='haru-home-more'
          href={'/category/' + encodeURIComponent(CHAT_CATEGORY)}
        >
          <span>more</span>
          <Fa name='fa-solid fa-angles-right' />
        </SmartLink>
      </div>
    </aside>
  )
}
function formatDate(post) {
  const date = new Date(
    post.publishDate || post.date?.start_date || post.publishDay
  )
  return Number.isNaN(date.getTime())
    ? '—'
    : String(date.getUTCMonth() + 1).padStart(2, '0') +
        '/' +
        String(date.getUTCDate()).padStart(2, '0')
}
export function HomeFooter({ NOTION_CONFIG, siteInfo }) {
  const author =
    NOTION_CONFIG?.AUTHOR ||
    siteInfo?.author ||
    siteInfo?.title ||
    siteConfig('AUTHOR')
  const year = new Date().getFullYear()
  const since = siteConfig('SINCE', year)
  return (
    <footer className='haru-home-footer'>
      <span>
        {author} © {String(since) === String(year) ? year : since + '–' + year}
      </span>
      <span className='haru-home-footer-divider'>/</span>
      <span>
        Powered By{' '}
        <a href='https://github.com/notionnext-org/NotionNext'>
          NotionNext {siteConfig('VERSION')}
        </a>
      </span>
      <span className='haru-home-footer-divider'>/</span>
      <span className='busuanzi_container_site_pv'>
        <Fa name='fa-solid fa-glasses' />{' '}
        <span className='busuanzi_value_site_pv'>—</span>
      </span>
      <span className='busuanzi_container_site_uv'>
        <Fa name='fa-solid fa-paw' />{' '}
        <span className='busuanzi_value_site_uv'>—</span>
      </span>
    </footer>
  )
}
export default function HaruHome(props) {
  const posts = newestPosts(props.haruHomePosts || props.posts || [])
  const chatPosts = props.haruChatPosts || []
  const categories = [
    ...new Set([
      ...(props.categoryOptions || []).map(item => item.name),
      ...posts.flatMap(post =>
        Array.isArray(post.category) ? post.category : [post.category]
      )
    ])
  ].filter(name => name && name !== CHAT_CATEGORY)
  const topics = categories.map(category => ({
    id: category,
    title: category,
    category,
    ...HOME_TOPICS.find(topic => topic.category === category)
  }))
  return (
    <>
      <HomeStyle />
      <main className='haru-home-main'>
        <section className='haru-home-intro' aria-label='近况与简介'>
          <ChatCard post={props.haruChatPost} />
          <Profile {...props} chatPosts={chatPosts} />
        </section>
        <section className='haru-home-works' aria-label='作品列表'>
          <h2 className='haru-home-works-title'>
            <img src='/haru/works-title.png' alt='作品リスト' />
          </h2>
          {topics.map(topic => {
            const categoryPosts = posts.filter(post =>
              hasCategory(post, topic.category)
            )
            const items = categoryPosts.slice(
              0,
              Math.min(4, Math.max(1, Number(topic.limit) || 4))
            )
            const cover =
              topic.src ||
              items.find(post => post.pageCoverThumbnail)?.pageCoverThumbnail
            return (
              <section
                className={`haru-home-topic${items.length === 4 ? ' haru-home-topic-full' : ''}`}
                key={topic.id}
              >
                <SmartLink
                  href={
                    topic.href ||
                    '/category/' + encodeURIComponent(topic.category)
                  }
                  className='haru-home-topic-cover'
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt={topic.alt || topic.title}
                      loading='lazy'
                    />
                  ) : (
                    <Fa />
                  )}
                </SmartLink>
                <div className='haru-home-topic-content'>
                  <h3>
                    <SmartLink
                      href={
                        topic.href ||
                        '/category/' + encodeURIComponent(topic.category)
                      }
                    >
                      <Fa name='fa-solid fa-book' /> {topic.title}
                    </SmartLink>
                  </h3>
                  <p className='haru-home-topic-description'>
                    {topic.description || items[0]?.summary}
                  </p>
                  {topic.note && (
                    <p className='haru-home-topic-note'>{topic.note}</p>
                  )}
                  <div className='haru-home-post-grid'>
                    {items.map(post => (
                      <PostCard key={post.id || post.slug} post={post} />
                    ))}
                  </div>
                  {categoryPosts.length > 0 && (
                    <SmartLink
                      className='haru-home-more haru-home-topic-more'
                      href={'/category/' + encodeURIComponent(topic.category)}
                    >
                      <span>more</span>
                      <Fa name='fa-solid fa-angles-right' />
                    </SmartLink>
                  )}
                  {items.length === 0 && (
                    <p className='haru-home-empty'>这个作品还没有发布文章。</p>
                  )}
                </div>
              </section>
            )
          })}
        </section>
      </main>
      <HomeFooter {...props} />
    </>
  )
}
