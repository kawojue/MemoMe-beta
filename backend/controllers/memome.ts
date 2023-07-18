import { v4 as uuid } from 'uuid'
import { Response } from 'express'
import { IRequest } from '../type'
import User from '../models/UserModel'
import MemoMe from '../models/MemoMeModel'
import cloudinary from '../config/cloudinary'
const textCrypt = require('text-encryption')
const asyncHandler = require('express-async-handler')

const addMemo = asyncHandler(async (req: IRequest, res: Response) => {
    let mediaRes: any
    let url: any
    let encryptContent: any

    let { user }: any = req.params
    let { content, media, mediaType }: any = req.body

    user = user?.toLowerCase()?.trim()
    content = content?.trim()

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

    if (account.disabled) {
        return res.status(400).json({
            success: false,
            action: "error",
            msg: "Account Disabled."
        })
    }

    if (media) {
        if (mediaType === "video") {
            mediaRes = await cloudinary.uploader.upload(media, {
                folder: `MemoMe/${account.id}`,
                resource_type: 'video'
            })
        }
        if (mediaType === "image") {
            mediaRes = await cloudinary.uploader.upload(media, {
                folder: `MemoMe/${account.id}`,
                resource_type: 'image'
            })
        }
        url = cloudinary.url(mediaRes.public_id, {
            attachment: true,
            download: true
        })
    }

    if (content) {
        encryptContent = textCrypt.encrypt(content, process.env.STRING_KEY as string)
    }


    if (account.body) {
        const memome: any = await MemoMe.findOne({ user: account.id }).exec()
        memome.body = [...memome.body, {
            idx: uuid(),
            content: encryptContent as string,
            time: `${new Date().toISOString()}`,
            media: {
                public_id: mediaRes?.public_id,
                secure_url: mediaRes?.secure_url,
                public_url: url
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
            time: `${new Date().toISOString()}`,
            media: {
                public_id: mediaRes?.public_id,
                secure_url: mediaRes?.secure_url,
                public_url: url
            }
        }]
    })
    account.body = true
    await account.save()

    res.sendStatus(200)
})

const getUser = asyncHandler(async (req: IRequest, res: Response) => {
    const { user } = req.params
    const account: any = await User.findOne({ user }).select('-password').exec()
    if (!account) {
        return res.sendStatus(404)
    }

    if (account.disabled) {
        return res.sendStatus(400)
    }

    if (!account.pbMedia && !account.pbContent) {
        return res.status(200).json({
            user,
            temporary: true,
            success: true,
            action: "warning",
            msg: " has turned off to Recieve Text and Media."
        })
    }

    res.status(200).json({
        user,
        disabled: account.disabled,
        pbContent: account.pbContent,
        pbMedia: account.pbMedia,
        pbMsg: account.pbMsg
    })
})

const countViews = asyncHandler(async (req: IRequest, res: Response) => {
    const { user }: any = req.body

    const account: any = await User.findOne({ user }).select('-password').exec()
    if (!account) {
        return res.sendStatus(404)
    }

    if (account.disabled) {
        return res.sendStatus(400)
    }

    if (!account.pbMedia && !account.pbContent) {
        account.profileViews += 1
        await account.save()
        return res.sendStatus(200)
    }

    account.profileViews += 1
    await account.save()
    res.sendStatus(200)
})

const getMemos = asyncHandler(async (req: IRequest, res: Response) => {
    const account: any = await User.findOne({ user: req.user?.user }).select('-password -token').exec()

    if (!account) {
        return res.status(404).json({
            success: false,
            action: "error",
            msg: "Account not found"
        })
    }

    let memos: any = await MemoMe.findOne({ user: account.id }).exec()

    if (!memos) {
        memos = {
            body: []
        }
    }

    if (account.body === false) {
        return res.status(200).json({
            success: true,
            action: "success",
            body: {
                account,
                memos: memos.body
            }
        })
    }

    res.status(200).json({
        success: true,
        action: "success",
        body: {
            account,
            memos: memos.body.reverse()
        }
    })
})

export { addMemo, getUser, getMemos, countViews }