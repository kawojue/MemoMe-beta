/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./HeaderA"
import { useState } from 'react'
import useAuth from "@/hooks/useAuth"
import axios from '@/pages/api/instance'
import { ToastContainer } from "react-toastify"
import { useRouter, NextRouter } from "next/router"

const User: React.FC<{ user: string }> = ({ user }) => {
    const { notify }: any = useAuth()
    const router: NextRouter = useRouter()

    const [media, setMedia] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [textCounter, setTextCounter]= useState<number>(890)

    const handleContent = (e: any): void => {
        const value: string = e.target.value
        if (value.length <= 890) {
            setContent(value)
            setTextCounter(890 - value.length)
            if (textCounter === 0) {
                setTextCounter(0)
            }
        }
    }

    const checkFile = (file: any) => {
        if (!file) {
            return false
        }
        const maxSize: number = 5242880 // 5MB
        const { name, size }: any = file
        const allowedFormats: string[] = ['jpg', 'jpeg', 'png', 'heif']
        const split: string[] = name.split('.')
        const format = split[split.length - 1]
        if (allowedFormats.includes(format) && size <= maxSize) {
            return true
        }
        return false
    }

    const convertFile = (file: any): void => {
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setMedia(reader.result as string)
        }
    }

    const handleMedia = (e: any): void => {
        const file: any = e.target.files[0]
        if (checkFile(file)) {
            convertFile(file)
        } else {
            notify('warning', "File format or size is not allowed.")
        }
    }

    const handleMessage = async () => {
        setLoading(true)
        await axios.post(
            `/api/${user}`,
            JSON.stringify({ media, content })
        )
        .then((res: any) => {
            setMedia("")
            setContent("")
            setLoading(false)
            notify("success", "Shhh!! Message sent.")
            setTimeout(() => {
                router.push('/profile')
            }, 1500)
        })
        .catch((err: any) => {
            setLoading(false)
            if (err.code === 'ERR_NETWORK') {
                notify("error", "Failed! Network failure.")
            } else {
                const { action, msg }: any = err.response?.data
                notify(action, msg)
            }
        })
    }

    const isValid: boolean = Boolean(content) || Boolean(media)

    return (
        <>
            <Header />
            <ToastContainer />
            <form className="form-itself" onSubmit={(e) => e.preventDefault()}>
                <h1 className="text-clr-5 text-center md:text-xl text-lg font-medium">
                    {`Tell`}
                    <span className="text-clr-1 font-semibold tracking-wide">
                        {` @${user} `}
                    </span>
                    {`what's on your mind. They won't know who sent it.`}
                </h1>
                <section className="mt-6">
                    <article>
                        <div className="content-container">
                            <p className="content-counter md:text-sm">
                                {textCounter} characters remaining.
                            </p>
                            <textarea className="content md:text-xl" maxLength={890}
                            placeholder="Type your message here..."
                            value={content} onChange={(e) => handleContent(e)} />
                        </div>
                        <label htmlFor="image" className="drop-container">
                            <span className="drop-title">Select an image (Optional)</span>
                            <input type="file" id="image"
                            accept="image/*" onChange={(e) => handleMedia(e)}/>
                        </label>
                    </article>
                    <div className="btn-container">
                        <button className="btn"
                        onClick={async () => await handleMessage()}
                        disabled={!isValid}>
                            {`${loading ? 'Shh!! Uploading..': 'Send'}`}
                        </button>
                    </div>
                </section>
            </form>
        </>
    )
}

export default User