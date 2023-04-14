import bcrypt from 'bcrypt'
import User from '../model/User'
import { ICheckMail } from '../type'
import checkMail from '../config/checkMail'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

const createUser = asyncHandler(async (req: Request, res: Response) => {
    let { email, pswd, pswd2, createdAt }: any = req.body
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
            action: "warning",
            msg: "Email Regex is not valid."
        })
        
    }

    if (valid === false) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: validators.smtp.reason
        })
        
    }

    const user: string = email.split('@')[0]
    const account = await User.findOne({ 'mail.email': email })

    if (account) {
        return res.status(409).json({
            success: false,
            action: "warning",
            msg: "Account already exists."
        })
    }

    pswd = await bcrypt.hash(pswd, 10)

    await User.create({
        user,
        createdAt,
        password: pswd as string,
        'mail.email': email as string,
    })

    res.status(201).json({
        success: true,
        action: "success",
        msg: "Account creation successful."
    })
})

export { createUser }