import bcrypt from 'bcrypt'
import { IRequest } from '../type'
import { Response } from 'express'
import User from '../models/UserModel'
import {
    ERROR, INC_PSWD, SMTH_WRONG, SUCCESS
} from '../utils/modal'
const asyncHandler = require('express-async-handler')

const editPswd = asyncHandler(async (req: IRequest, res: Response) => {
    const { currentPswd, pswd, pswd2 }: any = req.body

    if (!currentPswd) return res.status(400).json({ ...ERROR, msg: 'Old password is required.' })

    if (pswd !== pswd2) return res.status(400).json({ ...ERROR, msg: 'Password does not match.' })

    if (currentPswd === pswd === pswd2) return res.status(400).json({ ...ERROR, msg: 'Your old and new passowrds are matched.' })

    const account: any = await User.findOne({ user: req.user?.user }).exec()
    if (!account) return res.status(404).json(SMTH_WRONG)

    const isMatch = await bcrypt.compare(currentPswd, account.password)
    if (!isMatch) return res.status(401).json(INC_PSWD)

    const salt: string = await bcrypt.genSalt(10)
    const hashedPswd: string = await bcrypt.hash(pswd, salt)

    account.password = hashedPswd
    await account.save()

    res.status(200).json({ ...SUCCESS, msg: 'Password updated successfully.' })
})

const toggleDisability = asyncHandler(async (req: IRequest, res: Response) => {
    const { tgDisability }: any = req.body

    const account: any = await User.findOne({ user: req.user?.user }).exec()
    if (!account) return res.status(404).json(SMTH_WRONG)

    account.disabled = tgDisability as boolean
    await account.save()

    res.status(200).json(SUCCESS)
})

const togglePbMedia = asyncHandler(async (req: IRequest, res: Response) => {
    const { tgPbMedia }: any = req.body

    const account: any = await User.findOne({ user: req.user?.user }).exec()
    if (!account) return res.status(404).json(SMTH_WRONG)

    account.pbMedia = tgPbMedia as boolean
    await account.save()

    res.sendStatus(200)
})

const togglePbContent = asyncHandler(async (req: IRequest, res: Response) => {
    const { tgPbContent }: any = req.body

    const account: any = await User.findOne({ user: req.user?.user }).exec()
    if (!account) return res.status(404).json(SMTH_WRONG)

    account.pbContent = tgPbContent as boolean
    await account.save()

    res.sendStatus(200)
})

const toggleMessage = asyncHandler(async (req: IRequest, res: Response) => {
    const { pbMsg }: any = req.body

    if (pbMsg?.length > 150) return res.status(400).json({ ...ERROR, msg: 'Characters too long. Not saved!' })

    const account: any = await User.findOne({ user: req.user?.user }).exec()
    if (!account) return res.status(404).json(SMTH_WRONG)

    account.pbMsg = pbMsg as string
    await account.save()

    res.sendStatus(200)
})

export {
    editPswd, toggleDisability,
    togglePbMedia, togglePbContent,
    toggleMessage,
}