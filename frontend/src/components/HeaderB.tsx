import Home from './Home'
import useAuth from '@/hooks/useAuth'

const HeaderB:React.FC= () => {
    const { handleLogout }: any = useAuth()
    return (
        <header className="w-full">
            <nav className="nav md:px-10">
                <Home/>
                <button type="button" onClick={async () => await handleLogout()}
                className="nav-btn  bg-red-500 hover:bg-red-600 hover:text-clr-3">
                    Logout
                </button>
            </nav>
        </header>
    )
}

export default HeaderB