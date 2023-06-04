/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react'
import Meta from "@/components/Meta"
import useAuth from "@/hooks/useAuth"
import Header from "@/components/HeaderA"
import PswdButton from '@/components/PswdBtn'
import { SpinnerTwo } from '@/components/Spinner'
import { inter } from '../../public/fonts'

function signup() {
    const {
        email, setEmail, showPswd, pswd,
        setPswd, validEmail, setShowPswd,
        confirmPswd, setConfirmPswd, emailRef,
        validPswd, handleSignup, btnLoading
    }: any = useAuth()

    useEffect(() => {
        emailRef.current?.focus()
    }, [emailRef])

    const isValid: boolean = validEmail && validPswd
    
    return (
        <>
            <Meta title="Sign Up" />
            <Header />
            <form onSubmit={(e) => e.preventDefault()}
            className="form-itself">
                <h1 className="form-h1 md:text-4xl">
                    Sign Up
                </h1>
                <article className="mt-5 form-center">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email"
                            autoComplete="off"
                            placeholder="example@mail.com"
                            className={`${inter.className} ${validEmail ?
                            'border-clr-4' : 'border-clr-8'}`}
                            value={email} ref={emailRef}
                            onChange={e => setEmail(e.target.value)}
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote" max={89} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="pswd-container">
                            <input max={32} value={pswd}
                            onChange={(e) => setPswd(e.target.value)}
                            type={`${showPswd ? 'text': 'password'}`}
                            className={`${inter.className} ${validPswd ?
                            'border-clr-4' : 'border-clr-8'}`}
                            aria-invalid={validPswd ? "false" : "true"}
                            aria-describedby="uidnote" />
                            <PswdButton get={showPswd} set={setShowPswd} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="pswd-container">
                            <input max={32} value={confirmPswd}
                            type='password' aria-describedby="uidnote"
                            onChange={(e) => setConfirmPswd(e.target.value)}
                            className={`${inter.className} ${validPswd ?
                            'border-clr-4' : 'border-clr-8'}`}
                            aria-invalid={validPswd ? "false" : "true"} />
                        </div>
                    </div>
                    <button className="btn" disabled={!isValid}
                    onClick={async () => await handleSignup()}>
                        {btnLoading ? <SpinnerTwo /> : 'Sign Up'}
                    </button>
                </article>
            </form>
        </>
    )
}

export default signup