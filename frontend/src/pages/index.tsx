import Link from 'next/link'
import { poppins } from '../../public/fonts'
import { HeaderA } from '@/components/Header'
import { BsFillRocketTakeoffFill } from '../../public/icons'
import WordFlick from '@/components/WordFlick'

export default function Home() {
  return (
    <>
      <HeaderA />
      <main className="mt-20 mx-auto grid place-items-center">
        <h1 className={`${poppins.className} home-h1 md:text-4xl lg:text-6xl`}>
          <span>Send and Recieve</span>
          <span>Anonymous Messages</span>
          <span> With your Friends Online.</span>
        </h1>
        <Link href="/signup" className="signup-link">
          {`Let's go..`}
          <BsFillRocketTakeoffFill />
        </Link>
        <WordFlick words={[
          "It's free!",
          "It supports Image.",
          "It supports Video.",
          "Share to all social media platforms.",
          "Download original media sent to you.",
          "Customize your settings!"
        ]} styles="h-[2rem] text-clr-2 mt-5 mb-2 font-medium text-lg md:text-xl bg-clr-5 py-1 px-2" />
      </main>
    </>
  )
}
