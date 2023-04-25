import bcrypt from 'bcrypt'
import mailer from '../config/mailer'
import genOTP from '../config/genOTP'
import User from '../models/UserModel'
import jwt, { Secret } from 'jsonwebtoken'
import { IMailer, IGenOTP } from '../type'
const asyncHandler = require('express-async-handler')
import { Request, Response } from 'express'

const EMAIL_REGEX:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USER_REGEX:RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/
const restrictedUser: string[] = [
        "profile", "admin", "account",
        "api", "root", "wp-admin", "user",
        "id", "signup", "login", "edit",
        "password", "reset", "logout",
        "memome"
]

// handle account creation
const createUser = asyncHandler(async (req: any, res: Response) => {
    let { email, pswd, pswd2 }: any = req.body
    email = email?.toLowerCase()?.trim()

    if (!email || !pswd || !pswd2) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "All fields are required."
        })
    }

    if (pswd !== pswd2) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "Passwords does not match."
        })
    }

    if (EMAIL_REGEX.test(email) === false) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "Email Regex is not valid."
        })
    }

    const user: string = email.split('@')[0]
    const account: any = await User.findOne({ 'mail.email': email }).exec()

    if (restrictedUser.includes(user) || !USER_REGEX.test(user)) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "Username is not allowed."
        })
    }

    if (account) {
        return res.status(409).json({
            success: false,
            action: "warning",
            msg: "Account already exists."
        })
    }

    const salt: string = await bcrypt.genSalt(10)
    pswd = await bcrypt.hash(pswd, salt)

    await User.create({
        user,
        password: pswd as string,
        'mail.email': email as string,
        createdAt: `${new Date()}`
    })

    res.status(201).json({
        success: true,
        action: "success",
        msg: "Account creation was successful."
    })
})

// handle Login
const login = asyncHandler(async (req: Request, res: Response) => {
    const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let { userId, pswd }: any = req.body
    userId = userId?.toLowerCase()?.trim()

    if (!userId || !pswd) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "All fields are required."
        })
    }

    const account: any = await User.findOne(
        EMAIL_REGEX.test(userId) ?
            { 'mail.email': userId } : { user: userId }
    ).exec()

    if (!account) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "Invalid User ID or Password."
        })
    }

    const match: boolean = await bcrypt.compare(pswd, account.password)
    if (!match) {
        return res.status(401).json({
            success: false,
            action: "error",
            msg: "Incorrect password."
        })
    }

    const token: Secret = jwt.sign(
        { "user": account.user },
        process.env.JWT_SECRET as string,
        { expiresIn: '90d' }
    )

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
        success: true,
        action: "success",
        msg: "Login successful.",
    })
})

// send otp to user
const otpHandler = asyncHandler(async (req: Request, res: Response) => {
    let { email }: any = req.body
    email = email?.trim()?.toLowerCase()

    const { totp, totpDate }: IGenOTP = genOTP()

    if (!email) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "Invalid email"
        })
    }

    const account: any = await User.findOne({ 'mail.email': email }).exec()
    if (!account) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "There is no account associated with this email."
        })
    }

    account.OTP.totp = totp
    account.OTP.totpDate = totpDate
    await account.save()

    const transportMail: IMailer = {
        senderName: "Kawojue Raheem - Admin",
        to: email,
        subject: "Verification Code",
        text: `Code: ${totp}`
    }

    await mailer(transportMail)

    res.status(200).json({
        success: true,
        action: "success",
        msg: "OTP has been sent to your email."
    })
})

// change username
const editUsername = asyncHandler(async (req: any, res: Response) => {
    let { pswd, newUser }: any = req.body
    newUser = newUser?.trim()?.toLowerCase()

    if (!newUser || !pswd) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "All fields are required"
        })
    }

    if (restrictedUser.includes(newUser) || !USER_REGEX.test(newUser)) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "Username is not allowed."
        })
    }

    const account: any = await User.findOne({ user: req.user?.user })
    if (!account) {
        return res.status(404).json({
            success: false,
            action: "error",
            msg: "Sorry, something went wrong. Try logging out then login again."
        })
    }

    const userExists: any = await User.findOne({ user: newUser })
    if (userExists) {
        return res.status(409).json({
            success: false,
            action: "info",
            msg: "Username has been taken."
        })
    }

    const match: boolean = await bcrypt.compare(pswd, account.password)
    if (!match) {
        return res.status(401).json({
            success: false,
            action: "error",
            msg: "Incorrect password."
        })
    }

    account.user = newUser
    account.token = ""
    await account.save()

    res.status(200).json({
        success: true,
        action: "success",
        msg: "You've successfully changed your username."
    })
})

const logout = asyncHandler(async (req: any, res: Response) => {
    const authHeader = req.headers?.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.sendStatus(204)
    }

    const token: string = authHeader.split(' ')[1]
    const account: any = await User.findOne({ token })

    if (!account) {
        return res.sendStatus(204)
    }

    account.token = ""
    await account.save()

    res.sendStatus(204)
})

// verify OTP
const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
    const { otp, email }: any = req.body

    if (!otp || !email) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "All fields are required."
        })
    }

    const account: any = await User.findOne({ 'mail.email': email }).exec()
    const totp = account.OTP.totp
    const totpDate = account.OTP.totpDate
    const expiry: number = totpDate + (60 * 60 * 1000) // after 1hr

    if (expiry < Date.now()) {
        account.OTP = {}
        await account.save()
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "OTP Expired."
        })
    }

    if (totp !== otp) {
        return res.status(401).json({
            success: false,
            action: "error",
            msg: "Incorrect OTP"
        })
    }

    account.OTP = {}
    account.mail.verifed = true
    await account.save()

    res.status(200).json({
        verified: true,
        email,
        user: account.user
    })
})

// reset password
const resetpswd = asyncHandler(async (req: Request, res: Response) => {
    const { verified, email, newPswd, newPswd2 }: any = req.body

    if (!verified) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "You're not eligible to reset your password."
        })
    }

    if (!email || !newPswd) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "All fields are required."
        })
    }

    if (newPswd !== newPswd2) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "Password does not match."
        })
    }

    const account: any = await User.findOne({ 'mail.email': email }).exec()
    if (!account) {
        return res.status(404).json({
            success: false,
            action: "error",
            msg: "Account does not exist."
        })
    }

    const compare = await bcrypt.compare(newPswd, account.password)
    if (compare) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "You input your current passowrd"
        })
    }

    const salt: string = await bcrypt.genSalt(10)
    const hasedPswd: string = await bcrypt.hash(newPswd, salt)

    account.password = hasedPswd
    account.token = ""
    await account.save()

    res.status(200).json({
        success: true,
        action: "success",
        msg: "Password updated successfully."
    })
})

export {
    createUser, login, logout, verifyOTP,
    otpHandler, resetpswd, editUsername,
}