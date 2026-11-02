export function getLinkPolicy(href, siteUrl, currentUrl) {
  if (typeof href !== 'string' || !href.trim()) return null
  try {
    const current = new URL(currentUrl)
    const url = new URL(href, current)
    if (!['http:', 'https:'].includes(url.protocol)) return null
    const origins = new Set([current.origin])
    if (siteUrl) origins.add(new URL(siteUrl, current).origin)
    return { external: !origins.has(url.origin) }
  } catch {
    return null
  }
}

export function applyLinkPolicy(anchor, siteUrl, currentUrl) {
  const policy = getLinkPolicy(anchor.getAttribute('href'), siteUrl, currentUrl)
  if (!policy) return
  if (policy.external) {
    if (anchor.getAttribute('target') !== '_blank')
      anchor.setAttribute('target', '_blank')
    const rel = new Set(
      (anchor.getAttribute('rel') || '').split(/\s+/).filter(Boolean)
    )
    rel.add('noopener')
    rel.add('noreferrer')
    const value = [...rel].join(' ')
    if (anchor.getAttribute('rel') !== value) anchor.setAttribute('rel', value)
  } else if (anchor.hasAttribute('target')) {
    anchor.removeAttribute('target')
  }
}
