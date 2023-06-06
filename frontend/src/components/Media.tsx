/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { useState } from 'react'

const Media: React.FC<{ memo: any }> = ({ memo }) => {
    const [blur, setBlur] = useState<boolean>(false)

    const getMediaType = (url: string) => {
        let type: any
        const split = url.split('.')
        const ex: string = split[split.length - 1]
        if (ex === 'mp4') {
            type = "video"
        } else {
            type = "image"
        }
        return type
    }

    return (
        <div className="media">
            {getMediaType(memo?.media.secure_url) === "image" &&
                <Image onDoubleClick={() => setBlur(!blur)}
                className={`image ${blur && 'blur-md'}`}
                src={memo?.media.secure_url} alt={memo?.idx}
                width={300} height={300} priority />}
            {getMediaType(memo?.media.secure_url) === "video" &&
                <video src={memo?.media.secure_url}
                onDoubleClick={() => setBlur(!blur)}
                className={`image ${blur && 'blur-md'}`} />}
        </div>
    )
}

export default Media