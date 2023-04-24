import express, { Router } from 'express'
import jwtVerify from '../../middlewares/jwtVerify'
import {
    togglePbMedia,
    toggleMessage,
    togglePbContent,
    toggleDisability,
} from '../../controllers/settings'

const settingsRoute: Router = express.Router()
settingsRoute.use(jwtVerify)

settingsRoute.post('/tg-msg', toggleMessage)
settingsRoute.post('/tg-media', togglePbMedia)
settingsRoute.post('/tg-content', togglePbContent)
settingsRoute.post('/tg-disability', toggleDisability)

export default settingsRoute