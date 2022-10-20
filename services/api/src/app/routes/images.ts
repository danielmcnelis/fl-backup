import { Router } from 'express'
import { imagesCreate } from '../middleware'

const router = Router()

router.post('/api/images/create', imagesCreate)

export default router
