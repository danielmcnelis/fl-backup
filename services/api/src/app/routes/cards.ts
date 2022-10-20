import { Router } from 'express'
import { cardsQuery, cardsAll, cardsFirst, cardsId } from '../middleware'

const router = Router()

router.get('/api/cards/query/:query', cardsQuery)

router.get('/api/cards/all', cardsAll)

router.get('/api/cards/first/:x', cardsFirst)

router.get('/api/cards/:id', cardsId)

export default router
