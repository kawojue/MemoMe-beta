import Home from './Home'
import useAuth from '@/hooks/useAuth'

const HeaderB:React.FC= () => {
    const { handleLogout }: any = useAuth()
    return (
        <header className="w-full">
            <nav className="nav md:px-10">
                <Home/>
                <button type="button" onClick={async () => await handleLogout()}
                className="nav-btn hover:text-clr-7 hover:bg-clr-8">
                    Logout
                </button>
            </nav>
        </header>
    )
}

export default HeaderB