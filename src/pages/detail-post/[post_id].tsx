import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Loader } from '@mantine/core'

import { Post } from 'types'
import { useQueryPosts } from 'hooks/useQueryPosts'
import { useSubscribePosts } from 'hooks/useSubscribePosts'
import { useDownloadUrl } from 'hooks/useDownloadUrl'
import Header from 'components/uiParts/Header'

const DetailPost: FC = () => {
  const [post, setPost] = useState<Omit<Post, 'created_at' | 'user_id'>[] | null>(null)
  const [detailPostUrl, setDetailPostUrl] = useState<string | undefined>(undefined)
  const { fullUrl: postUrl, isLoading: isLoadingPost } = useDownloadUrl(detailPostUrl, 'posts')
  const router = useRouter()
  const { query, isReady } = useRouter()
  const { post_id } = query
  const { data: posts } = useQueryPosts()
  useSubscribePosts()

  useEffect(() => {
    if (isReady && posts) {
      const detailPost = posts.filter((posts) => {
        return posts.id === post_id
      })
      setPost(detailPost)
      setDetailPostUrl(detailPost[0].post_url)
    }
  }, [isReady, post_id])

  if (typeof post === null) {
    router.push('/')
    return null
  }

  return (
    <div className='flex min-h-screen flex-col bg-slate-50 font-sans'>
      <Header />
      <main>
        {post && (
          <div className='flex flex-col px-4 md:h-[calc(100vh-64px)] md:flex-row md:px-0'>
            <div className='flex items-center justify-center p-[2.5%] md:h-full md:w-2/3 '>
              {postUrl && isLoadingPost ? (
                <Loader variant='bars' />
              ) : (
                <img className='m-h-full w-full' src={postUrl} />
              )}
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
