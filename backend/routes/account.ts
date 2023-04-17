import express, { Router } from 'express'
import limiter from '../middlewares/limiter'
import { 
    createUser, login,
    otpHandler, usernameHandler
} from '../controllers/auth'
import { ILimiter } from '../type'
import jwtVerify from '../middlewares/jwtVerify'

const accountRoute: Router = express.Router()

const loginLimiter: ILimiter = {
    max: 5,
    timerArr: [23, 32, 19, 52, 42],
    msg: "Too many attempts. Please, try again later."
}

accountRoute.post('/signup', createUser)
accountRoute.post('/edit', jwtVerify, usernameHandler)
accountRoute.post('/login', limiter(loginLimiter), login)
accountRoute.post('/req-otp', limiter({max: 1, timerArr: [30, 60, 90]}), otpHandler)

export default accountRoute