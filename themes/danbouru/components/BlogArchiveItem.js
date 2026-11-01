import SmartLink from '@/components/SmartLink'

/**
 * 归档分组
 */
export default function BlogArchiveItem({ archiveTitle, archivePosts }) {
  return (
    <div key={archiveTitle}>
      {/* 月份标题 */}
      <div
        id={archiveTitle}
        className='danbouru-archive-month dark:text-gray-300'
      >
        {archiveTitle}
      </div>

      <ul className='danbouru-archive-posts'>
        {archivePosts[archiveTitle]?.map(post => (
          <li key={post.id}>
            <SmartLink
              passHref
              href={post?.href}
              className='danbouru-archive-card'
            >
              <div className='danbouru-archive-date'>
                {post.date?.start_date}
              </div>

              <div className='danbouru-archive-title'>
                {post.title}
              </div>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}