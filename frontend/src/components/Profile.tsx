/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import useAuth from "@/hooks/useAuth"
import decryption from '@/utils/decryption'
import { useState, useEffect } from 'react'
import { AiFillEye, AiOutlineDownload, AiFillCopy,
    AiOutlineWhatsApp, BsFacebook, GiCancel,
    FaShare, AiOutlineTwitter } from '@/utils/icons'

const Profile: React.FC<{ data: any }> = ({ data }) => {
    const [user, setUser] = useState<string>('')
    const [memos, setMemos] = useState<any[]>([])
    const [views, setViews] = useState<number>(0)
    const [share, setShare] = useState<string>('')
    const [dialog, setDialog] = useState<boolean>(false)
    const { copy, onCopy, downloadImage, getPeriod }: any = useAuth()

    useEffect(() => {
        setUser(data?.account?.user)
        setViews(data?.account?.profileViews)
        setMemos(data?.memos?.body?.reverse())
        setShare(`Send me an anonymous message at: https://memome.one/${data?.account?.user} \n I won't know who sent it.`)
    }, [data])

    return (
        <main className="mt-3 mb-10">
            <dialog open={dialog} className="w-full max-w-[400px] rounded-lg top-20 z-[999] bg-clr-3">
                <section className="w-full h-full py-2 px-3 flex flex-col gap-5">
                    <button className="absolute top-2 right-3 text-2xl"
                    onClick={() => setDialog(false)}>
                        <GiCancel />
                    </button>
                    <button  onClick={async () => await onCopy(share)}
                    className="dialog-list mt-5">
                        <div>{copy}</div>
                        <div>
                            <AiFillCopy />
                        </div>
                    </button>
                    <Link target="_blank" className="dialog-list"
                    href={`https://api.whatsapp.com/send?text=${share}`}>
                        <div>WhatsApp</div>
                        <div>
                            <AiOutlineWhatsApp />
                        </div>
                    </Link>
                    <Link target="_blank" className="dialog-list"
                    href={`https://twitter.com/intent/tweet?text=${share}`}>
                        <div>Twitter</div>
                        <div>
                            <AiOutlineTwitter />
                        </div>
                    </Link>
                    <Link target="_blank" className="dialog-list"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${share}`}>
                        <div>FaceBook</div>
                        <div>
                            <BsFacebook />
                        </div>
                    </Link>
                </section>
            </dialog>
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
                    {memos?.map((memo: any) => (
                        <article key={memo.idx} className="profile-msg">
                            <p className="period">
                                {getPeriod(memo?.time)}
                            </p>
                            {memo?.content &&
                                <div className="texts">
                                    {decryption(memo?.content || '')?.split('\n')?.map(
                                        (content: string, index: number) => (
                                            <span className="texts" key={index}>{String(content)}</span>
                                        ))}
                                </div>}
                            <div className="media">
                                {memo?.media && <img
                                    className="image" loading="lazy"
                                    src={memo?.media?.secure_url}
                                    alt={memo?.idx} />}
                            </div>
                            {memo?.media &&
                                <div className="mt-2 flex justify-center">
                                    <button onClick={() => downloadImage(memo?.media?.secure_url)}
                                        className="bg-clr-3 rounded-lg px-2 py-1 w-full font-semibold font-poppins flex items-center gap-2 justify-center text-clr-0 tracking-wider">
                                        <AiOutlineDownload />
                                        <span>Download full Image</span>
                                    </button>
                                </div>}
                        </article>
                    ))}
                </section>}
        </main>
    )
}

export default Profile