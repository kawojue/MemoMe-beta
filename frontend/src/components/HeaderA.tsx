import Link from 'next/link'

const HeaderA = ({ get = "login" }: { get?: string }) => {
    return (
        <header className="w-full">
            <nav className="flex justify-between items-center mx-auto md:px-10 px-7 py-5">
                <div className="text-4xl md:text-5xl font-kaushan">
                    <span className="text-clr-1">Memo</span>
                    <span className="text-black">Me</span>
                </div>
                <ul>
                    <li>
                        <Link href={`/${get}`}
                        className="text-xl text-white bg-clr-2 rounded-lg px-3 py-1 font-poppins hover:bg-clr-1 hover:text-clr-3 trans">
                            {`${get.charAt(0).toUpperCase()}${get.slice(1)}`}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderA