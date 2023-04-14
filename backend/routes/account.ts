import express, { Router } from 'express'
import limiter from '../middlewares/limiter'
import { createUser, login } from '../controllers/auth'

const accountRoute: Router = express.Router()

accountRoute.post('/signup', createUser)
accountRoute.post('/login', limiter, login)

export default accountRoute