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
        className='haru-archive-month dark:text-gray-300'
      >
        {archiveTitle}
      </div>

      <ul className='haru-archive-posts'>
        {archivePosts[archiveTitle]?.map(post => (
          <li key={post.id}>
            <SmartLink
              passHref
              href={post?.href}
              className='haru-archive-card'
            >
              <div className='haru-archive-date'>
                {post.date?.start_date}
              </div>

              <div className='haru-archive-title'>
                {post.title}
              </div>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}