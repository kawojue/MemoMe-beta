import express, { Router } from 'express'
import limiter from '../../middlewares/limiter'
import { addMemo, getUser } from '../../controllers/memome'

const apiRoute: Router = express.Router()

apiRoute.route('/:user')
    .get(getUser)
    .post(limiter({max: 1, timerArr: [4, 5, 7]}), addMemo)

export default apiRoute