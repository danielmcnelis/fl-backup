import { Router } from 'express'
import { playersQuery, playersCreate, playersId, playersAll } from '../middleware'

const router = Router()

router.get('/api/players/query/:query', playersQuery)

router.get('/api/players/:id', playersId)

router.get('/api/players/', playersAll)

router.post('/api/players/create', playersCreate)

export default router
