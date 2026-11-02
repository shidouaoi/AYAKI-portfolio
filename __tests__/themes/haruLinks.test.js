import { getLinkPolicy, applyLinkPolicy } from '@/themes/haru/lib/linkPolicy'
const site = 'https://ayaki.example'
const current = 'http://localhost:3000/haru-biyori/chapter'
describe('Haru link policy', () => {
  it.each([
    '/tag/漫画',
    '#purchase',
    '?page=2',
    'https://ayaki.example/about',
    'http://localhost:3000/about'
  ])('keeps %s internal', href => {
    expect(getLinkPolicy(href, site, current)).toEqual({ external: false })
  })
  it.each([
    'https://shop.example/book',
    '//shop.example/book',
    'https://ayaki.example.evil.test'
  ])('opens %s externally', href => {
    expect(getLinkPolicy(href, site, current)).toEqual({ external: true })
  })
  it.each(['mailto:author@example.com', 'tel:12345'])('preserves %s', href => {
    expect(getLinkPolicy(href, site, current)).toBeNull()
  })
  it('preserves existing rel values, is idempotent, and handles changing URLs', () => {
    const a = document.createElement('a')
    a.href = 'https://shop.example'
    a.rel = 'nofollow'
    applyLinkPolicy(a, site, current)
    expect(a.target).toBe('_blank')
    expect(a.rel).toBe('nofollow noopener noreferrer')
    applyLinkPolicy(a, site, current)
    expect(a.rel).toBe('nofollow noopener noreferrer')
    a.setAttribute('href', '/about')
    applyLinkPolicy(a, site, current)
    expect(a.hasAttribute('target')).toBe(false)
  })
})
