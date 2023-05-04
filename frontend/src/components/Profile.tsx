/* eslint-disable @next/next/no-img-element */
import Modal from './Modal'
import Content from './Content'
import useAuth from "@/hooks/useAuth"
import { useState, useEffect } from 'react'
import { AiFillEye, FaShare } from '@/utils/icons'

const Profile: React.FC<{ data: any }> = ({ data }) => {
    const { dialog, setDialog }: any = useAuth()
    const [user, setUser] = useState<string>('')
    const [memos, setMemos] = useState<any[]>([])
    const [views, setViews] = useState<number>(0)
    const [share, setShare] = useState<string>('')

    useEffect(() => {
        setUser(data?.account?.user)
        setViews(data?.account?.profileViews)
        setMemos(data?.memos?.body?.reverse())
        setShare(`Send me an anonymous message at: https://memome.one/${data?.account?.user} \n I won't know who sent it.`)
    }, [data])

    return (
        <main className="mt-3 mb-10">
            <Modal share={share} user={user} />
            <div className="flex items-center mb-7 justify-between">
                <h1 className="text-center font-semibold text-3xl md:text-4xl tracking-wider text-clr-3">
                    Messages
                </h1>
                <button data-open-modal
                onClick={() => setDialog(!dialog)}
                className="text-clr-0 px-3 py-2 bg-clr-1 tracking-wider font-bold text-2xl rounded-md trans hover:bg-clr-2 hover:text-clr-5">
                    <FaShare />
                </button>
            </div>
            <div className="flex items-center mb-7 justify-between">
                <p className="flex flex-col gap-0.5 px-3 py-1 bg-clr-6 text-clr-3 rounded-lg font-medium">
                    <span>Profile Views</span>
                    <span className="flex items-center justify-around gap-3 text-lg">
                        <AiFillEye/> {views}
                    </span>
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
                    <Content memos={memos}/>
                </section>}
        </main>
    )
}

export default Profile