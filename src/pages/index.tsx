import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { supabase } from '../utils/supabase'
import useStore from 'store'
import { Auth } from 'components/specificPage/Auth'
import { Button, Group, Modal } from '@mantine/core'
import Header from 'components/specificPage/Header'

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
    <>
      <Header />
    </>
  )
}

export default Home
