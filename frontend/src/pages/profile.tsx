/* eslint-disable react-hooks/rules-of-hooks */
import axios from './api/instance'
import Meta from '@/components/Meta'
import useAuth from '@/hooks/useAuth'
import Header from "@/components/HeaderB"
import Account from '@/components/Account'
import Profile from '@/components/Profile'
import Spinner from '@/components/Spinner'
import { useState, useEffect } from 'react'
import Settings from '@/components/Settings'
import { ToastContainer } from 'react-toastify'
import { useRouter, NextRouter } from 'next/router'

const profile: React.FC = () => {
  const { notify }: any = useAuth()
  const router: NextRouter = useRouter()
  const [data, setData] = useState<any>({})
  const [token, setToken] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('token') as string)
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    const handleProfile = async (): Promise<void> => {
      if (token) {
        await axios.get('/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }).then((res: any) => {
          setData(res?.data)
        }).catch((err: any) => {
          notify(err.response?.data?.action, err.response?.data?.msg)
        })
      }
    };
    
    (async () => await handleProfile())();

    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [token, router, notify])

  if (loading) {
    return <Spinner />
  }

  if (!token) {
    router.push('/login')
  }

  const handleLogout = async (): Promise<void> => {
    await axios.get('/account/logout', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res: any) => {
      setToken('')
      localStorage.removeItem('token')
      router.push("/")
    }).catch((err: any) => {
      notify("error", err.code)
    })
  }

  return (
    <>
      <ToastContainer />
      <Meta title="Profile" />
      <Header logout={handleLogout} />
      <main className="menu">
        <section className="tabs">
          <button className="tab active">Profile</button>
          <button className="tab">Settings</button>
          <button className="tab">Account</button>
        </section>
        <section>
          <Profile data={data?.body} />
          {/* <Settings />
          <Account /> */}
        </section>
      </main>
    </>
  )
}

export default profile