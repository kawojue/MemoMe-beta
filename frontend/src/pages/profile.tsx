/* eslint-disable react-hooks/rules-of-hooks */
import Meta from '@/components/Meta'
import useAuth from '@/hooks/useAuth'
import Header from "@/components/HeaderB"
import Account from '@/components/Account'
import Profile from '@/components/Profile'
import Spinner from '@/components/Spinner'
import { useState } from 'react'
import Settings from '@/components/Settings'
import { ToastContainer } from 'react-toastify'

const profile: React.FC = () => {
  const { token, loading,
    handleLogout, data }: any = useAuth()
  const [activeTab, setActiveTab] = useState<string>("profile")

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <ToastContainer />
      <Meta title="Profile" />
      <Header logout={handleLogout} />
      <main className="menu">
        <section className="tabs">
          <button onClick={() => setActiveTab("profile")}
          className={`tab ${activeTab === "profile" && 'active'}`}>
            Profile
          </button>
          <button onClick={() => setActiveTab("settings")}
          className={`tab ${activeTab === "settings" && 'active'}`}>
            Settings
          </button>
          <button onClick={() => setActiveTab("account")}
          className={`tab ${activeTab === "account" && 'active'}`}>
            Account
          </button>
        </section>
        <section>
          {activeTab === "profile" ? 
            <Profile data={data?.body} /> :
            activeTab === "settings" ?
            <Settings data={data?.body} /> : <Account token={token} />
          }
        </section>
      </main>
    </>
  )
}

export default profile