import Link from 'next/link'

const HeaderA = () => {
    return (
        <header className="w-full">
            <nav className="flex justify-between items-center mx-auto md:px-10 px-7 py-5">
                <div className="text-4xl md:text-5xl font-kaushan">
                    <span className="text-clr-1">Memo</span>
                    <span className="text-black">Me</span>
                </div>
                <ul className="md:flex gap-10 hidden">
                    <li>
                        <Link href="/signup"
                        className="text-xl text-clr-3 font-poppins">
                            Sign Up
                        </Link>
                    </li>
                    <li>
                        <Link href="/login"
                        className="text-xl text-white bg-clr-2 rounded-lg px-3 py-1 font-poppins hover:bg-clr-1 hover:text-clr-3 trans">
                            Login
                        </Link>
                    </li>
                </ul>
                <button type="button" className="block hamburger md:hidden focus:outline-none trans">
                    <span className="hamburger-top trans"></span>
                    <span className="hamburger-middle trans"></span>
                    <span className="hamburger-bottom trans"></span>
                </button>
            </nav>
        </header>
    )
}

export default HeaderA