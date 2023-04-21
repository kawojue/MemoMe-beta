import HeaderA from "./HeaderA"
import { useState } from 'react'
import useAuth from "@/hooks/useAuth"
import axios from '@/pages/api/instance'
import { ToastContainer } from "react-toastify"

const User: React.FC<{ user: string }> = ({ user }) => {
    const { errorModal }: any = useAuth()

    const [media, setMedia] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const convertFile = (file: any): void => {
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setMedia(reader.result as string)
        }
    }

    const handleMedia = (e: any): void => {
        const file: any = e.target.files[0]
        convertFile(file)
    }

    const handleMessage = async () => {
        await axios.post(`/api/${user}`, JSON.stringify({ media, content }))
        .then((res: any) => {
            errorModal(res.data.action, res.data.msg)
        })
        .catch((err: any) => {
            errorModal(err.response.data.action, err.response.data.msg)
        })
    }

    return (
        <>
            <HeaderA/>
            <form className="" onSubmit={(e) => e.preventDefault()}>
                <ToastContainer />
                <h1>Send anonymous message to <span>{user}</span></h1>
                <article>
                    <textarea className="resize-none"
                    value={content} onChange={(e) => setContent(e.target.value)} />
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