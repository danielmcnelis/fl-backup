import { Router } from 'express'
import { welcome } from '../middleware'

const router = Router()

router.get('/api/welcome', welcome)

export default router
