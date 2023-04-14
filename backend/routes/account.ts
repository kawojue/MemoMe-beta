import express, { Router } from 'express'
import { createUser } from '../controllers/auth'

const accountRoute: Router = express.Router()

accountRoute.post('/signup', createUser)

export default accountRoute