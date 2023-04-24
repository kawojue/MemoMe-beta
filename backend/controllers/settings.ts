import bcrypt from 'bcrypt'
import { Response } from 'express'
import User from '../models/UserModel'
const asyncHandler = require('express-async-handler')

const editPswd = asyncHandler(async (req: any, res: Response) => {
    const { currentPswd, pswd, pswd2 } = req.body

    if (!currentPswd) {
        return res.status(400).json({
            success: false,
            action: 'error',
            msg: 'Old password is required.'
        })
    }

    if (pswd !== pswd2) {
        return res.status(400).json({
            success: false,
            action: 'error',
            msg: 'Password does not match.'
        })
    }

    if (currentPswd === pswd === pswd2) {
        return res.status(400).json({
            success: false,
            action: 'warning',
            msg: 'Your Old and New Passowrds are matched.'
        })
    }

    const account: any = await User.findOne({ user: req?.user }).exec()
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        })
    }

    const isMatch = await bcrypt.compare(currentPswd, account.password)
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            action: 'error',
            msg: 'Incorrect password.'
        })
    }

    const salt: string = await bcrypt.genSalt(10)
    const hashedPswd: string = await bcrypt.hash(pswd, salt)

    account.password = hashedPswd
    await account.save()

    res.status(200).json({
        success: true,
        action: 'success',
        msg: 'Password changed successfully.'
    })
})

const toggleDisability = asyncHandler(async (req: any, res: Response) => {
    const account = await User.findOne({ user: req?.user }).exec()
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        })
    }
})

const togglePbMedia = asyncHandler(async (req: any, res: Response) => {
    const account = await User.findOne({ user: req?.user }).exec()
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        })
    }
})

const togglePbContent = asyncHandler(async (req: any, res: Response) => {
    const account = await User.findOne({ user: req?.user }).exec()
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        })
    }
})

export { editPswd }