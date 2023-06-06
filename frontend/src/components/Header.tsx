import Home from './Home'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'

const HeaderA: React.FC<{ get?: string }> = ({ get = "login" }) => {
    return (
        <header className="w-full">
            <nav className="nav md:px-10">
                <Home />
                <Link href={`/${get.replace(" ", "")}`}
                className="nav-btn bg-clr-2 hover:text-clr-7 hover:bg-clr-8">
                    {`${get.charAt(0).toUpperCase()}${get.slice(1)}`}
                </Link>
            </nav>
        </header>
    )
}

const HeaderB: React.FC = () => {
    const { handleLogout }: any = useAuth()

    return (
        <header className="w-full">
            <nav className="nav md:px-10">
                <Home/>
                <button type="button" onClick={async () => await handleLogout()}
                className="nav-btn bg-red-500 hover:text-clr-7 hover:bg-red-700">
                    Logout
                </button>
            </nav>
        </header>
    )
}

export { HeaderA, HeaderB }