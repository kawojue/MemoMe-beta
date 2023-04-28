/* eslint-disable react-hooks/rules-of-hooks */
import { toast } from 'react-toastify'
import axios from '@/pages/api/instance'
import { useRouter, NextRouter } from "next/router"
import { createContext, useContext, useState, useEffect, useRef } from 'react'

const Context: any = createContext({})

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const router: NextRouter = useRouter()

    const userRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)

    const [token, setToken] = useState<any>(null)
    const [userId, setUserId] = useState<string>('')
    const [toggles, setToggles] = useState<any>(null)
    const [showPswd, setShowPswd] = useState<boolean>(false)

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

    const [btnLoading, setBtnLoading] = useState<boolean>(false)

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token') as string)
        const storedToggles = JSON.parse(localStorage.getItem('toggles') as any)
        if (storedToken && storedToggles) {
            setToken(storedToken)
            setToggles(storedToggles)
        } else {
            if (router.asPath === "/profile") {
                router.push('/login')
            }
        }
    }, [router])

    useEffect(() => {
        setLoading(true)
        const handleProfile = async (token: string): Promise<void> => {
            await axios.get('/profile', {
                headers: {
                'Authorization': `Bearer ${token}`
                },
            }).then((res: any) => {
                setData(res?.data)
            }).catch((err: any) => {
                notify(err.response?.data?.action, err.response?.data?.msg)
            })
        };

        if (token && router.asPath === "/profile") {
            (async () => await handleProfile(token))()
        }

        const timeout = setTimeout(() => {
            setLoading(false)
        }, 1500)

        return () => clearTimeout(timeout)
    }, [token, router])

    useEffect(() => {
        // email validation
        const EMAIL_REGEX:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const resEmail: boolean = EMAIL_REGEX.test(email)
        setValidEmail(resEmail)

        // password validation
        if (pswd) {
            const confirm: boolean = pswd === confirmPswd
            setValidPswd(confirm)
        }

        // user validation
        const USER_REGEX:RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/
        const resUser: boolean = USER_REGEX.test(user)
        setValidUser(resUser)
    }, [user, email, pswd, confirmPswd])

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

    const handleSignup = async (): Promise<void> => {
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

    const handleLogin = async (): Promise<void> => {
        setBtnLoading(true)
        await axios.post('/account/login',
        JSON.stringify({ userId, pswd }))
        .then((res: any) => {
            const { action, msg, toggles, token }: any = res?.data
            setPswd("")
            setUserId("")
            notify(action, msg)
            setBtnLoading(false)
            localStorage.setItem('token', JSON.stringify(token))
            localStorage.setItem('toggles', JSON.stringify(toggles))
            setTimeout(() => {
                router.push('/profile')
            }, 1500)
        })
        .catch((err: any) => {
            if (err.code === 'ERR_NETWORK') {
                notify("error", "Something went wrong")
            } else {
                const { action, msg }: any = err.response?.data
                notify(action, msg)
            }
            setBtnLoading(false)
        })
    }

    const handleOtpReq = async (): Promise<void> => {
        await axios.post(
            '/account/req-otp',
            JSON.stringify({ email })
        )
        .then((res: any) => {
            notify("success", "OTP has been sent to your email.")
        })
        .catch((err: any) => {
            const { action, msg }: any = err.response?.data
            notify(action, msg)
        })
    }

    const handlePswdVerify = async (): Promise<void> => {
        setBtnLoading(true)
        await axios.post(
            '/account/password/verify',
            JSON.stringify({ email, otp })
        )
        .then((res: any) => {
            setEligible(res?.data.verified)
            setBtnLoading(false)
            router.push('/password/edit')
        })
        .catch((err: any) => {
            setBtnLoading(false)
            const { action, msg }: any = err.response?.data
            notify(action, msg)
        })
    }

    const handleLogout = async (): Promise<void> => {
        await axios.get('/account/logout', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res: any) => {
            localStorage.removeItem('token')
            router.push("/login")
        }).catch((err: any) => {
            notify("error", err.code)
        })
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
            setBtnLoading(false)
            notify(res.data?.action, res.data?.msg)
            setTimeout(() => {
                router.push('/login')
            }, 1500);
        })
        .catch((err: any) => {
            setBtnLoading(false)
            const { action, msg }: any = err.response?.data
            notify(action, msg)
        })
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
            setBtnLoading(false)
            notify(res?.data?.action, res?.data?.msg)
            setTimeout(() => {
                (async () => await handleLogout())()
            }, 1000)
        }).catch((err: any) => {
            setBtnLoading(false)
            notify(err?.response?.data?.action, err?.response?.data?.msg)
        })
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
            setBtnLoading(false)
            setPswd("")
            setConfirmPswd("")
            setCurrentPswd("")
            notify(res?.data?.action, res?.data?.msg)
            setTimeout(() => {
                (async () => await handleLogout())()
            }, 1000)
        }).catch((err: any) => {
            notify(err?.response?.data?.action, err?.response?.data?.msg)
        })
    }

    return (
        <Context.Provider value={{
            email, setEmail, validEmail, handleSignup,
            confirmPswd, setConfirmPswd, handleLogin,
            pswd, setPswd, btnLoading, setBtnLoading,
            emailRef, showPswd, setShowPswd, userId,
            setUserId, userRef, notify, validPswd,
            setValidPswd, handlePswdReset, setOtp,
            handleOtpReq, otp, handlePswdVerify,
            setUser, validUser, token, data,
            handleUsername, loading, toggles, handleLogout,
            setCurrentPswd, editPassword, currentPswd,
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