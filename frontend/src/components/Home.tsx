import Link from 'next/link'
import { kaushan } from '../../public/fonts'

const Home: React.FC = () => {
    return (
        <Link href="/" className={`${kaushan.className} text-4xl md:text-5xl`}>
            <span className="text-clr-1">Memo</span>
            <span className="text-clr-8">Me</span>
        </Link>
    )
}

export default Home