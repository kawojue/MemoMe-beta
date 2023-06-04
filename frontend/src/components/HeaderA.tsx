
import Home from './Home'
import Link from 'next/link'

const HeaderA = ({ get = "login" }: { get?: string }) => {
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

export default HeaderA