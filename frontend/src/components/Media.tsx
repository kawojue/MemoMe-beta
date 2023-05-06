/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from 'react'

const Media: React.FC<{ memo: any }> = ({ memo }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [blur, setBlur] = useState<boolean>(false)
    const [thumbnailSrc, setThumbnailSrc] = useState<string>('')

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

    const loadMetadata = () => {
        const video = videoRef.current
        const canvas = canvasRef.current
        if (!video || !canvas) return
        canvas.width = video?.videoWidth
        canvas.height = video?.videoHeight
        const ctx = canvas?.getContext('2d')
        if (!ctx) return
        ctx.drawImage(video, 0, 0, canvas?.width, canvas?.height)
    }

    useEffect(() => {
        if (canvasRef.current) {
            setThumbnailSrc(canvasRef.current.toDataURL())
        }
    }, [canvasRef])
    
    return (
        <div className="media">
            {memo?.media && <>
                {getMediaType(memo?.media.secure_url) === "video" ?
                    <img onDoubleClick={() => setBlur(!blur)}
                        className={`image ${blur && 'blur-md'}`}
                        src={memo?.media.secure_url}
                        alt={memo?.idx} loading="lazy" /> :
                    <>
                        <video ref={videoRef}
                        src={memo?.media.secure_url}
                        onLoadedMetadata={loadMetadata} />
                        <canvas ref={canvasRef} />
                        <img src={thumbnailSrc}
                        alt={memo?.idx} loading='lazy'
                        onDoubleClick={() => setBlur(!blur)}
                        className={`image ${blur && 'blur-md'}`} />
                    </>}
            </>}
        </div>
    )
}

export default Media