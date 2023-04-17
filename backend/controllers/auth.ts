import bcrypt from 'bcrypt'
import { IGenOTP } from '../type'
import mailer from '../config/mailer'
import genOTP from '../config/genOTP'
import User from '../models/UserModel'
import jwt, { Secret } from 'jsonwebtoken'
import checkMail from '../config/checkMail'
import { Request, Response } from 'express'
import { ICheckMail, IMailer } from '../type'
const asyncHandler = require('express-async-handler')

// handle account creation
const createUser = asyncHandler(async (req: any, res: Response) => {
    let { email, pswd, pswd2 }: any = req.body
    email = email?.toLowerCase()?.trim()

    const { valid, validators }: ICheckMail = await checkMail(email)

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

    if (validators.regex.valid === false) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "Email Regex is not valid."
        })
        
    }

    if (valid === false) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: validators.smtp.reason
        })
        
    }

    const user: string = email.split('@')[0]
    const account: any = await User.findOne({ 'mail.email': email }).exec()

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
    })

    res.status(201).json({
        success: true,
        action: "success",
        msg: "Account creation successful."
    })
})

// handle Login
const login = asyncHandler(async (req: Request, res: Response) => {
    const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let { userId, pswd, lastLogin } = req.body
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
    account.lastLogin = lastLogin
    await account.save()

    return res.status(200).json({
        token,
        success: true,
        action: "success",
        msg: "Login successful.",
    })
})


const otpHandler = asyncHandler(async (req: Request, res: Response) => {
    let { email } = req.body
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

    console.log(account)

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

// reset password

// verify OTP

export { createUser, login, otpHandler }