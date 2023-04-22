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
    const [textCounter, setTextCounter]= useState<number>(650)

    const handleContent = (e: any): void => {
        const value: string = e.target.value
        if (value.length <= 650) {
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
        await axios.post(`/api/${user}`, JSON.stringify({ media, content }))
        .then((res: any) => {
            setContent("")
            setMedia("")
            const { action, msg }: any = res?.data
            notify(action, msg)
            setTimeout(() => {
                router.push('/profile')
            }, 1000)
        })
        .catch((err: any) => {
            const { action, msg }: any = err.response?.data
            notify(action, msg)
        })
    }

    return (
        <>
            <Header />
            <ToastContainer />
            <form className="" onSubmit={(e) => e.preventDefault()}>
                <h1>Send anonymous message to <span>{user}</span></h1>
                <article>
                    <textarea className="resize-none" maxLength={650}
                    value={content} onChange={(e) => handleContent(e)} />
                    <input type="file" onChange={(e) => handleMedia(e)} />
                </article>
                <button onClick={async () => await handleMessage()}>
                    Send
                </button>
            </form>
        </>
    )
}

export default User