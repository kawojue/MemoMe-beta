/* eslint-disable @next/next/no-img-element */
import { saveAs } from 'file-saver'
import useAuth from "@/hooks/useAuth"
import { FaShare } from 'react-icons/fa'
import decryption from '@/utils/decryption'
import { useState, useEffect } from 'react'
import { formatDistanceToNow, parseISO } from "date-fns"
import { AiFillEye, AiOutlineDownload } from 'react-icons/ai'

const Profile: React.FC<{ data: any }> = ({ data }) => {
    const { notify }: any = useAuth()
    const [user, setUser] = useState<string>('')
    const [memos, setMemos] = useState<any[]>([])
    const [views, setViews] = useState<number>(0)
    const [copy, setCopy] = useState<any>(<FaShare />)
    
    useEffect(() => {
        setUser(data?.account?.user)
        setViews(data?.account?.profileViews)
        setMemos(data?.memos?.body?.reverse())
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

    const defaultImg = (e: any):void => {
        e.target.src = '.../../../../public/fallback.png'
    }

    const getPeriod = (timestamp: string): string => {
        let period = ''
        if (timestamp) {
            const date = parseISO(timestamp)
            const timePeriod = formatDistanceToNow(date)
            period = `${timePeriod} ago`
        }
        return period
    }

    const downloadImage = (url: string) => {
        const splitName = url.split('/')
        saveAs(url, splitName[splitName.length - 1])
    }

    return (
        <main className="mt-3 mb-10">
            <div className="flex items-center mb-7 justify-between">
                <h1 className="text-center font-semibold text-3xl md:text-4xl tracking-wider text-clr-3 font-poppins">
                    Messages
                </h1>
                <button onClick={async () => await onCopy(`www.memome.one/${user}`)}
                className="text-clr-0 px-3 py-0.5 bg-clr-1 tracking-wider font-medium rounded-md trans hover:bg-clr-2 hover:text-clr-5">Share {copy}</button>
            </div>
            <div className="flex items-center mb-7 justify-between">
                <p className="flex flex-col gap-0.5 px-3 py-1 bg-clr-6 text-clr-3 rounded-lg font-medium">
                    <span>Profile Views</span>
                    <span className="flex items-center justify-around gap-3 text-lg"><AiFillEye className="" /> {views}</span>
                </p>
                <p className="bg-clr-6 px-3 py-1 text-clr-3 rounded-lg text-lg font-medium">
                    <span>Total Msg: {memos?.length}</span>
                </p>
            </div>
            {memos?.length === 0 ?
            <p className="text-center mt-10 text-white text-xl md:text-lg font-poppins">
                {"Your lonely ass hasn't gotten any messages yet. Click on the share button to share your link."}
            </p> :
            <section className="profile-msgs text-left">
                {memos?.map((memo: any) => (
                    <article key={memo.idx} className="profile-msg relative">
                        <p className="period">{getPeriod(memo?.time)}</p>
                        {memo?.content &&
                        <div className="content flex flex-col gap-0.5">
                            {decryption(memo?.content || '')?.split('\n')?.map(
                                (content: string, index: number) => (
                                    <span className="texts" key={index}>{String(content)}</span>
                            ))}
                        </div>}
                        <div className="media">
                            {memo?.media && <img
                            className="image" loading="lazy"
                            onError={(e) => defaultImg(e)}
                            src={memo?.media?.secure_url}
                            alt={memo?.idx}/>}
                        </div>
                        {memo?.media &&
                        <div className="mt-2 flex justify-center">
                            <button onClick={() => downloadImage(memo?.media?.secure_url)}
                            className="bg-clr-3 rounded-lg px-2 py-1 w-full font-semibold font-poppins flex items-center gap-2 justify-center">
                                <AiOutlineDownload />
                                <span>Download original Image</span>
                            </button>
                        </div>}
                    </article>
                ))}
            </section>}
        </main>
    )
}

export default Profile