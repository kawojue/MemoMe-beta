import express, { Router } from 'express'
import limiter from '../../middlewares/limiter'
import { addMemo, countViews, getUser } from '../../controllers/memome'

const apiRoute: Router = express.Router()

apiRoute.route('/:user')
    .get(getUser)
    .post(limiter({max: 1, timerArr: [4, 5, 7]}), addMemo);

apiRoute.post('/user/count-views', countViews)

export default apiRoute