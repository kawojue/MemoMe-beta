import express, { Router } from 'express'
import limiter from '../../middlewares/limiter'
import jwtVerify from '../../middlewares/jwtVerify'
import { editPswd } from '../../controllers/settings'
import { resetpswd, verifyOTP } from '../../controllers/auth'

const passwordRoute: Router = express.Router()

passwordRoute.post('/reset', resetpswd)
passwordRoute.post('/edit', jwtVerify, editPswd)
passwordRoute.post('/verify', limiter({max:3, timerArr:[14, 9, 15]}), verifyOTP)

export default passwordRoute