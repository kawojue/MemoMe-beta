import Meta from '@/components/Meta'
import { questrial } from '../../public/fonts'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <Meta />
      <body className={questrial.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
