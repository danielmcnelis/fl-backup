import { Router } from 'express'
import { statsAll } from '../middleware'
// const {Card, Status} = require('../db/models')

const router = Router()

router.get('/api/stats/all', statsAll)

export default router
