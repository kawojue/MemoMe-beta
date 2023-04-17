import express, { Router } from 'express'
import limiter, { otpLimiter } from '../middlewares/limiter'
import { 
    createUser, login,
    otpHandler 
} from '../controllers/auth'

const accountRoute: Router = express.Router()

accountRoute.post('/signup', createUser)
accountRoute.post('/login', limiter, login)
accountRoute.post('/req-otp', otpLimiter, otpHandler)

export default accountRoute