import '@/styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/hooks/useAuth'
import { initGA, logPageView } from '@/utils/analytics'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    initGA()
    logPageView()
  }, [])

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}