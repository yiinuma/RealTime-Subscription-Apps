import Image from 'next/image'
import { FC } from 'react'
import { useRouter } from 'next/router'

import { Post } from 'types'
import { useQueryPosts } from 'hooks/useQueryPosts'
import { useDownloadUrl } from 'hooks/useDownloadUrl'
import Header from 'components/uiParts/Header'
import { Spinner } from 'components/uiParts/Spinner'

const DetailPost: FC = () => {
  const router = useRouter()
  const isReady = router.isReady

  if (!isReady) {
    return <Spinner />
  }
  const { post_id } = router.query
  const { data: posts } = useQueryPosts()

  const post = posts?.filter((posts) => {
    return posts.id === post_id
  })

  if (typeof post === 'undefined') {
    router.back()
    return null
  }

  const { fullUrl: postUrl, isLoading: isLoadingPost } = useDownloadUrl(post[0].post_url, 'posts')

  return (
    <div className='flex min-h-screen flex-col bg-slate-50 font-sans'>
      <Header />
      <main>
        {post && (
          <div className='flex flex-col px-4 md:h-[calc(100vh-64px)] md:flex-row md:px-0'>
            <div className='flex items-center justify-center p-[2.5%] md:h-full md:w-2/3 '>
              <div className='nextImageContainer'>
                {postUrl && <img className='nextImage' src={postUrl} />}
              </div>
            </div>
            <div className='min-h-full border border-solid border-slate-200 bg-white px-4 py-3 md:w-1/3 '>
              <h2 className='text-lg'>{post[0].title}</h2>
              <p>{post[0].description}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DetailPost
