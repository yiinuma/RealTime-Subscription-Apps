import { createGetInitialProps } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html>
        <Head />
        <body className='flex flex-1 flex-col justify-center py-4'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
