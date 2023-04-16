interface ICheckMail {
    valid: boolean
    validators: any
    reason?: string
}

interface IMailer {
    senderName: string
    to: string
    subject: string
    text: string
}

export { IMailer, ICheckMail }