import bcrypt from 'bcrypt'
import { Response } from 'express'
import User from '../models/UserModel'
const asyncHandler = require('express-async-handler')