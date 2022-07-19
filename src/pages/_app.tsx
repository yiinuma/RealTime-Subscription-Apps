import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { MantineProvider } from '@mantine/core'
import Head from 'next/head'

import useStore from 'store'
import { supabase } from 'utils/supabase'
import '../styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  const setSessionUser = useStore((state) => state.setSessionUser)
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
        setSessionUser(session.user.id)
      }
    }
    setupUser()
  }, [setSession, session])

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Realtime subscription App</title>
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          fontFamily: 'Verdana, sans-serif',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default MyApp
