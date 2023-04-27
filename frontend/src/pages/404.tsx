import Link from 'next/link'
import Header from "@/components/HeaderA"
import { FaMehRollingEyes } from 'react-icons/fa'

const NotFound = () => {
    return (
        <>
            <Header />
            <main className="mt-28 mx-auto grid place-items-center">
                <h1 className='home-h1 md:text-4xl lg:text-6xl'>
                    <span>Keep rolling your eyes.</span>
                    <span>May be you will find the</span>
                    <span>Page somewhere.</span>
                </h1>
                <Link href="/signup"
                className="rounded-lg w-fit bg-clr-1 flex items-center gap-3 py-3 px-5 font-medium mt-10 tracking-wider text-xl hover:bg-clr-2 trans" >
                {`Let's get you Signed up..`}
                <FaMehRollingEyes />
                </Link>
            </main>
        </>
    )
}

export default NotFound