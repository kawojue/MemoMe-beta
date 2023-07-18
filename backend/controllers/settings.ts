import bcrypt from 'bcrypt'
import User from '../models/UserModel'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

interface IRequest extends Request {
    user: any
}

const editPswd = asyncHandler(async (req: IRequest, res: Response) => {
    const { currentPswd, pswd, pswd2 }: any = req.body

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
            action: 'error',
            msg: 'Your Old and New Passowrds are matched.'
        })
    }

    const account: any = await User.findOne({ user: req?.user?.user }).exec()
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

const toggleDisability = asyncHandler(async (req: IRequest, res: Response) => {
    const { tgDisability }: any = req.body

    const account: any = await User.findOne({ user: req?.user?.user }).exec()
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        })
    }

    account.disabled = tgDisability as boolean
    await account.save()
    res.status(200).json({ success: true })
})

const togglePbMedia = asyncHandler(async (req: IRequest, res: Response) => {
    const { tgPbMedia }: any = req.body

    const account: any = await User.findOne({ user: req?.user?.user }).exec()
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        })
    }

    account.pbMedia = tgPbMedia as boolean
    await account.save()
    res.sendStatus(200)
})

const togglePbContent = asyncHandler(async (req: IRequest, res: Response) => {
    const { tgPbContent }: any = req.body

    const account: any = await User.findOne({ user: req?.user?.user }).exec()
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        })
    }

    account.pbContent = tgPbContent as boolean
    await account.save()
    res.sendStatus(200)
})

const toggleMessage = asyncHandler(async (req: IRequest, res: Response) => {
    const { pbMsg }: any = req.body

    if (pbMsg?.length > 150) {
        return res.status(400).json({
            success: false,
            action: 'error',
            msg: 'Lmao..! Not saved!'
        })
    }

    const account: any = await User.findOne({ user: req?.user?.user }).exec()
    if (!account) {
        return res.status(404).json({
            success: false,
            action: 'error',
            msg: 'Something went wrong..'
        })
    }

    account.pbMsg = pbMsg as string
    await account.save()
    res.sendStatus(200)
})

export {
    editPswd, toggleDisability,
    togglePbMedia, togglePbContent,
    toggleMessage,
}