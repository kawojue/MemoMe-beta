/* eslint-disable react-hooks/rules-of-hooks */
import { toast } from 'react-toastify'
import { createContext, useContext, useState, useEffect, useRef } from 'react'

const Context: any = createContext({})

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const USER_REGEX:RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/

    const userRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const [auth, setAuth] = useState<any>({})
    const [aside, setAside] = useState<boolean>(false)
    const [showPswd, setShowPswd] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    const [validEmail, setValidEmail] = useState<boolean>(false)

    const [pswd, setPswd] = useState<string>('')
    const [confirmPswd, setConfirmPswd] = useState<string>('')
    const [validPswd, setValidPswd] = useState<boolean>(false)


    useEffect(() => {
        const EMAIL_REGEX:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // email validation
        const resEmail: boolean = EMAIL_REGEX.test(email)
        setValidEmail(resEmail)

        // password validation
        if (pswd) {
            const confirm: boolean = pswd === confirmPswd
            setValidPswd(confirm)
        }
    }, [email, pswd, confirmPswd])

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem("token") as any) || {})
    }, [])


    const notify = (action: string, msg: string) => {
        if (action === "success") {
            toast.success(msg, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        if (action === "warning") {
            toast.warning(msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
        if (action === "error") {
            toast.error(msg, {
                position: toast.POSITION.BOTTOM_LEFT
            })
        }
    }

    return (
        <Context.Provider value={{
            auth, aside, setAside, email, setEmail,
            validEmail,
            confirmPswd, setConfirmPswd,
            pswd, setPswd,
            emailRef, showPswd, setShowPswd,
            USER_REGEX, userRef, notify, validPswd, setValidPswd
        }}>
            {children}
        </Context.Provider>
    )
}

const useAuth: any = () => {
    const context:any = useContext(Context)
    if (context ===  undefined) {
        throw new Error("___")
    }
    return context
}

export default useAuth