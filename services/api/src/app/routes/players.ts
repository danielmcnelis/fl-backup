import { Router } from 'express'
import { playersQuery, playersId, playersAll } from '../middleware'

const router = Router()

router.get('/api/players/query/:query', playersQuery)

router.get('/api/players/:id', playersId)

router.get('/api/players/', playersAll)

export default router
