import {
    Inter, Kaushan_Script,
    Questrial, Poppins
} from 'next/font/google'

const kaushan = Kaushan_Script({
    weight: '400',
    subsets: ['latin']
})

const questrial = Questrial({
    weight: '400',
    subsets: ['latin']
})

const inter = Inter({
    weight: '400',
    subsets: ['latin']
})

const poppins = Poppins({
    weight: '400',
    subsets: ['latin']
})

export {
    kaushan, questrial,
    inter, poppins
}