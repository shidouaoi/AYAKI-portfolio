import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * 简易翻页插件
 * @param page 当前页码
 * @param totalPage 是否有下一页
 * @returns {JSX.Element}
 * @constructor
 */
const PaginationSimple = ({ page = 1, totalPage, showPageCount = false }) => {
  const router = useRouter()
  const currentPage = +page
  const showNext = currentPage < totalPage
  const pagePrefix = router.asPath
    .split(/[?#]/)[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')

  return (
    <nav
      className={
        showPageCount
          ? 'haru-pagination haru-pagination-numbered'
          : 'haru-pagination'
      }
      aria-label='ページ送り'
    >
      {currentPage > 1 && (
        <SmartLink
          href={{
            pathname:
              currentPage === 2
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          passHref
          rel='prev'
          className='haru-pagination-link'
        >
          <i
            className='fa-solid fa-circle-chevron-right haru-pagination-icon haru-pagination-prev'
            aria-hidden='true'
          />
          <span>PREV</span>
        </SmartLink>
      )}
      {showPageCount && (
        <span
          className='haru-pagination-count'
          aria-label={`全${totalPage}ページ中${currentPage}ページ`}
        >
          {currentPage}/{totalPage}
        </span>
      )}
      {showNext && (
        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          passHref
          rel='next'
          className='haru-pagination-link haru-pagination-next'
        >
          <i
            className='fa-solid fa-circle-chevron-right haru-pagination-icon'
            aria-hidden='true'
          />
          <span>NEXT</span>
        </SmartLink>
      )}
    </nav>
  )
}

export default PaginationSimple
