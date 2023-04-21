import Link from 'next/link'
import useAuth from "@/hooks/useAuth"
import { GiCancel } from 'react-icons/gi'
import { AiFillSetting } from 'react-icons/ai'

const SideBar: React.FC = () => {
    const { aside, setAside }: any = useAuth()

    return (
        <section id="sidebar" className={`${aside ? 'show' : ''}`}>
            <aside id="aside" className={`${aside ? 'show' : ''}`}>
                <div className="w-full flex justify-between items-center absolute top-3 px-5">
                    <Link href="/settings" className="settings">
                        <AiFillSetting />
                    </Link>
                    <button type="button" title="close"
                        className="close-sidebar"
                        onClick={() => setAside(false)}>
                        <GiCancel />
                    </button>
                </div>
            </aside>
        </section>
    )
}

export default SideBar