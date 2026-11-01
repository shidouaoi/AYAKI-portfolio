import SmartLink from '@/components/SmartLink'
import { groupGalleryPosts } from '../lib/gallery'
import { useState } from 'react'
import NotionIcon from './NotionIcon'

function GalleryImage({ src, icon }) {
  const [failedSource, setFailedSource] = useState(null)
  const [longSource, setLongSource] = useState(null)
  return src && failedSource !== src ? (
    <>
      <img
      className={`haru-gallery-cover${longSource === src ? ' is-long' : ''}`}
      src={src}
      alt=''
      loading='lazy'
      decoding='async'
      onLoad={event => {
        const image = event.currentTarget
        setLongSource(image.naturalHeight / image.naturalWidth > 4 / 3 ? src : null)
      }}
      onError={() => setFailedSource(src)}
    />
      {longSource === src && (
        <span className='haru-gallery-crop-fade' aria-hidden='true' />
      )}
    </>
  ) : (
    <span className='haru-gallery-empty'>
      {icon ? <NotionIcon icon={icon} className='haru-gallery-icon' /> : '暂无图片'}
    </span>
  )
}

export default function BlogGallery({ posts }) {
  return (
    <div id='posts-wrapper' className='haru-gallery'>
      {Object.entries(groupGalleryPosts(posts)).map(([month, items]) => (
        <section key={month} aria-label={month}>
          <h2 className='haru-archive-month dark:text-gray-300'>{month}</h2>
          <div className='haru-gallery-grid'>
            {items.map(post => (
              <SmartLink
                key={post.id}
                href={post.href}
                className='card haru-gallery-card'
                aria-label={post.title}
              >
                <div className='haru-gallery-media'>
                  <GalleryImage src={post.galleryImage} icon={post.pageIcon} />
                  {Number.isInteger(post.ext?.galleryImageCount) && post.ext.galleryImageCount > 1 && (
                    <span className='haru-gallery-count' aria-label={`共 ${post.ext.galleryImageCount} 张图片`}>
                      {post.ext.galleryImageCount}
                    </span>
                  )}
                </div>
                <div className='haru-gallery-copy'>
                  <p className='title font-bold'>
                    <time dateTime={post.date?.start_date || undefined}>
                      {post.publishDay || post.date?.start_date || '日期未定'}
                    </time>
                  </p>
                  <p className='description haru-gallery-summary'>
                    {post.summary || '暂无简介'}
                  </p>
                </div>
              </SmartLink>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
