import Meta from "@/components/Meta"
import useAuth from "@/hooks/useAuth"
import Header from "@/components/HeaderA"
import PswdButton from '@/components/PswdBtn'
import { inter } from "../../../../public/fonts"
import { SpinnerTwo } from "@/components/Spinner"

const Edit = () => {
    const {
        showPswd, pswd, setPswd,
        setShowPswd, confirmPswd,
        setConfirmPswd, validPswd,
        handlePswdReset, btnLoading
    }: any = useAuth()

    return (
        <>
            <Meta title="Reset Password" />
            <Header />
            <form onSubmit={(e) => e.preventDefault()}
            className="form-itself">
                <h1 className="form-h1">
                    Reset Password
                </h1>
                <article className="mt-5 form-center">
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
                    <button
                    className="btn" disabled={!validPswd}
                    onClick={async () => await handlePswdReset()}>
                        {btnLoading ? <SpinnerTwo /> : 'Reset Password'}
                    </button>
                </article>
            </form>
        </>
    )
}

export default Edit