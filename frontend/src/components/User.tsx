/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./HeaderA"
import { useState } from 'react'
import useAuth from "@/hooks/useAuth"
import axios from '@/pages/api/instance'
import { ToastContainer } from "react-toastify"
import { useRouter, NextRouter } from "next/router"

const User: React.FC<{ data: any }> = ({ data }) => {
    const router: NextRouter = useRouter()
    const { throwError, notify }: any = useAuth()

    const [media, setMedia] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [mediaType, setMediaType] = useState<string>('')
    const [textCounter, setTextCounter]= useState<number>(445)
    const [selected, setSelected] = useState<string>('Select an image or clip (Optional)')

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
        const maxSize: number = 6291456 // 6MB
        const { name, size }: any = file
        const allowedFormats: string[] = ['jpg', 'png', 'mp4']
        const split: string[] = name.split('.')
        const extension: string = split[split.length - 1]
        if (allowedFormats.includes(extension) && size <= maxSize) {
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
            setSelected(`Seleted: ${file.name}`)
            if (file.type === "video/mp4") {
                setMediaType("video")
            }
            if (file.type === ("image/jpeg" || "image/png")) {
                setMediaType("image")
            }
            convertFile(file)
        } else {
            notify('warning', "File size or type is not allowed.")
        }
    }

    const handleMessage = async (): Promise<void> => {
        setLoading(true)
        await axios.post(
            `/api/${data?.user}`,
            JSON.stringify({ media, content, mediaType })
        ).then((res: any) => {
            setMedia("")
            setContent("")
            notify("success", "Message sent.")
            setTimeout(() => {
                router.push('/profile')
            }, 1500)
        }).catch((err: any) => throwError(err)).finally(() => setLoading(false))
    }

    const isValid: boolean = Boolean(content) || Boolean(media)

    return (
        <>
            <Header />
            <ToastContainer />
            <form className="form-itself" onSubmit={(e) => e.preventDefault()}>
                <h1 className="text-clr-5 text-center md:text-xl text-lg font-medium">
                    {data?.temporary ?
                    <span>
                        <span className="text-clr-1">
                            {`@${data?.user}`}
                        </span>
                        {`${data?.msg}`}
                    </span> :
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
                        {data?.pbMedia && <label htmlFor="media" className="drop-container">
                            <span className="drop-title">
                                {selected}
                            </span>
                            <input type="file" id="media"
                            accept="image/*, video/mp4"
                            onChange={(e) => handleMedia(e)} />
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