import apiRoute from './api/memome'
import accountRoute from './account'
import jwtVerify from '../middlewares/jwtVerify'
import { getMemos } from '../controllers/memome'
import express, { Router, Request, Response } from 'express'

const rootRoute: Router = express.Router()

rootRoute.use('/api', apiRoute)
rootRoute.use('/account', accountRoute)

rootRoute.get('/profile', jwtVerify, getMemos)

rootRoute.get('/', (req: Request, res: Response) => {
    res.status(200).send("MemoMe")
})

export default rootRoute