import { Poppins, Kaushan_Script } from 'next/font/google'

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

const kaushan = Kaushan_Script({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

export { kaushan, poppins }