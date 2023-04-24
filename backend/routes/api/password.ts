import express, { Router } from 'express'
import jwtVerify from '../../middlewares/jwtVerify'
import { editPswd } from '../../controllers/settings'
import { resetpswd, verifyOTP } from '../../controllers/auth'

const passwordRoute: Router = express.Router()

passwordRoute.post('/reset', resetpswd)
passwordRoute.post('/verify', verifyOTP)
passwordRoute.post('/edit', jwtVerify, editPswd)

export default passwordRoute