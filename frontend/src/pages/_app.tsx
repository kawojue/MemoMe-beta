import '@/styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '@/hooks/useAuth'
import { ToastContainer } from 'react-toastify'
import { Analytics } from '@vercel/analytics/react'
import { initGA, logPageView } from '@/utils/analytics'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    initGA()
    logPageView()
  }, [])

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps}>
          <Analytics />
          <ToastContainer />
        </Component>
      </Layout>
    </AuthProvider>
  )
}