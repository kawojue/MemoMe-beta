/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

const Media: React.FC<{ memo: any }> = ({ memo }) => {
    const [blur, setBlur] = useState<boolean>(false)
    
    return (
        <div className="media">
            {memo?.media && <img onDoubleClick={() => setBlur(!blur)}
                className={`image ${blur && 'blur-md'}`}
                src={memo?.media?.secure_url}
                alt={memo?.idx} loading="lazy" />}
        </div>
    )
}

export default Media