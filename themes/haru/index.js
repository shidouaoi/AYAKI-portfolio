'use client'

import { hasCategory, newestPosts } from './lib/home'

/**
 * # Haru 主题说明（基于 Danbouru）
 * 主题开发者 [emengweb](https://github.com/emengweb)
 * 魔改者 [猫鱼](https://cat-fish.net)
 * 开启方式 在blog.config.js 将主题配置为 `haru`
 */

import { siteConfig } from '@/lib/config'
import { isBrowser } from '@/lib/utils'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { ArticleLock } from './components/ArticleLock'
import CONFIG from './config'
import HaruHome from './components/HaruHome'
import LinkPolicy from './components/LinkPolicy'
import PurchaseCalloutStyle from './components/PurchaseCalloutStyle'
import HaruArticleLayout from './components/HaruArticleLayout'
import BlogGallery from './components/BlogGallery'
import PaginationSimple from './components/PaginationSimple'
import { GALLERY_PAGE_SIZE } from './lib/gallery'
import { Style } from './style'

const WWAds = dynamic(() => import('@/components/WWAds'), { ssr: false })
const AdSlot = dynamic(
  () => import('@/components/GoogleAdsense').then(mod => mod.AdSlot),
  {
    ssr: false
  }
)
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const NotionPage = dynamic(() => import('@/components/NotionPage'), {
  ssr: true
})
const BlogPostCard = dynamic(() => import('./components/BlogPostCard'), {
  ssr: true
})
const CategoryItem = dynamic(() => import('./components/CategoryItem'), {
  ssr: true
})
const TagItemMini = dynamic(() => import('./components/TagItemMini'), {
  ssr: true
})
const TocDrawer = dynamic(() => import('./components/TocDrawer'), { ssr: true })

// 主题全局变量
const ThemeGlobalNav = createContext()
export const useNavGlobal = () => useContext(ThemeGlobalNav)

/**
 * 基础布局
 * 采用左右两侧布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, post, allNavPages, categoryOptions } = props
  const router = useRouter()
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px) and (pointer: coarse)')
    let start = null

    function onStart(event) {
      start = null
      if (!mobile.matches || event.touches.length !== 1) return
      if (
        event.target.closest?.(
          'input, textarea, select, [contenteditable], iframe'
        )
      )
        return
      const touch = event.touches[0]
      // Leave the outermost edge available for the browser's native gesture.
      if (touch.clientX < 20 || touch.clientX > 48) return
      for (
        let node = event.target;
        node instanceof HTMLElement;
        node = node.parentElement
      ) {
        if (
          node.scrollWidth > node.clientWidth &&
          /auto|scroll/.test(getComputedStyle(node).overflowX)
        )
          return
      }
      start = { x: touch.clientX, y: touch.clientY, time: Date.now() }
    }

    function onMove(event) {
      if (!start) return
      if (
        event.touches.length !== 1 ||
        Math.abs(event.touches[0].clientY - start.y) > 35
      )
        start = null
    }

    function onEnd(event) {
      const origin = start
      start = null
      if (!origin || event.touches.length || Date.now() - origin.time > 700)
        return
      const touch = event.changedTouches[0]
      if (
        touch.clientX - origin.x >= 90 &&
        Math.abs(touch.clientY - origin.y) <= 35
      ) {
        window.history.back()
      }
    }

    function onCancel() {
      start = null
    }

    const listeners = {
      touchstart: onStart,
      touchmove: onMove,
      touchend: onEnd,
      touchcancel: onCancel
    }
    for (const [name, handler] of Object.entries(listeners)) {
      window.addEventListener(name, handler, { passive: true })
    }
    return () => {
      for (const [name, handler] of Object.entries(listeners)) {
        window.removeEventListener(name, handler)
      }
    }
  }, [router.asPath])
  const [tocVisible, changeTocVisible] = useState(false)
  const [pageNavVisible, changePageNavVisible] = useState(false)
  const [filteredNavPages, setFilteredNavPages] = useState(allNavPages)
  useEffect(() => {
    setFilteredNavPages(allNavPages)
  }, [post, allNavPages])
  if (router.pathname === '/')
    return (
      <div id='theme-haru' className='haru-home-shell'>
        <LinkPolicy NOTION_CONFIG={props.NOTION_CONFIG} />
        {children}
      </div>
    )
  return (
    <ThemeGlobalNav.Provider
      value={{
        tocVisible,
        changeTocVisible,
        filteredNavPages,
        setFilteredNavPages,
        allNavPages,
        pageNavVisible,
        changePageNavVisible,
        categoryOptions
      }}
    >
      <Style />
      <LinkPolicy NOTION_CONFIG={props.NOTION_CONFIG} />
      <HaruArticleLayout {...props}>{children}</HaruArticleLayout>
    </ThemeGlobalNav.Provider>
  )
}

const LayoutIndex = props => {
  return <HaruHome {...props} />
}

/**
 * 文章列表
 * @param {*} props
 * @returns
 */
// 分类和标签的文章列表
const GalleryLayout = ({ posts, postCount, page, pageSize, children }) => (
  <div className='haru-gallery-layout'>
    {children}
    <BlogGallery posts={posts} />
    {postCount > pageSize && (
      <PaginationSimple
        page={page}
        totalPage={Math.ceil(postCount / pageSize)}
      />
    )}
  </div>
)

const LayoutPostList = props => {
  const { posts } = props
  const router = useRouter()

  // 从当前 URL 判断是 Tag 结果页还是 Category 结果页
  const currentPath = router.asPath.split('?')[0]

  const decodePathValue = value => {
    if (!value) return ''
    try {
      return decodeURIComponent(value)
    } catch {
      return value
    }
  }

  const tagMatch = currentPath.match(/\/tag\/([^/?#]+)/)
  const categoryMatch = currentPath.match(/\/category\/([^/?#]+)/)

  const currentTag = tagMatch ? decodePathValue(tagMatch[1]) : ''
  const currentCategory = categoryMatch ? decodePathValue(categoryMatch[1]) : ''

  const title = (
    <>
      {/* Tag 文章结果标题 */}
      {currentTag && (
        <h1 className='haru-page-title dark:text-gray-300'>
          <i className='mr-3 fas fa-tag' />
          Tag：{currentTag}
        </h1>
      )}

      {/* Category 文章结果标题 */}
      {currentCategory && (
        <h1 className='haru-page-title dark:text-gray-300'>
          <i className='mr-3 fa-solid fa-book' />
          Category：{currentCategory}
        </h1>
      )}
    </>
  )

  if (props.galleryMode) {
    return (
      <GalleryLayout {...props} pageSize={GALLERY_PAGE_SIZE}>
        {title}
      </GalleryLayout>
    )
  }

  return (
    <div className='w-full max-w-7xl justify-center mt-12 mx-auto'>
      {title}
      <div
        id='posts-wrapper'
        className='card-list grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
      >
        {posts?.map(post => (
          <BlogPostCard key={post.id} post={post} className='card' />
        ))}
      </div>
    </div>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const categories = (
    Array.isArray(post?.category) ? post.category : [post?.category]
  ).filter(Boolean)
  const related = newestPosts(props.allNavPages || []).filter(item =>
    categories.some(category => hasCategory(item, category))
  )
  const position = related.findIndex(
    item => item.id === post?.id || item.slug === post?.slug
  )
  const prev = position >= 0 ? related[position + 1] : null
  const next = position > 0 ? related[position - 1] : null
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      const timer = setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector(
            '#article-wrapper #notion-article'
          )
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, waiting404)
      return () => clearTimeout(timer)
    }
  }, [post, router, waiting404])
  return (
    <>
      {/* 文章锁 */}
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && (
        <div id='container'>
          {/* title */}
          <h1 className='haru-page-title dark:text-gray-300'>{post?.title}</h1>
          {post?.category && (
            <div className='haru-title-category'>
              <i className='fa-solid fa-book' />
              <CategoryItem category={post.category} noHover />
            </div>
          )}

          {/* Notion文章主体 */}
          {post && (
            <section className='px-1'>
              <PurchaseCalloutStyle post={post} />
              <div id='article-wrapper'>
                <NotionPage post={post} />
              </div>

              {/* 分享 */}
              {/* <ShareBar post={post} /> */}
              {/* 文章分类和标签信息 */}
              {post.type === 'Post' && (
                <>
                  <div className='post-footer-meta text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-x-4 gap-y-2'>
                    {/* 创建日期+修改日期 */}
                    <div className='post-footer-date-row'>
                      {post?.publishDay && (
                        <span className='post-footer-date inline-flex items-center'>
                          <i className='fa-solid fa-clock-rotate-left' />
                          {post.publishDay}
                        </span>
                      )}

                      {post?.lastEditedDay && (
                        <span className='post-footer-date post-footer-date-edited inline-flex items-center'>
                          {post.lastEditedDay}
                        </span>
                      )}
                    </div>
                    {/* 分类 */}
                    {post?.category && (
                      <span className='post-footer-category inline-flex items-center'>
                        <i className='fa-solid fa-book' />
                        <CategoryItem category={post.category} noHover />
                      </span>
                    )}
                    {/* 标签 */}
                    {post?.tagItems?.length > 0 && (
                      <span className='post-footer-tags inline-flex items-center flex-wrap'>
                        <i className='fas fa-tags mr-1.5' />
                        {post.tagItems.map(tag => (
                          <TagItemMini key={tag.name} tag={tag} footerStyle />
                        ))}
                      </span>
                    )}
                  </div>
                </>
              )}
              {/* 同分类的上一篇、下一篇文章 */}

              {post?.type === 'Post' && (
                <nav className='haru-article-around' aria-label='前後の記事'>
                  {prev && (
                    <SmartLink href={prev.href || '/' + prev.slug}>
                      <i
                        className='fa-solid fa-angles-left'
                        aria-hidden='true'
                      />
                      <span>{prev.title}</span>
                    </SmartLink>
                  )}
                  {next && (
                    <SmartLink href={next.href || '/' + next.slug}>
                      <span>{next.title}</span>
                      <i
                        className='fa-solid fa-angles-right'
                        aria-hidden='true'
                      />
                    </SmartLink>
                  )}
                </nav>
              )}
              {post?.type === 'Post' && (prev || next) && (
                <hr className='haru-mobile-article-divider my-8 border-gray-200 dark:border-gray-700' />
              )}
              <AdSlot />
              <WWAds className='w-full' orientation='horizontal' />

              <Comment frontMatter={post} />
            </section>
          )}

          <TocDrawer {...props} />
        </div>
      )}
    </>
  )
}

/**
 * 没有搜索
 * 全靠页面导航
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  return <></>
}

/**
 * 归档页面基本不会用到
 * 全靠页面导航
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => (
  <GalleryLayout {...props} pageSize={GALLERY_PAGE_SIZE}>
    <h1 className='haru-page-title dark:text-gray-300'>
      <i className='mr-3 fas fa-clock-rotate-left' aria-hidden='true' />
      最近の投稿
    </h1>
  </GalleryLayout>
)

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    const timer = setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/').then(() => {
          // console.log('找不到页面', router.asPath)
        })
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <div className='md:-mt-20 text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
        <div className='dark:text-gray-200'>
          <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'>
            <i className='mr-2 fas fa-spinner animate-spin' />
            404
          </h2>
          <div className='inline-block text-left h-32 leading-10 items-center'>
            <h2 className='m-0 p-0'>
              ページを表示できません。ホームに戻ります。
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * 分类列表
 * 不用{locale.COMMON.CATEGORY}，统一成英文
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props

  return (
    <>
      <div className='py-10'>
        <h1 className='haru-page-title dark:text-gray-300'>
          <i className='mr-3 fa-solid fa-book' />
          Categories
        </h1>

        <div id='category-list' className='haru-taxonomy-list'>
          {categoryOptions?.map(category => {
            return (
              <SmartLink
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior
              >
                <div className='haru-taxonomy-item'>
                  <i className='mr-3 fas fa-folder' />
                  {category.name} ({category.count})
                </div>
              </SmartLink>
            )
          })}
        </div>
      </div>
    </>
  )
}

/**
 * 标签列表
 * 原主题nav根本没写！！！danbouru补上。
 */
/*const LayoutTagIndex = props => {
  return <></>
}*/
const LayoutTagIndex = props => {
  const { tagOptions } = props

  return (
    <div className='w-full'>
      <h1 className='haru-page-title dark:text-gray-300'>
        <i className='mr-3 fas fa-tags' />
        Tags
      </h1>

      <div id='tags-list' className='haru-taxonomy-list'>
        {tagOptions?.map(tag => (
          <SmartLink
            key={tag.name}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            passHref
          >
            <div className='haru-taxonomy-item'>
              <i className='mr-3 fas fa-tag' />
              {tag.name}
              {tag.count ? ` (${tag.count})` : ''}
            </div>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
