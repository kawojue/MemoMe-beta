import { ICheckMail } from '../type'
import { validate } from 'deep-email-validator'

const checkMail = async (email: string): Promise<ICheckMail> => {
    let { valid, validators, reason } = await validate(email)
    return { valid, validators, reason }
}

export default checkMail