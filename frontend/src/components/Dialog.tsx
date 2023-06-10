import Link from 'next/link'
import { Fragment } from 'react'
import useAuth from '@/hooks/useAuth'
import { Dialog, Transition } from '@headlessui/react'
import { poppins, questrial } from '../../public/fonts'
import {
    AiFillCopy, AiOutlineWhatsApp,
    GiCancel, AiOutlineTwitter, FaUserAlt
} from '../../public/icons'

interface IDialog {
    user: string
    share: string
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const MyDialog: React.FC<IDialog> = ({ user, share, isOpen, setIsOpen }) => {
    const { copy, onCopy }: any = useAuth()

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[999]" onClose={() => setIsOpen(false)}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="flex w-full flex-col gap-5 max-w-md transform overflow-hidden rounded-2xl bg-white px-5 py-3 text-left align-middle shadow-xl transition-all">
                                <article className="w-full flex flex-col gap-2 items-center justify-center">
                                    <FaUserAlt className="text-3xl" />
                                    <div className="font-medium tracking-wider text-lg text-center">
                                        <p className={questrial.className}>
                                            Hi, <span className="text-clr-6">{user}</span>!
                                        </p>
                                        <Link href={`https://memome.one/${user}`} target='_blank'
                                        className={`${poppins.className} text-xs`}>
                                            {`memome.one/${user}`}
                                        </Link>
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
                                <div className="mt-4">
                                    <button
                                    type="button"
                                    className="absolute top-2 right-3 text-2xl justify-center rounded-md border border-transparent bg-clr-1 px-4 py-2 font-medium text-clr-0 hover:bg-clr-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-clr-4 focus-visible:ring-offset-2"
                                    onClick={() => setIsOpen(false)}>
                                        <GiCancel />
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default MyDialog