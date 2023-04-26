/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth"
import { FaShare } from 'react-icons/fa'
import decrypt from '@/utils/decryption'
import { AiFillEye } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useRouter, NextRouter } from 'next/router'

const Profile: React.FC<{ data: any }> = ({ data }) => {
    const { notify }: any = useAuth()
    const router: NextRouter = useRouter()
    const [user, setUser] = useState<string>('')
    const [memos, setMemos] = useState<any[]>([])
    const [views, setViews] = useState<number>(0)
    const [copy, setCopy] = useState<any>(<FaShare />)
    
    useEffect(() => {
        setMemos(data?.memos?.body)
        setUser(data?.account?.user)
        setViews(data?.account?.profileViews)
    }, [data])

    const onCopy = async (value: any) => {
        try {
            await navigator.clipboard.writeText(value)
            setCopy("Copied!")
            notify('success', `Hola! Share your link with your friends.`)
            setTimeout(() => {
                setCopy(<FaShare />)
            }, 1200)
        } catch (err) {
            setCopy('Failed to copy!')
        }
    }

    return (
        <main className="mt-5 mb-10 relative">
            <div className="flex flex-col gap-2 mb-10 items-center justify-center">
                <h1 className="text-center font-semibold text-2xl md:text-3xl tracking-wider text-clr-3 font-poppins">
                    Messages
                </h1>
                <div className="w-32 h-1.5 bg-clr-2 rounded-md"></div>
            </div>
            <button className="absolute top-0 text-clr-0 md:right-2 right-6 px-5 py-2 bg-clr-1 rounded-md trans hover:bg-clr-2 hover:text-clr-5"
            onClick={async () => await onCopy(`www.memome.one/${user}`)}>{copy}</button>
            <p className="flex items-center gap-3 px-2 py-1 bg-clr-6 w-fit rounded-md">
                <AiFillEye />
                <span>{views}</span>
            </p>
            <section className="profile-msgs text-left">
                {memos?.map((memo: any) => (
                    <article key={memo.idx} className="profile-msg">
                        <div className="media">
                            {memo?.media && <img
                            className="image"
                            src={memo?.media?.secure_url}
                            alt={memo?.idx}/>}
                        </div>
                        {memo?.content &&
                        <div className="content">
                            {decrypt(memo?.content || '').split('\n')?.map(
                                (content: string, index: number) => (
                                    <p className="texts" key={index}>{String(content)}</p>
                            ))}
                        </div>}
                        {memo?.media &&
                        <div className="mt-2 flex justify-center">
                            <a href="https://res.cloudinary.com/kawojue/image/upload/v1682526539/MemoMe/6449383785ef04c71e27edf9/qrkyp2ofnjl5bwnxfwuf.jpg" download
                            className="bg-clr-3 rounded-lg px-2 py-1 w-full font-semibold font-poppins">
                                Download original Image
                            </a>
                        </div>}
                    </article>
                ))}
            </section>
        </main>
    )
}

export default Profile