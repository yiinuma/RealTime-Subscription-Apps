import type { NextPage } from 'next'

import useStore from 'store'
import { useQueryPosts } from 'hooks/useQueryPosts'
import { useSubscribePosts } from 'hooks/useSubscribePosts'
import { Header } from 'components/uiParts/Header'
import { Footer } from 'components/uiParts/Footer'
import { PostForm } from 'components/specificPage/PostForm'
import { PostItem } from 'components/specificPage/PostItem'
import { useEffect, useState } from 'react'
import { supabase } from 'utils/supabase'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  const sessionUser = useStore((state) => state.sessionUser)
  const setSessionUser = useStore((state) => state.setSessionUser)
  const { data: posts } = useQueryPosts()
  useSubscribePosts()
  useEffect(() => {
    // アクティブなセッションがある場合そのセッションデータが返ってくる
    setSession(supabase.auth.session())

    // 認証イベントが発生するたびに通知を受け取ります。
    supabase.auth.onAuthStateChange((_event, session) => {
      // _event: SIGNED_IN, SIGNED_OUT
      // session: セッション情報
      setSession(session)
    })
  }, [setSession, session])

  useEffect(() => {
    const setupUser = async () => {
      if (session?.user?.id) {
        const { data: user } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setSessionUser(user.id)
      }
    }
    setupUser()
  }, [setSession, session])
  console.log(sessionUser)
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
