/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react'
import Meta from "@/components/Meta"
import useAuth from "@/hooks/useAuth"
import HeaderA from "@/components/HeaderA"
import PswdButton from '@/components/PswdBtn'

function signup() {
    const {
        email, setEmail, showPswd, pswd,
        setPswd, validEmail, setShowPswd,
        confirmPswd, setConfirmPswd, emailRef,
        validPswd,
    }: any = useAuth()

    useEffect(() => {
        emailRef.current?.focus()
    }, [emailRef])
    
    return (
        <>
            <Meta title="Sign Up" />
            <HeaderA />
            <form onSubmit={(e) => e.preventDefault()}
            className="mx-auto w-[90vw] max-w-[500px] rounded-md mt-12 signup py-5 px-6">
                <h1 className="text-clr-5 text-center font-semibold tracking-wider text-2xl md:text-4xl">
                    Sign Up
                </h1>
                <article className="mt-5 form-center">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email"
                            autoComplete="off"
                            placeholder="abc@mail.com"
                            className={`border-2 ${validEmail ?
                            'border-green-400' : 'border-2 border-red-400'}`}
                            value={email} ref={emailRef}
                            onChange={e => setEmail(e.target.value)}
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote" max={23} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="pswd-container">
                            <input max={32} value={pswd}
                            onChange={(e) => setPswd(e.target.value)}
                            type={`${showPswd ? 'text': 'password'}`}
                            className={`border-2 ${validPswd ?
                            'border-green-400' : 'border-2 border-red-400'}`}
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
                            className={`border-2 ${validPswd ?
                            'border-green-400' : 'border-2 border-red-400'}`}
                            aria-invalid={validPswd ? "false" : "true"} />
                        </div>
                    </div>
                    <button className="submit-btn">
                        Submit
                    </button>
                </article>
            </form>
        </>
    )
}

export default signup