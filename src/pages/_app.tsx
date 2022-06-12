import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { MantineProvider } from '@mantine/core'

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
  return (
    <QueryClientProvider client={queryClient}>
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
