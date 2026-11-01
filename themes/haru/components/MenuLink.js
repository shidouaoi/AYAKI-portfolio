import SmartLink from '@/components/SmartLink'

import { siteConfig } from '@/lib/config'

// RSS 是资源地址，需要浏览器直接请求，避免进入客户端页面路由。
const MenuLink = ({ href, children, ...props }) => {
  if (
    typeof href === 'string' &&
    /\/rss\/(?:feed\.xml|atom\.xml|feed\.json)(?:[?#]|$)/.test(href)
  ) {
    const subPath = String(siteConfig('SUB_PATH', '') || '').replace(
      /^\/+|\/+$/g,
      ''
    )
    const file = href.match(/\/rss\/(feed\.xml|atom\.xml|feed\.json)/)[1]
    const feedHref = '/' + (subPath ? subPath + '/' : '') + 'rss/' + file
    return (
      <a {...props} href={feedHref} target='_blank' rel='noopener noreferrer'>
        {children}
      </a>
    )
  }

  return (
    <SmartLink href={href} {...props}>
      {children}
    </SmartLink>
  )
}

export default MenuLink
