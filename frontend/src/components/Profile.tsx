/* eslint-disable @next/next/no-img-element */
import Content from './Content'
import MyDialog from './Dialog'
import useAuth from "@/hooks/useAuth"
import decrypt from '@/utils/decryption'
import { useState, useEffect, useRef } from 'react'
import { AiFillEye, FaShare, BsSearch } from '../../public/icons'

const Profile: React.FC<{ data: any }> = ({ data }) => {
    const { dialog, setDialog }: any = useAuth()
    const [user, setUser] = useState<string>('')
    const [memos, setMemos] = useState<any[]>([])
    const [views, setViews] = useState<number>(0)
    const [share, setShare] = useState<string>('')
    const searchRef = useRef<HTMLInputElement>(null)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setMemos(data?.memos)
        setUser(data?.account?.user)
        setViews(data?.account?.profileViews)
        setShare(`Send me anonymous message. I won't know who sent it! https://memome.one/${data?.account?.user}`)
    }, [data])

    const handleSearch: any[] = memos?.filter((memo: any) => (memo?.content && (decrypt(memo?.content))?.toLowerCase())?.includes(search.toLowerCase()))

    return (
        <main className="mt-3 mb-10">
            <MyDialog isOpen={dialog} setIsOpen={setDialog} share={share} user={user} />
            <div className="flex flex-col gap-2 mb-5 items-center w-full">
                <h1 className="font-semibold text-3xl tracking-wider text-clr-2 md:text-4xl">
                    Messages
                </h1>
                <div className="w-fit px-10 py-1 rounded bg-clr-3"></div>
            </div>
            <div className="flex items-center mb-7 justify-between">
                <p className="flex flex-col gap-0.5 px-3 py-1 bg-clr-2 text-clr-5 rounded-lg font-medium">
                    <span>Profile Views</span>
                    <span className="flex items-center justify-around gap-3 text-lg">
                        <AiFillEye/> {views}
                    </span>
                </p>
                <button
                onClick={() => setDialog(!dialog)}
                className="px-3 py-2 tracking-wider font-bold text-2xl rounded-md trans bg-clr-2 text-clr-5 hover:bg-clr-3">
                    <FaShare />
                </button>
            </div>
            <div className="flex items-center mb-7 justify-between">
                <p className="bg-clr-2 text-clr-5 px-2 py-1 rounded-lg text-lg font-medium">
                    <span>Total: {memos?.length}</span>
                </p>
                {/* <div className="relative w-[5rem]">
                    <input type='text' value={search}
                    ref={searchRef}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <BsSearch className="absolute z-50 top-2 right-2 font-semibold text-lg"/>
                </div> */}
            </div>
            {memos?.length === 0 ?
                <p className="text-center mt-10 text-clr-2 text-xl md:text-lg font-poppins">
                    {"No Messages yet. Click on the share button to share your link."}
                </p> :
                <section className="profile-msgs text-left">
                    <Content memos={document.activeElement === searchRef.current ? handleSearch : memos}/>
                </section>}
        </main>
    )
}

export default Profile
