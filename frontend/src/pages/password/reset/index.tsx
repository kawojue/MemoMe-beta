import Meta from "@/components/Meta"
import useAuth from "@/hooks/useAuth"
import Header from "@/components/HeaderA"
import {
    inter, poppins
} from "../../../../public/fonts"
import { SpinnerTwo } from "@/components/Spinner"

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
            <form onSubmit={(e) => e.preventDefault()}
            className="form-itself">
                <h1 className="text-clr-5 text-center font-semibold tracking-wider text-2xl md:text-4xl">
                    Verify your Identity!
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
                            aria-describedby="uidnote" max={23} />
                    </div>
                    <div className="form-group">
                        <label>Code</label>
                        <div className="flex flex-col gap-2">
                            <input max={6} value={otp} className={inter.className}
                            onChange={(e) => setOtp(e.target.value)} type='text'
                            placeholder='OTP sent to your email.'/>
                            <button onClick={async () => await handleOtpReq()}
                            disabled={!validEmail} className={`${poppins.className} req-btn`}>
                                Request
                            </button>
                        </div>
                    </div>
                    <button
                    className="btn" disabled={!isValid}
                    onClick={async () => await handlePswdVerify()}>
                        {btnLoading ? <SpinnerTwo /> : 'Verify'}
                    </button>
                </article>
            </form>
        </>
    )
}

export default Reset