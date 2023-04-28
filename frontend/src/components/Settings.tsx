import useAuth from '@/hooks/useAuth'
import axios from '@/pages/api/instance'
import { useState, useEffect } from 'react'

const Settings: React.FC = () => {
  const { toggles, notify, token,
    setToggles, btnLoading, setBtnLoading }: any = useAuth()

  const [pbMsg, setPbMsg] = useState<string>('')
  const [pbMedia, setPbMedia] = useState<any>(false)
  const [pbContent, setPbContent] = useState<any>(false)

  useEffect(() => {
    setPbMedia(toggles.pbMedia)
    setPbContent(toggles.pbContent)
  }, [toggles])

  const handleMedia = async (): Promise<void> => {
    await axios.post(
      '/settings/tg-media',
      { tgPbMedia: !pbMedia },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        localStorage.setItem('toggles', JSON.stringify(toggles))
        setPbMedia(!pbMedia)
        setToggles((prev: any) => {
          return { ...prev, disabled: !pbMedia }
        })
        console.log(res?.data)
    }).catch((err: any) => {
      notify(err.response?.data?.action, err.response?.data?.msg)
    })
  }

  const handleContent = async (): Promise<void> => {
    await axios.post(
      '/settings/tg-content',
      { tgPbContent: !pbContent },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        localStorage.setItem('toggles', JSON.stringify(toggles))
        setPbContent(!pbContent)
        setToggles((prev: any) => {
          return { ...prev, pbContent: !pbContent }
        })
        console.log(res?.data)
    }).catch((err: any) => {
      notify(err.response?.data?.action, err.response?.data?.msg)
    })
  }

  const handleMsg = async (): Promise<void> => {
    setBtnLoading(true)
    await axios.post(
      '/settings/tg-msg',
      JSON.stringify({ pbMsg }),
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    ).then((res: any) => {
      setPbMsg("")
      setBtnLoading(false)
      notify("success", "Public Message Updated!")
    }).catch((err: any) => {
      setBtnLoading(false)
      notify(err.response?.data?.action, err.response?.data?.msg)
    })
  }

  return (
    <section className="mb-14">
      <form onSubmit={(e) => e.preventDefault()} className="form-itself">
            <h1 className="form-h1 md:text-4xl">
              Edit Public Title
            </h1>
            <article className="mt-5 form-center">
              <div className="form-group">
                  <label htmlFor="user">Title</label>
                  <textarea id="user"
                      autoComplete="off"
                      placeholder="Tell me what is on your mind?"
                      className='content md:text-xl'
                      value={pbMsg} onChange={e => setPbMsg(e.target.value)}
                      maxLength={50} />
              </div>
              <button className="btn" disabled={!pbMsg}
              onClick={async () => await handleMsg()}>
                {btnLoading ? 'Editing...' : 'Save'}
                </button>
            </article>
      </form>
      <article className="mt-10 form-itself">
        <div className="toggle-container">
          <h2 className="toggle-h2 text-clr-5">
            Recieve Image?
          </h2>
          <label className="switch">
            <input type="checkbox" checked={pbMedia}
            onChange={async () => await handleMedia()}/>
            <span className="slider round"></span>
          </label>
        </div>
      </article>
      <article className="mt-10 form-itself">
        <div className="toggle-container">
          <h2 className="toggle-h2 text-clr-5">
            Recieve Texts?
          </h2>
          <label className="switch">
            <input type="checkbox" checked={pbContent}
            onChange={async () => await handleContent()}/>
            <span className="slider round"></span>
          </label>
        </div>
      </article>
    </section>
  )
}

export default Settings