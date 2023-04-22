/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link'
import { useEffect } from 'react'
import Meta from "@/components/Meta"
import useAuth from "@/hooks/useAuth"
import Header from "@/components/HeaderA"
import PswdButton from '@/components/PswdBtn'
import { ToastContainer } from 'react-toastify'

const login = () => {
    const {
        userRef, userId, setUserId,
        pswd, setPswd, handleLogin,
        btnLoading, showPswd,
        setShowPswd
    }: any = useAuth()

    useEffect(() => {
            userRef.current?.focus()
    }, [userRef])

    const isValid: boolean = userId && pswd

    return (
        <>
            <Meta title="Login" />
            <Header get='sign up'/>
            <ToastContainer />
            <form onSubmit={(e) => e.preventDefault()}
            className="form-itself">
                <h1 className="text-clr-5 text-center font-semibold tracking-wider text-2xl md:text-4xl">
                    Login
                </h1>
                <article className="mt-5 form-center">
                    <div className="form-group">
                        <label htmlFor="userId">Username or Email</label>
                        <input type="text" id="userId"
                            autoComplete="off" max={23}
                            value={userId} ref={userRef}
                            onChange={e => setUserId(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="pswd-container">
                            <input max={32} value={pswd}
                            onChange={(e) => setPswd(e.target.value)}
                            type={`${showPswd ? 'text': 'password'}`} />
                            <PswdButton get={showPswd} set={setShowPswd} />
                        </div>
                    </div>
                    <article className="flex justify-end">
                        <Link href="/password/reset"
                        className="text-clr-3 hover:text-clr-5 trans">
                            Forgot Password?
                        </Link>
                    </article>
                    <button
                    className="btn" disabled={!isValid}
                    onClick={async () => await handleLogin()}>
                        {btnLoading ? 'Authenticating...' : 'Login'}
                    </button>
                </article>
            </form>
        </>
    )
}

export default login