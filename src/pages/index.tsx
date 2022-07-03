import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { supabase } from '../utils/supabase'
import useStore from 'store'
import { Auth } from 'components/specificPage/Auth'
import { Button, Container, Grid, Group, Modal } from '@mantine/core'
import Header from 'components/uiParts/Header'
import Footer from 'components/uiParts/Footer'
import CardItem from 'components/specificPage/CardItem'

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
      <main className='flex-cols flex flex-1 px-2 md:px-0'>
        <div className='container mx-auto py-4'>
          <div className='grid gap-4 md:grid-cols-3 xl:grid-cols-4'>
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
