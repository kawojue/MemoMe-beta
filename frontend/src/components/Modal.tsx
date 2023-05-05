import Link from 'next/link'
import useAuth from "@/hooks/useAuth"
import { AiFillCopy, AiOutlineWhatsApp, BsFacebook,
    GiCancel, AiOutlineTwitter, FaUserAlt } from '@/utils/icons'

interface IModal {
    share: string,
    user: string
}

const Modal: React.FC<IModal> = ({ share, user }) => {   
    const { copy, dialog, setDialog, onCopy }: any = useAuth()

    return (
        <dialog open={dialog} className="w-[95vw] max-w-[400px] rounded-lg top-20 z-[999] bg-clr-3">
            <section className="w-full h-full py-2 px-3 flex flex-col gap-5">
                <button className="absolute top-2 right-3 text-2xl"
                onClick={() => setDialog(false)}>
                    <GiCancel />
                </button>
                <article className="w-full flex flex-col gap-3 items-center justify-center">
                    <FaUserAlt className="text-3xl" />
                    <div className="font-poppins font-medium tracking-wider text-lg text-center">
                        <p>
                            Hi, <span className="text-clr-6">{user}</span>!
                        </p>
                        <Link href={`https://memome.one/${user}`} target='_blank'
                        className="text-xs">{`memome.one/${user}`}</Link>
                    </div>
                </article>
                <button  onClick={async () => await onCopy(share)}
                className="dialog-list mt-5">
                    <p>{copy}</p>
                    <AiFillCopy />
                </button>
                <Link target="_blank" className="dialog-list"
                href={`https://api.whatsapp.com/send?text=${share}`}>
                    <p>WhatsApp</p>
                    <AiOutlineWhatsApp />
                </Link>
                <Link target="_blank" className="dialog-list"
                href={`https://twitter.com/intent/tweet?text=${share}`}>
                    <p>Twitter</p>
                    <AiOutlineTwitter />
                </Link>
                <Link target="_blank" className="dialog-list"
                href={`https://www.facebook.com/sharer/sharer.php?u=${share}`}>
                    <p>FaceBook</p>
                    <BsFacebook />
                </Link>
            </section>
        </dialog>
    )
}

export default Modal