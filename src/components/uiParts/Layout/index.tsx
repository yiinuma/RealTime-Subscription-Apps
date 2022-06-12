import Head from 'next/head'
import { FC, ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({
  children,
  title = 'RealTime-Subscription-APP',
}) => {
  return (
    <div className="flex min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className="flex flex-1 flex-col justify-center p-4">
        {children}
      </main>
      <footer></footer>
    </div>
  )
}
