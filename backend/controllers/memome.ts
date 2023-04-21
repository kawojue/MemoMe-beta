import { v4 as uuid } from 'uuid'
import User from '../models/UserModel'
import MemoMe from '../models/MemoMeModel'
import { Request, Response } from 'express'
const textCrypt = require('text-encryption')
import cloudinary from '../config/cloudinary'
const asyncHandler = require('express-async-handler')

const addMemo = asyncHandler(async (req: Request, res: Response) => {
    let mediaRes: any
    let encryptContent: any

    let { user }: any = req.params
    let { content, media }: any = req.body

    user = user?.toLowerCase()?.trim()
    content = content?.toLowerCase()?.trim()

    if (!user) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "Invalid params"
        })
    }

    if (!content && !media) {
        return res.status(400).json({
            success: false,
            action: "warning",
            msg: "Credentials cannot be blank"
        })
    }

    const account: any = await User.findOne({ user }).exec()

    if (!account) {
        return res.status(404).json({
            success: false,
            action: "error",
            msg: "User does not exist."
        })
    }

    if (media) {
        mediaRes = await cloudinary.uploader.upload(media, { folder: account.id as string })
    }

    if (content) {
        encryptContent = textCrypt.encrypt(content, process.env.STRING_KEY as string)
    }


    if (account.body) {
        const memome: any = await MemoMe.findOne({ user: account.id }).exec()
        memome.body = [...memome.body, {
            idx: uuid(),
            content: encryptContent as string,
            time: new Date().toISOString() as string,
            media: {
                public_id: mediaRes.public_id,
                secure_url: mediaRes.secure_url
            }
        }]
        await memome.save()
        return res.sendStatus(200)
    }

    await MemoMe.create({
        user: account.id,
        body: [{
            idx: uuid(),
            content: encryptContent as string,
            time: new Date().toISOString() as string,
            media: {
                public_id: mediaRes.public_id,
                secure_url: mediaRes.secure_url
            }
        }]
    })
    account.body = true
    await account.save()

    res.sendStatus(200)
})

const countViews = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req.params
    const account: any = await User.findOne({ user }).select('-password').exec()
    if (!account) {
        return res.status(404).json({
            success: false,
            action: "error",
            msg: "User does not exist."
        })
    }
    account.profileViews += 1
    await account.save()
    res.status(200).json({
        user
    })
})

const getMemos = asyncHandler(async (req: any, res: Response) => {
    const account: any = await User.findOne({ user: req.user?.user })
    .select('-password -token').exec()

    if (!account) {
        return res.status(404).json({
            success: false,
            action: "error",
            msg: "Account not found"
        })
    }

    if (account.body === false) {
        return res.status(204).json({
            success: true,
            action: "success",
            body: []
        })
    }

    let memos: any = await MemoMe.findOne({ user: account.id }).exec()

    if (!memos) {
        memos = []
    }

    res.status(200).json({
        success: true,
        action: "success",
        body: {
            account,
            memos
        }
    })
})

export { addMemo, countViews, getMemos }