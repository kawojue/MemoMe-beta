/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./HeaderA"
import useAuth from "@/hooks/useAuth"
import axios from '@/pages/api/instance'
import { useState, useEffect } from 'react'
import { ToastContainer } from "react-toastify"

const User: React.FC<{ user: string }> = ({ user }) => {
    const { notify }: any = useAuth()

    const [media, setMedia] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [textCounter, setTextCounter]= useState<number>(650)

    const handleContent = (e: any): void => {
        const value: string = e.target.value
        if (value.length <= 650) {
            setContent(value)
        }
    }

    const handleMedia = (e: any): void => {
        const imageFile = e.target.files[0]
        setMedia(imageFile)
        const formData: FormData = new FormData()
        formData.append('image', media)
    }

    // This works but for smaller files
    // const checkFile = (file: any) => {
    //     if (!file) {
    //         return false
    //     }
    //     const maxSize: number = 5242880 // 5MB
    //     const { name, size }: any = file
    //     const allowedFormats: string[] = ['jpg', 'jpeg', 'png', 'heif']
    //     const getFormat = name.split('.')[1]
    //     if (allowedFormats.includes(getFormat) && size <= maxSize) {
    //         return true
    //     }
    //     return false
    // }

    // const convertFile = (file: any): void => {
    //     const reader: FileReader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = () => {
    //         setMedia(reader.result as string)
    //     }
    // }

    // const handleMedia = (e: any): void => {
    //     const file: any = e.target.files[0]
    //     if (checkFile(file)) {
    //         convertFile(file)
    //     } else {
    //         notify('warning', "File format or size is not allowed.")
    //     }
    // }

    useEffect(() => {
        setTextCounter(textCounter - 1)
    }, [content])

    const handleMessage = async () => {
        await axios.post(`/api/${user}`, JSON.stringify({ media, content }))
        .then((res: any) => {
            notify(res?.data.action, res?.data.msg)
        })
        .catch((err: any) => {
            notify(err.response?.data?.action, err.response?.data?.msg)
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