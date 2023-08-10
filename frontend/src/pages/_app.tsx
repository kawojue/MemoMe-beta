import '@/styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/hooks/useAuth'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}