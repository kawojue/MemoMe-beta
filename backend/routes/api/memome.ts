import express, { Router } from 'express'
import { addMemo, countViews } from '../../controllers/memome'
import { msgLimiter } from '../../middlewares/limiter'

const apiRoute: Router = express.Router()

apiRoute.get('/:user', countViews)
apiRoute.post('/:user', msgLimiter, addMemo)


export default apiRoute