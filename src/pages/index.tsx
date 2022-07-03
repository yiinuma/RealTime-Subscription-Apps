import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { supabase } from '../utils/supabase'
import useStore from 'store'
import { Auth } from 'components/specificPage/Auth'
import { Button, Group, Modal } from '@mantine/core'
import Header from 'components/specificPage/Header'
import Footer from 'components/specificPage/Footer'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])
  return (
    <div className='flex min-h-screen flex-col bg-slate-50 font-sans'>
      <Header />
      <main className='flex-cols flex flex-1'>main</main>
      <Footer />
    </div>
  )
}

export default Home
