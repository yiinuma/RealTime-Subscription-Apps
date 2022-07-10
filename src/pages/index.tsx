import type { NextPage } from 'next'
import Header from 'components/uiParts/Header'
import Footer from 'components/uiParts/Footer'
import CardItem from 'components/specificPage/CardItem'
import { useQueryPosts } from 'hooks/useQueryPosts'
import { useSubscribePosts } from 'hooks/useSubscribePosts'
import { PostForm } from 'components/specificPage/PostForm'

const Home: NextPage = () => {
  const { data: posts } = useQueryPosts()
  useSubscribePosts()

  return (
    <div className='flex min-h-screen flex-col bg-slate-50 font-sans'>
      <Header />
      <main className='flex flex-col px-4 md:h-[calc(100vh-122px)] md:px-0'>
        <div className='container mx-auto py-4  md:px-24'>
          <PostForm />
          <ul className='grid gap-4 px-0 md:grid-cols-3 xl:grid-cols-4'>
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
