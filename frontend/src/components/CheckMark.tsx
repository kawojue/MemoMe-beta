import { useEffect } from 'react'
interface ICheckMark {
    get: boolean
    set: (get: boolean) => void
}

const CheckMark: React.FC<ICheckMark> = ({ get, set }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            set(false)
        }, 2300)
        
        return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={`${get === true ? 'wrapper': 'hidden'}`}>
            <svg className="animated-check" viewBox="0 0 24 24">
                <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />
            </svg>
        </div>
    )
}

export default CheckMark