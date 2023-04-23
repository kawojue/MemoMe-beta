/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./HeaderA"
import useAuth from "@/hooks/useAuth"
import axios from '@/pages/api/instance'
import { useState, useEffect } from 'react'
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

    useEffect(() => {
        setTextCounter(textCounter - 1)
    }, [content])

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
            notify("success", "Shush!! Message sent.")
            setTimeout(() => {
                router.push('/profile')
            }, 1500)
        })
        .catch((err: any) => {
            setLoading(false)
            const { action, msg }: any = err.response?.data
            notify(action, msg)
        })
    }

    return (
        <>
            <Header />
            <ToastContainer />
            <form className="form-itself" onSubmit={(e) => e.preventDefault()}>
                <h1 className="text-clr-5 text-center text-lg font-medium">
                    {`Tell`}
                    <span className="text-clr-1 font-semibold tracking-wide">
                        {` @${user} `}
                    </span>
                    {`what's on your mind. They won't know who sent it.`}
                </h1>
                <section className="mt-6">
                    <article>
                        <textarea className="resize-none" maxLength={890}
                        value={content} onChange={(e) => handleContent(e)} />
                        <div>
                            <input type="file" accept="image/*"
                            onChange={(e) => handleMedia(e)} />
                        </div>
                    </article>
                    <div className="btn-container">
                        <button onClick={async () => await handleMessage()}>
                            {`${loading ? 'Shh!! Uploading..': 'Send'}`}
                        </button>
                    </div>
                </section>
            </form>
        </>
    )
}

export default User