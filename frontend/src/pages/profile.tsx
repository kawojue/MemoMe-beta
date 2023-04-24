/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import axios from './api/instance'
import Meta from '@/components/Meta'
import Profile from '@/components/Profile'
import Spinner from '@/components/Spinner'
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
  const router: NextRouter = useRouter()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (data?.success === false) {
      router.push('/login')
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [data, router])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <ToastContainer />
      <Meta title="Profile" />
      <main>
        <Profile token={data.auth} />
      </main>
    </>
  )
}

export default profile