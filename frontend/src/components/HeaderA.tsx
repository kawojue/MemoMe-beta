
import Home from './Home'
import Link from 'next/link'

const HeaderA = ({ get = "login" }: { get?: string }) => {
    return (
        <header className="w-full">
            <nav className="nav md:px-10">
                <Home />
                <ul>
                    <li>
                        <Link href={`/${get.replace(" ", "")}`}
                        className="nav-btn bg-clr-2 hover:bg-clr-1 hover:text-clr-3 trans">
                            {`${get.charAt(0).toUpperCase()}${get.slice(1)}`}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderA