import type { NextPage } from 'next'

import useStore from 'store'
import { useQueryPosts } from 'hooks/useQueryPosts'
import { useSubscribePosts } from 'hooks/useSubscribePosts'
import { Header } from 'components/uiParts/Header'
import { Footer } from 'components/uiParts/Footer'
import { PostForm } from 'components/specificPage/PostForm'
import { PostItem } from 'components/specificPage/PostItem'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const { data: posts } = useQueryPosts()
  useSubscribePosts()

  return (
    <div className='flex min-h-screen flex-col bg-slate-50 font-sans'>
      <Header />
      <main className='flex flex-col px-4 md:min-h-[calc(100vh-122px)] md:px-0'>
        <div className='container mx-auto py-4 md:px-24'>
          {session && <PostForm />}
          <ul className='grid gap-4 px-0 md:grid-cols-3 xl:grid-cols-4'>
            {posts?.map((post) => (
              <PostItem
                key={post.id}
                title={post.title}
                post_url={post.post_url}
                description={post.description}
                id={post.id}
                user_id={post.user_id}
              />
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
