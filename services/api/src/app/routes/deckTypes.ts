import { Router } from 'express'
import { deckTypesAll, deckTypesId, deckTypesCreate } from '../middleware'

const router = Router()

router.get('/api/decktypes/all', deckTypesAll)

router.get('/api/decktypes/:id', deckTypesId)

router.post('/api/decktypes/create', deckTypesCreate)

export default router
