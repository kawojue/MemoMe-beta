import Link from 'next/link'
import Header from '@/components/HeaderA'
import { BsFillRocketTakeoffFill } from 'react-icons/bs'

export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-28 mx-auto grid place-items-center">
        <h1 className='home-h1 md:text-4xl lg:text-6xl'>
          <span>Send, Recieve, and Share</span>
          <span>Anonymous</span>
          <span>Messages with your Friends.</span>
        </h1>
        <Link href="/signup"
        className="signup-link hover:bg-clr-2">
          {`Let's go..`}
          <BsFillRocketTakeoffFill />
        </Link>
      </main>
    </>
  )
}
