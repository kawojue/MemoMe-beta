import { Request } from 'express'

interface IMailer {
    to: string
    text: string
    subject: string
    senderName: string
}

interface IGenOTP {
    totp: string
    totpDate: number
}

interface ILimiter {
    max: number
    msg?: string
    timerArr: number[]
}

interface IRequest extends Request {
    user: any
}

type Modal = {
    msg?: string
    success: true | false,
    action: 'error' | 'success'
}

export { Modal, ILimiter, IMailer, IGenOTP, IRequest }