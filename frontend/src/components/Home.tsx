import Link from 'next/link'

const Home: React.FC = () => {
    return (
        <Link href="/" className="text-4xl md:text-5xl font-kaushan">
            <span className="text-clr-1">Memo</span>
            <span className="text-black">Me</span>
        </Link>
    )
}

export default Home