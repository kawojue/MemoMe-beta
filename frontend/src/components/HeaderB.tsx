import Home from './Home'

const HeaderB:React.FC<{ logout: () => Promise<void>}> = ({ logout }) => {
    return (
        <header className="w-full">
            <nav className="nav md:px-10">
                <Home/>
                <ul>
                    <li>
                        <button type="button" onClick={async () => await logout()}
                        className="nav-btn  bg-red-500 hover:bg-red-600 hover:text-clr-3">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderB