import { IGenOTP } from "../type"

export default function generateOTP(): IGenOTP {
    let totp: string = ''
    const totpDate: number = Date.now()
    const digits: string = '0918273645'
    const length: number = parseInt('65'[Math.floor(Math.random() * 2)])
    for (let i = 0; i < length; i++) {
        totp += digits[Math.floor(Math.random() * length)]
    }

    return { totp, totpDate }
}