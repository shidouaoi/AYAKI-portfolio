import {
  selectChatPosts,
  newestPosts,
  hasCategory
} from '@/themes/haru/lib/home'
describe('Haru home content', () => {
  it('selects only the latest five chat posts across the full catalog', () => {
    const posts = Array.from({ length: 8 }, (_, i) => ({
      title: String(i),
      category: i % 2 ? ['杂谈', '作品'] : '杂谈',
      publishDate: i + 1
    }))
    posts.push({ title: 'other', category: '作品', publishDate: 100 })
    expect(selectChatPosts(posts).map(post => post.title)).toEqual([
      '7',
      '6',
      '5',
      '4',
      '3'
    ])
    expect(posts[0].title).toBe('0')
  })
  it('keeps chat empty when the category has no posts', () =>
    expect(selectChatPosts([{ category: '心情随笔' }])).toEqual([]))
  it('supports date fallback and matches complete category names', () => {
    expect(
      newestPosts([
        { title: 'old', date: { start_date: '2025-01-01' } },
        { title: 'new', date: { start_date: '2026-01-01' } }
      ])[0].title
    ).toBe('new')
    expect(hasCategory({ category: '杂谈相关' }, '杂谈')).toBe(false)
  })
})
