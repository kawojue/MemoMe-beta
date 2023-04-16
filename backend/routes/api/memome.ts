import express, { Router } from 'express'
import { msgLimiter } from '../../middlewares/limiter'
import { addMemo, countViews } from '../../controllers/memome'

const apiRoute: Router = express.Router()

apiRoute.route('/:user')
    .get(countViews)
    .post(msgLimiter, addMemo)

export default apiRoute