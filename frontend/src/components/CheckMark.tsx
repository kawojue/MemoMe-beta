
interface ICheckMark {
    get: boolean
    set: (get: boolean) => void
}

const CheckMark: React.FC<ICheckMark> = ({ get, set }) => {
    setTimeout(() => {
        set(false)
    }, 2000)

    return (
        <div className={`${get === true ? 'wrapper': 'hidden'}`}>
            <svg className="animated-check" viewBox="0 0 24 24">
                <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />
            </svg>
        </div>
    )
}

export default CheckMark