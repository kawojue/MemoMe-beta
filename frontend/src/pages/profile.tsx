/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import Meta from '@/components/Meta'
import useAuth from '@/hooks/useAuth'
import Header from '@/components/HeaderB'
import Account from '@/components/Account'
import Profile from '@/components/Profile'
import Settings from '@/components/Settings'
import { SpinnerOne } from '@/components/Spinner'

const profile: React.FC = () => {
  const { loading, data }: any = useAuth()
  const [activeTab, setActiveTab] = useState<string>("profile")

  if (loading) return <SpinnerOne />

  return (
    <>
      <Meta title="Profile" />
      <Header />
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
            <Settings /> : <Account />
          }
        </section>
      </main>
    </>
  )
}

export default profile