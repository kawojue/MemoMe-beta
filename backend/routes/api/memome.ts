import express, { Router } from 'express'
import { addMemo } from '../../controllers/memome'
import { msgLimiter } from '../../middlewares/limiter'

const apiRoute: Router = express.Router()

apiRoute.post('/:user', msgLimiter, addMemo)


export default apiRoute