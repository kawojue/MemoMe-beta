/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./HeaderA"
import { useState } from 'react'
import useAuth from "@/hooks/useAuth"
import axios from '@/pages/api/instance'
import { ToastContainer } from "react-toastify"
import { useRouter, NextRouter } from "next/router"

const User: React.FC<{ data: any }> = ({ data }) => {
    const { notify }: any = useAuth()
    const router: NextRouter = useRouter()

    const [media, setMedia] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [textCounter, setTextCounter]= useState<number>(445)

    const handleContent = (e: any): void => {
        const value: string = e.target.value
        if (value.length <= 445) {
            setContent(value)
            setTextCounter(445 - value.length)
            if (textCounter === 0) {
                setTextCounter(0)
            }
        }
    }

    const checkFile = (file: any): boolean => {
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
            `/api/${data?.user}`,
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
                    {data?.temporary ?
                    <span>{`${data?.user} ${data?.msg}`}</span> :
                    <span>{`${data?.pbMsg}`}</span>}
                </h1>
                <section className="mt-6">
                    <article>
                        {data?.pbContent && <div className="content-container">
                            <p className="content-counter md:text-sm">
                                {textCounter} characters remaining.
                            </p>
                            <textarea className="content md:text-xl" maxLength={445}
                            placeholder="Type your message here..."
                            value={content} onChange={(e) => handleContent(e)} />
                        </div>}
                        {data?.pbMedia && <label htmlFor="image" className="drop-container">
                            <span className="drop-title">Select an image (Optional)</span>
                            <input type="file" id="image"
                            accept="image/*" onChange={(e) => handleMedia(e)}/>
                        </label>}
                    </article>
                    {!data?.temporary && <div className="btn-container">
                        <button className="btn"
                        onClick={async () => await handleMessage()}
                        disabled={!isValid}>
                            {`${loading ? 'Shh!! Uploading..': 'Send'}`}
                        </button>
                    </div>}
                </section>
            </form>
        </>
    )
}

export default User