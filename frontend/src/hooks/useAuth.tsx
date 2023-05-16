/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { saveAs } from 'file-saver'
import { toast } from 'react-toastify'
import axios from '@/pages/api/instance'
import { useRouter, NextRouter } from "next/router"
import { formatDistanceToNow, parseISO } from "date-fns"
import { createContext, useContext, useState, useEffect, useRef } from 'react'

const Context: any = createContext({})

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const router: NextRouter = useRouter()

    const userRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const [data, setData] = useState<any>({})
    const [copy, setCopy] = useState<any>("Copy")
    const [dialog, setDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const [token, setToken] = useState<any>(null)
    const [userId, setUserId] = useState<string>('')
    const [toggles, setToggles] = useState<any>(null)
    const [showPswd, setShowPswd] = useState<boolean>(false)
    const [btnLoading, setBtnLoading] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    const [validEmail, setValidEmail] = useState<boolean>(false)

    const [user, setUser] = useState<string>('')
    const [validUser, setValidUser] = useState<boolean>(false)

    const [otp, setOtp] = useState<string>('')
    const [eligle, setEligible] = useState<boolean>(false)

    const [pswd, setPswd] = useState<string>('')
    const [currentPswd, setCurrentPswd] = useState<string>('')
    const [confirmPswd, setConfirmPswd] = useState<string>('')
    const [validPswd, setValidPswd] = useState<boolean>(false)

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token') as string)
        const storedToggles = JSON.parse(localStorage.getItem('toggles') as any)
        if (storedToken && storedToggles) {
            setToken(storedToken)
            setToggles(storedToggles)
        } else {
            if (router.asPath === "/profile") router.push('/login')
        }
    }, [router])

    useEffect(() => {
        const handleProfile = async (token: string): Promise<void> => {
            setLoading(true)
            await axios.get('/profile', {
                headers: {
                'Authorization': `Bearer ${token}`
                },
            }).then((res: any) => setData(res?.data)).catch((err: any) => throwError(err)).finally(() => setLoading(false))
        };

        if (token && router.asPath === "/profile") (async () => await handleProfile(token))()
    }, [token, router])

    useEffect(() => {
        // email validation
        const EMAIL_REGEX:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        setValidEmail(EMAIL_REGEX.test(email))

        // password validation
        if (pswd) setValidPswd(pswd === confirmPswd)

        // user validation
        const USER_REGEX:RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/
        setValidUser(USER_REGEX.test(user))
    }, [user, email, pswd, confirmPswd])

    const throwError = (err: any) => {
        const msg = err.response?.data?.msg
        const action = err.response?.data?.action
        if (action) {
            notify(action, msg)
        } else {
            notify("error", err.code)
        }
    }

    const notify = (action: string, msg: string): void => {
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

    const updateToggle = (key: string, value: boolean): void => {
        let newToggles: any = JSON.parse(localStorage.getItem('toggles') as any)
        if (key === "pbMedia") {
            newToggles = {...newToggles, pbMedia: !value}
        }
        if (key === "disabled") {
            newToggles = {...newToggles, disabled: !value}
        }
        if (key === "pbContent") {
            newToggles = {...newToggles, pbContent: !value}
        }
        setToggles(newToggles)
        localStorage.setItem('toggles', JSON.stringify(newToggles))
    }

    const onCopy = async (value: any): Promise<void> => {
        try {
            await navigator.clipboard.writeText(value)
            setCopy("Copied!")
            setTimeout(() => {
                setCopy("Copy")
            }, 1200)
        } catch (err) {
            setCopy('Failed to copy!')
        }
    }

    const getPeriod = (timestamp: string): string => {
        let period: string = ''
        if (timestamp) {
            const date: Date = parseISO(timestamp)
            const timePeriod: string = formatDistanceToNow(date)
            period = `${timePeriod} ago..`
        }
        return period
    }

    const downloadImage = (url: string): void => {
        const splitName: string[] = url.split('/')
        saveAs(url, splitName[splitName.length - 1])
    }

    const handleSignup = async (): Promise<void> => {
        setBtnLoading(true)
        await axios.post('/account/signup',
        JSON.stringify({ email, pswd, pswd2: confirmPswd }))
        .then((res: any) => {
            setEmail("")
            setPswd("")
            setConfirmPswd("")
            setTimeout(() => {
                router.push('/login')
            }, 2000)
            const { action, msg }: any = res?.data
            notify(action, msg)
        }).catch((err: any) => throwError(err)).finally(() => setBtnLoading(false))
    }

    const handleLogin = async (): Promise<void> => {
        setBtnLoading(true)
        await axios.post('/account/login',
        JSON.stringify({ userId, pswd }))
        .then((res: any) => {
            const { action, msg, toggles, token }: any = res?.data
            setPswd("")
            setUserId("")
            setConfirmPswd("")
            notify(action, msg)
            localStorage.setItem('token', JSON.stringify(token))
            localStorage.setItem('toggles', JSON.stringify(toggles))
            setTimeout(() => {
                router.push('/profile')
            }, 1500)
        }).catch((err: any) => throwError(err)).finally(() => setBtnLoading(false))
    }

    const handleOtpReq = async (): Promise<void> => {
        await axios.post(
            '/account/req-otp',
            JSON.stringify({ email })
        ).then((res: any) => {
            notify("success", "OTP has been sent to your email.")
        }).catch((err: any) => throwError(err))
    }

    const handlePswdVerify = async (): Promise<void> => {
        setBtnLoading(true)
        await axios.post(
            '/account/password/verify',
            JSON.stringify({ email, otp })
        )
        .then((res: any) => {
            setEligible(res?.data.verified)
            router.push('/password/edit')
        })
        .catch((err: any) => throwError(err)).finally(() => setBtnLoading(false))
    }

    const handleLogout = async (): Promise<void> => {
        await axios.get('/account/logout', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res: any) => {
            localStorage.clear()
            router.push("/login")
        }).catch((err: any) => throwError(err))
    }

    const handlePswdReset = async (): Promise<void> => {
        setBtnLoading(true)
        await axios.post('/account/password/reset',
        JSON.stringify({
            verified: eligle, email,
            newPswd: pswd, newPswd2: confirmPswd
        }))
        .then((res: any) => {
            setPswd("")
            setEmail("")
            setConfirmPswd("")
            notify(res.data?.action, res.data?.msg)
            setTimeout(() => {
                router.push('/login')
            }, 1500);
        }).catch((err: any) => throwError(err)).finally(() => setBtnLoading(false))
    }

    const handleUsername = async (): Promise<void> => {
        setBtnLoading(true)
        await axios.post(
            '/account/edit',
            JSON.stringify({ newUser: user }),
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((res: any) => {
            setUser("")
            notify(res?.data?.action, res?.data?.msg)
            setTimeout(() => {
                (async () => await handleLogout())()
            }, 1000)
        }).catch((err: any) => throwError(err)).finally(() => setBtnLoading(false))
    }

    const editPassword = async (): Promise<void> => {
        setBtnLoading(true)
        await axios.post(
            '/account/password/change',
            JSON.stringify({ currentPswd, pswd, pswd2: confirmPswd }),
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((res: any) => {
            setPswd("")
            setConfirmPswd("")
            setCurrentPswd("")
            notify(res?.data?.action, res?.data?.msg)
            setTimeout(() => {
                (async () => await handleLogout())()
            }, 1000)
        }).catch((err: any) => throwError(err)).finally(() => setBtnLoading(false))
    }

    return (
        <Context.Provider value={{
            email, setEmail, validEmail, handleSignup, confirmPswd, setConfirmPswd, handleLogin,
            pswd, setPswd, btnLoading, setBtnLoading, emailRef, showPswd, setShowPswd, userId,
            setUserId, userRef, notify, validPswd, setValidPswd, handlePswdReset, setOtp, otp,
            handleOtpReq, handlePswdVerify, setUser, validUser, token, data, setDialog, loading,
            handleUsername, toggles, onCopy, throwError, updateToggle, handleLogout, getPeriod,
            setCurrentPswd, editPassword, currentPswd, downloadImage, copy, dialog,
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