/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth"
import { FaShare } from 'react-icons/fa'
import decrypt from '@/utils/decryption'
import axios from "@/pages/api/instance"
import { useState, useEffect } from 'react'
import { useRouter, NextRouter } from 'next/router'

const Profile: React.FC<{ data: any }> = ({ data }) => {
    const { notify }: any = useAuth()
    const router: NextRouter = useRouter()
    const [copy, setCopy] = useState<any>(<FaShare />)
    const [memos, setMemos] = useState<any[]>([])
    const [user, setUser] = useState<string>('')
    const [views, setViews] = useState<number>(0)

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
        <main className="mt-5 relative">
            <p className="text-center font-semibold text-2xl md:text-3xl tracking-wider text-clr-3 font-poppins">Messages</p>
            <button className="absolute top-0 text-clr-0 md:right-2 right-6 px-5 py-2 bg-clr-1 rounded-md trans hover:bg-clr-2 hover:text-clr-5"
            onClick={async () => await onCopy(`www.memome.one/${user}`)}>{copy}</button>
            <section>
                {memos?.map((memo: any) => (
                    <article key={memo.idx}>
                        {memo?.media && <img
                        src={memo?.media?.secure_url}
                        alt={memo?.idx}/>}
                        {memo?.content && <p>{decrypt(memo?.content || '')}</p>}
                    </article>
                ))}
            </section>
        </main>
    )
}

export default Profile