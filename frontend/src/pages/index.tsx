import Link from 'next/link'
import Header from '@/components/HeaderA'
import { BsFillRocketTakeoffFill } from 'react-icons/bs'

export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-28 mx-auto grid place-items-center">
        <p className='text-2xl md:text-4xl lg:text-6xl flex flex-col w-full items-center select-none gap-1.5 font-medium text-center'>
          <span>Send, Recieve, and Share</span>
          <span>Anonymous</span>
          <span>Messages with your Friends.</span>
        </p>
        <Link href="/signup"
        className="rounded-lg w-fit bg-clr-1 flex items-center gap-3 py-3 px-5 font-medium mt-10 tracking-wider text-xl hover:bg-clr-2 trans" >
          {`Let's go..`}
          <BsFillRocketTakeoffFill />
        </Link>
      </main>
    </>
  )
}
