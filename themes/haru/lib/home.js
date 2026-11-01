export const CHAT_CATEGORY = '杂谈'
export function hasCategory(post, category) {
  return (
    Array.isArray(post.category) ? post.category : [post.category]
  ).includes(category)
}
export function newestPosts(posts = []) {
  return [...posts].sort((a, b) => {
    const time = post =>
      Number(post.publishDate) ||
      Date.parse(post.date?.start_date || post.publishDay || '') ||
      0
    return time(b) - time(a)
  })
}
export function selectChatPosts(posts = []) {
  return newestPosts(
    posts.filter(post => hasCategory(post, CHAT_CATEGORY))
  ).slice(0, 5)
}
