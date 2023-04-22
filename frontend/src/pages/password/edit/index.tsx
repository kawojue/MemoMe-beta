import Meta from "@/components/Meta"
import useAuth from "@/hooks/useAuth"
import Header from "@/components/HeaderA"
import PswdButton from '@/components/PswdBtn'
import { ToastContainer } from 'react-toastify'

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
            <ToastContainer />
            <form onSubmit={(e) => e.preventDefault()}
            className="form-itself">
                <h1 className="text-clr-5 text-center font-semibold tracking-wider text-2xl md:text-4xl">
                    Reset Password
                </h1>
                <article className="mt-5 form-center">
                    <div className="form-group">
                        <label>Password</label>
                        <div className="pswd-container">
                            <input max={32} value={pswd}
                            onChange={(e) => setPswd(e.target.value)}
                            type={`${showPswd ? 'text': 'password'}`}
                            className={`border-2 ${validPswd ?
                            'border-green-400' : 'border-red-400'}`}
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
                            'border-green-400' : 'border-red-400'}`}
                            aria-invalid={validPswd ? "false" : "true"} />
                        </div>
                    </div>
                    <button
                    className="btn" disabled={!validPswd}
                    onClick={async () => await handlePswdReset()}>
                        {btnLoading ? 'Encrypting..' : 'Reset Password'}
                    </button>
                </article>
            </form>
        </>
    )
}

export default Edit