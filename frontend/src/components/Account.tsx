/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import useAuth from "@/hooks/useAuth"

const Account: React.FC<{ token: string }> = ({ token }) => {
  const { user, setUser, validUser, userRef,
    btnLoading, handleUsername }: any = useAuth()

  return (
    <main>
      <section>
        <article>
          <form onSubmit={(e) => e.preventDefault()} className="form-itself">
            <h1 className="text-clr-5 text-center font-semibold tracking-wider text-2xl md:text-4xl">
              Edit Username
            </h1>
            <article className="mt-5 form-center">
              <div className="form-group">
                  <label htmlFor="user">Username</label>
                  <input type="text" id="user"
                      autoComplete="off"
                      placeholder="kawojue_"
                      className={`border-2 ${validUser ?
                      'border-green-400' : 'border-red-400'}`}
                      value={user} ref={userRef}
                      onChange={e => setUser(e.target.value)}
                      aria-invalid={validUser ? "false" : "true"}
                      aria-describedby="uidnote" max={89} />
              </div>
              <button
                    className="btn" disabled={!validUser}
                    onClick={async () => await handleUsername()}>
                        {btnLoading ? 'Changing...' : 'Save'}
                    </button>
            </article>
          </form>
        </article>
        <article>
          <h2>Change Username</h2>
        </article>
        <article>
          <h2>Disable Account</h2>
        </article>
      </section>
    </main>
  )
}

export default Account