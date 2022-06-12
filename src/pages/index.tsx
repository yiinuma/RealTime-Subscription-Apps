import type { NextPage } from 'next'
import { useEffect } from 'react'

import { supabase } from '../utils/supabase'
import useStore from 'store'
import { Auth } from 'components/specificPage/Auth'

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
      <Auth />
    </>
  )
}

export default Home
