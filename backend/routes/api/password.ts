import express, { Router } from 'express'
import { resetpswd, verifyOTP } from '../../controllers/auth'

const passwordRoute: Router = express.Router()

passwordRoute.post('/reset', resetpswd)
passwordRoute.post('/verify', verifyOTP)

export default passwordRoute