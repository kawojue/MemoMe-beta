/* eslint-disable @next/next/no-img-element */
import Media from './Media'
import useAuth from "@/hooks/useAuth"
import decrypt from "@/utils/decryption"
import { AiOutlineDownload } from '@/utils/icons'

const Content: React.FC<{ memos: any[] }> = ({ memos }) => {
    const { getPeriod, downloadImage }: any = useAuth()

    return (
        <>
        {memos?.map((memo: any) => (
            <article key={memo.idx} className="profile-msg">
                <p className="period">
                    {getPeriod(memo?.time)}
                </p>
                {memo?.content &&
                    <div className="texts">
                        {decrypt(memo?.content || '')?.split('\n')?.map(
                            (content: string, index: number) => (
                                <span className="texts" key={index}>
                                    {String(content)}
                                </span>
                            ))}
                    </div>}
                <Media memo={memo}/>
                {memo?.media &&
                    <div className="mt-2 flex justify-center">
                        <button onClick={() => downloadImage(memo?.media?.secure_url)}
                            className="bg-clr-3 rounded-lg px-2 py-1 w-full font-semibold font-poppins flex items-center gap-2 justify-center text-clr-0 tracking-wider">
                            <AiOutlineDownload />
                            <span>Download Content</span>
                        </button>
                    </div>}
            </article>
        ))}
        </>
    )
}

export default Content