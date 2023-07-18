import {
    createUser, login, logout,
    otpHandler, editUsername
} from '../controllers/auth'
import password from './api/password'
import express, { Router } from 'express'
import limiter from '../middlewares/limiter'
import jwtVerify from '../middlewares/jwtVerify'

const accountRoute: Router = express.Router()

const loginLimiter: ILimiter = {
    max: 5,
    timerArr: [23, 32, 19, 52, 42],
    msg: "Too many attempts. Please, try again later."
}

accountRoute.get('/logout', logout)
accountRoute.use('/password', password)
accountRoute.post('/signup', createUser)
accountRoute.post('/edit', jwtVerify, editUsername)
accountRoute.post('/login', limiter(loginLimiter), login)
accountRoute.post('/req-otp', limiter({ max: 1, timerArr: [20, 30, 45] }), otpHandler)

export default accountRoute