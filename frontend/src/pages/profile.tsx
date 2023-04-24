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


export const getServerSideProps = async (context: any) => {
  const { auth } = context.req.cookies
  let data: any = {}
  await axios.get('/profile', {
    headers: {
      'Authorization': `Bearer ${auth}`
    }
  }).then((res: any) => {
    data = { auth, data: res?.data }
  }).catch((err: any) => {
    data = err.response?.data
  })

  return {
    props: {
      data
    }
  }
}

const profile: React.FC<{ data: any }> = ({ data }) => {
  const { notify }: any = useAuth()
  const router: NextRouter = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [tabs, setTabs] = useState<any>({

  })

  useEffect(() => {
    // if (data?.success === false) {
    //   router.push('/login')
    // }
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [data, router])

  if (loading) {
    return <Spinner />
  }

  const handleLogout = async (): Promise<void> => {
      await axios.get('/account/logout', {
          headers: {
              'Authorization': `Bearer ${data.auth}`
          }
      }).then((res: any) => {
          localStorage.clear()
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
          <Profile token={data.auth} />
          <Settings />
          <Account />
        </section>
      </main>
    </>
  )
}

export default profile