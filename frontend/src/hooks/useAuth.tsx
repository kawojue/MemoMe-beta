/* eslint-disable react-hooks/rules-of-hooks */
import { toast } from 'react-toastify'
import axios from '@/pages/api/instance'
import { useRouter, NextRouter } from "next/router"
import { createContext, useContext, useState, useEffect, useRef } from 'react'

const Context: any = createContext({})

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const router: NextRouter = useRouter()
    const USER_REGEX:RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/

    const userRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const [auth, setAuth] = useState<any>({})
    const [userId, setUserId] = useState<string>("")
    const [aside, setAside] = useState<boolean>(false)
    const [showPswd, setShowPswd] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    const [validEmail, setValidEmail] = useState<boolean>(false)

    const [user, setUser] = useState<string>('')
    const [validUser, setValidUser] = useState<boolean>(false)

    const [pswd, setPswd] = useState<string>('')
    const [confirmPswd, setConfirmPswd] = useState<string>('')
    const [validPswd, setValidPswd] = useState<boolean>(false)

    const [btnLoading, setBtnLoading] = useState<boolean>(false)


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
                position: toast.POSITION.TOP_LEFT
            })
        }
        if (action === "error") {
            toast.error(msg, {
                position: toast.POSITION.TOP_LEFT
            })
        }
    }

    const handleSignup = async () => {
        setBtnLoading(true)
        await axios.post('/account/signup',
        JSON.stringify({ email, pswd, pswd2: confirmPswd }))
        .then((res: any) => {
            setEmail("")
            setPswd("")
            setConfirmPswd("")
            setBtnLoading(false)
            setTimeout(() => {
                router.push('/login')
            }, 2000)
            const { action, msg }: any = res?.data
            notify(action, msg)
        })
        .catch((err: any) => {
            setBtnLoading(false)
            const { action, msg }: any = err.response?.data
            notify(action, msg)
        })
    }

    const handleLogin = async () => {
        setBtnLoading(true)
        await axios.post('/account/login',
        JSON.stringify({ userId, pswd }))
        .then((res: any) => {
            const { token, action, msg }: any = res?.data
            setPswd("")
            setUserId("")
            notify(action, msg)
            localStorage.setItem('token', JSON.stringify(token))
            setTimeout(() => {
                router.push('/profile')
            }, 1500)
        })
        .catch((err: any) => {
            const errMsg: string = err.response?.data?.msg
            const action: string = err.response?.data?.action
            if (err.code === 'ERR_NETWORK') {
                notify("error", "Something went wrong")
            } else {
                notify(action, errMsg)
            }
            setBtnLoading(false)
        })
    }

    return (
        <Context.Provider value={{
            auth, aside, setAside, email, setEmail,
            validEmail, handleSignup,
            confirmPswd, setConfirmPswd, handleLogin,
            pswd, setPswd, btnLoading, setBtnLoading,
            emailRef, showPswd, setShowPswd, userId, setUserId,
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