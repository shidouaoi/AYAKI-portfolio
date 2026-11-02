import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { siteConfig } from '@/lib/config'
import { applyLinkPolicy } from '../lib/linkPolicy'

// Theme-scoped handling also covers anchors emitted by Notion and third-party blocks.
export default function LinkPolicy({ NOTION_CONFIG }) {
  const { asPath } = useRouter()
  const siteUrl = siteConfig('LINK', '', NOTION_CONFIG)
  useEffect(() => {
    const root = document.getElementById('theme-haru')
    if (!root) return
    const normalize = anchor =>
      applyLinkPolicy(anchor, siteUrl, window.location.href)
    const scan = node => {
      if (!(node instanceof Element)) return
      if (node.matches('a[href]')) normalize(node)
      node.querySelectorAll('a[href]').forEach(normalize)
    }
    scan(root)
    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'attributes') {
          if (record.target.matches('a[href]')) normalize(record.target)
        } else record.addedNodes.forEach(scan)
      }
    })
    observer.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['href', 'target', 'rel']
    })
    const onActivate = event => {
      const anchor =
        event.target instanceof Element ? event.target.closest('a[href]') : null
      if (anchor && root.contains(anchor)) normalize(anchor)
    }
    root.addEventListener('click', onActivate, true)
    root.addEventListener('auxclick', onActivate, true)
    return () => {
      observer.disconnect()
      root.removeEventListener('click', onActivate, true)
      root.removeEventListener('auxclick', onActivate, true)
    }
  }, [asPath, siteUrl])
  return null
}
