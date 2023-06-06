/* eslint-disable @next/next/no-img-element */
import Media from './Media'
import getPeriod from '@/utils/period'
import download from '@/utils/download'
import decrypt from "@/utils/decryption"
import { questrial } from '../../public/fonts'
import { AiOutlineDownload } from '../../public/icons'

const Content: React.FC<{ memos: any[] }> = ({ memos }) => {
    return (
        <>
        {memos?.map((memo: any) => (
            <>
                <section className="flex flex-col gap-0.5">
                <article key={memo.idx} className="profile-msg card">
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
                    {memo?.media && <Media memo={memo}/>}
                </article>
                {memo?.media &&
                        <div className="mt-2 flex justify-center">
                            <button onClick={() => download(memo?.media.secure_url)}
                                className={`${questrial.className} bg-clr-3 rounded-lg px-2 py-1 w-full font-semibold flex items-center gap-2 justify-center text-clr-0 tracking-wider`}>
                                <AiOutlineDownload />
                                <span>Download Content</span>
                            </button>
                        </div>}
                </section>
            </>
        ))}
        </>
    )
}

export default Content