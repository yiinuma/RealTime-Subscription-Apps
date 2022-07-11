import Image from 'next/image'
import { FC, memo } from 'react'

import { Post } from 'types'
import { useDownloadUrl } from 'hooks/useDownloadUrl'
import Header from 'components/uiParts/Header'

const DetailPost: FC<Omit<Post, 'created_at'>> = ({ id, title, post_url, description }) => {
  const { fullUrl: postUrl, isLoading: isLoadingPost } = useDownloadUrl(post_url, 'posts')

  return (
    <div className='flex min-h-screen flex-col bg-slate-50 font-sans'>
      <Header />
      <main>
        <div className='flex flex-col px-4 md:h-[calc(100vh-64px)] md:flex-row md:px-0'>
          <div className='flex items-center justify-center p-[2.5%] md:h-full md:w-2/3 '>
            <div className='nextImageContainer'>
              {postUrl && (
                <Image className='nextImage' src={postUrl} layout='fill' objectFit='contain' />
              )}
            </div>
          </div>
          <div className='min-h-full border border-solid border-slate-200 bg-white px-4 py-3 md:w-1/3 '>
            <h2 className='text-lg'>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DetailPost
