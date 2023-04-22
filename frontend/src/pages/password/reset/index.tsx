import Meta from "@/components/Meta"
import useAuth from "@/hooks/useAuth"
import Header from "@/components/HeaderA"
import { ToastContainer } from 'react-toastify'

const Reset = () => {
    const {
        email, setEmail, validEmail,
        emailRef, handlePswdVerify,
        btnLoading, otp, setOtp,
        handleOtpReq
    }: any = useAuth()

    const isValid: boolean = otp && validEmail

    return (
        <>
            <Meta title="Reset Password" />
            <Header get='login' />
            <ToastContainer />
            <form onSubmit={(e) => e.preventDefault()}
            className="form-itself">
                <h1 className="text-clr-5 text-center font-semibold tracking-wider text-2xl md:text-4xl">
                    Verify it is you!
                </h1>
                <article className="mt-5 form-center">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email"
                            autoComplete="off"
                            placeholder="abc@mail.com"
                            className={`border-2 ${validEmail ?
                            'border-green-400' : 'border-red-400'}`}
                            value={email} ref={emailRef}
                            onChange={e => setEmail(e.target.value)}
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote" max={23} />
                    </div>
                    <div className="form-group">
                        <label>Code</label>
                        <div>
                            <input max={6} value={otp}
                            onChange={(e) => setOtp(e.target.value)} type='text'
                            placeholder='OTP sent to your email.'/>
                            <button onClick={async () => await handleOtpReq()}
                            className="text-clr-3 font-medium w-fit">
                                Request
                            </button>
                        </div>
                    </div>
                    <button
                    className="btn" disabled={!isValid}
                    onClick={async () => await handlePswdVerify()}>
                        {btnLoading ? 'Checking...' : 'Verify'}
                    </button>
                </article>
            </form>
        </>
    )
}

export default Reset