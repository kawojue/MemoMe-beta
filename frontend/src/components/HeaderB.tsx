import useAuth from '@/hooks/useAuth'

const HeaderB = () => {
    const { aside, setAside }: any = useAuth()

    return (
        <header className="w-full">
            <nav className="flex justify-between items-center mx-auto md:px-10 px-7 py-5">
                <div className="text-4xl md:text-5xl font-kaushan">
                    <span className="text-clr-1">Memo</span>
                    <span className="text-black">Me</span>
                </div>
                <ul className="md:flex gap-10 hidden">
                    <li>
                        <button type="button"
                        className="text-xl text-white bg-red-500 rounded-lg px-3 py-1 font-poppins hover:bg-red-600 hover:text-clr-3 trans tracking-wider">
                            Logout
                        </button>
                    </li>
                </ul>
                <button type="button" onClick={() => setAside(!aside)}
                className={`${aside ? 'open' : ''} block hamburger md:hidden focus:outline-none trans`}>
                    <span className="hamburger-top trans"></span>
                    <span className="hamburger-middle trans"></span>
                    <span className="hamburger-bottom trans"></span>
                </button>
            </nav>
        </header>
    )
}

export default HeaderB