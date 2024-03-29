import bcrypt from 'bcrypt'
import { Response } from 'express'
import mailer from '../utils/mailer'
import genOTP from '../utils/genOTP'
import {
    INC_PSWD, SMTH_WRONG, SUCCESS,
    ACCESS_DENIED, CRED_BLANK, ERROR,
} from '../utils/modal'
import User from '../models/UserModel'
import randomString from 'randomstring'
import genToken from '../utils/genToken'
import { IGenOTP, IMailer, IRequest } from '../type'
const asyncHandler = require('express-async-handler')

const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USER_REGEX: RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/
const restrictedUser: string[] = [
    "profile", "admin", "account",
    "api", "root", "wp-admin", "user",
    "id", "signup", "login", "edit",
    "password", "reset", "logout",
    "memome"
]

// handle account creation
const createUser = asyncHandler(async (req: IRequest, res: Response) => {
    let user: any
    let { email, pswd, pswd2 }: any = req.body
    email = email?.toLowerCase()?.trim()

    if (!email || !pswd || !pswd2) return res.status(400).json(CRED_BLANK)

    if (pswd !== pswd2) return res.status(400).json({ ...ERROR, msg: "Passwords does not match." })

    if (!EMAIL_REGEX.test(email)) return res.status(400).json({ ...ERROR, msg: "Invalid Email." })

    user = email?.split('@')[0]?.toLowerCase()
    const account: any = await User.findOne({ 'mail.email': email }).exec()

    if (account) return res.status(409).json({ ...ERROR, msg: "Account already exists." })

    const isUserExists: any = await User.findOne({ user }).exec()
    if (!USER_REGEX.test(user) || isUserExists || restrictedUser.includes(user)) {
        const rand: string = randomString.generate({
            length: parseInt('86759'[Math.floor(Math.random() * 5)]),
            charset: 'alphabetic'
        }) as string
        user = rand?.toLowerCase()?.trim()
    }

    const salt: string = await bcrypt.genSalt(10)
    pswd = await bcrypt.hash(pswd, salt)

    await User.create({
        user,
        password: pswd as string,
        'mail.email': email as string,
        createdAt: `${new Date()}`
    })

    res.status(201).json({ ...SUCCESS, msg: "Account creation was successful." })
})

// handle Login
const login = asyncHandler(async (req: IRequest, res: Response) => {
    let { userId, pswd }: any = req.body
    userId = userId?.toLowerCase()?.trim()

    if (!userId || !pswd) return res.status(400).json(CRED_BLANK)

    const account: any = await User.findOne(
        EMAIL_REGEX.test(userId) ?
            { 'mail.email': userId } : { user: userId }
    ).exec()

    if (!account) return res.status(400).json({ ...ERROR, msg: "Invalid User ID or Password." })

    const match: boolean = await bcrypt.compare(pswd, account.password)
    if (!match) return res.status(401).json(INC_PSWD)

    const token = genToken(account.user)

    account.token = token
    account.lastLogin = `${new Date()}`
    await account.save()

    res.status(200).json({
        token,
        toggles: {
            disabled: account.disabled,
            pbMedia: account.pbMedia,
            pbContent: account.pbContent
        },
        ...SUCCESS,
        msg: "Login successful.",
    })
})

// send otp to user
const otpHandler = asyncHandler(async (req: IRequest, res: Response) => {
    let { email }: any = req.body
    email = email?.trim()?.toLowerCase()

    const { totp, totpDate }: IGenOTP = genOTP()

    if (!email) return res.status(400).json({ ...ERROR, msg: "Invalid email." })

    const account: any = await User.findOne({ 'mail.email': email }).exec()
    if (!account) return res.status(400).json({ ...ERROR, msg: "There is no account associated with this email." })

    account.OTP.totp = totp
    account.OTP.totpDate = totpDate
    account.mail.verified = false
    await account.save()

    const transportMail: IMailer = {
        senderName: "Muyiwa at MemoMe",
        to: email,
        subject: "Verification Code",
        text: `Code: ${totp}\nIf you did not request for this OTP. Please, ignore.`
    }
    await mailer(transportMail)

    res.status(200).json({ ...SUCCESS, msg: "OTP has been sent to your email." })
})

// change username
const editUsername = asyncHandler(async (req: IRequest, res: Response) => {
    let { newUser }: any = req.body
    newUser = newUser?.trim()?.toLowerCase()

    if (!newUser) return res.status(400).json(CRED_BLANK)

    if (restrictedUser.includes(newUser) || !USER_REGEX.test(newUser)) return res.status(400).json({ ...ERROR, msg: "Username is not allowed." })

    const account: any = await User.findOne({ user: req.user?.user }).exec()
    if (!account) return res.status(404).json(SMTH_WRONG)

    const userExists: any = await User.findOne({ user: newUser }).exec()
    if (userExists) return res.status(409).json({ ...ERROR, msg: "Username has been taken." })

    account.token = ""
    account.user = newUser
    await account.save()

    res.status(200).json({ ...SUCCESS, msg: "You've successfully changed your username." })
})

const logout = asyncHandler(async (req: IRequest, res: Response) => {
    const authHeader = req.headers?.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) return res.sendStatus(204)

    const token: string = authHeader.split(' ')[1]
    const account: any = await User.findOne({ token }).exec()

    if (!account) return res.sendStatus(204)

    account.token = ""
    await account.save()

    res.sendStatus(204)
})

// verify OTP
const verifyOTP = asyncHandler(async (req: IRequest, res: Response) => {
    const { otp, email }: any = req.body

    if (!otp || !email) return res.status(400).json(CRED_BLANK)

    const account: any = await User.findOne({ 'mail.email': email }).exec()
    const totp: string = account.OTP.totp
    const totpDate: number = account.OTP.totpDate
    const expiry: number = totpDate + (60 * 60 * 1000) // after 1hr

    if (expiry < Date.now()) {
        account.OTP = {}
        await account.save()
        return res.status(400).json({ ...ERROR, msg: "OTP Expired." })
    }

    if (totp !== otp) return res.status(401).json({ ...ERROR, msg: "Incorrect OTP." })

    account.OTP = {}
    account.mail.verified = true
    await account.save()

    res.status(200).json({ email, verified: true, user: account.user })
})

// reset password
const resetpswd = asyncHandler(async (req: IRequest, res: Response) => {
    const { verified, email, newPswd, newPswd2 }: any = req.body

    if (!email || !newPswd) return res.status(400).json(CRED_BLANK)

    if (newPswd !== newPswd2) return res.status(400).json({ ...ERROR, msg: "Password does not match." })

    const account: any = await User.findOne({ 'mail.email': email }).exec()
    if (!account) return res.status(404).json({ ...ERROR, msg: "Account does not exist." })

    if (!verified || !account.mail.verified) return res.status(400).json(ACCESS_DENIED)

    const compare = await bcrypt.compare(newPswd, account.password)
    if (compare) return res.status(400).json({ ...ERROR, msg: "You input your current password." })

    const salt: string = await bcrypt.genSalt(10)
    const hasedPswd: string = await bcrypt.hash(newPswd, salt)

    account.token = ""
    account.password = hasedPswd
    account.mail.verified = false
    await account.save()

    res.status(200).json({ ...SUCCESS, msg: "Password updated successfully." })
})

export {
    createUser, login, logout, verifyOTP,
    otpHandler, resetpswd, editUsername,
}