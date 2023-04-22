import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

interface IPswdButton {
    get: boolean
    set: (x: boolean) => void
}

const PswdButton: React.FC<IPswdButton> = ({get, set}) => {
    return (
        <button className="eye" type="button" onClick={() => set(!get)}>
            {get ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
    )
}

export default PswdButton