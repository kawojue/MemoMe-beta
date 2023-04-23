/* eslint-disable react-hooks/rules-of-hooks */
import Meta from '@/components/Meta'
import Profile from '@/components/Profile'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useRouter, NextRouter } from 'next/router'

const profile = () => {
  const router: NextRouter = useRouter()
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token") as any) || {})
  }, [router])

  return (
    <>
      <ToastContainer />
      <Meta title="Profile" />
      <Profile token={token}/>
    </>
  )
}

export default profile