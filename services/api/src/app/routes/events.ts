import { Router } from 'express'
import { eventsAll, eventsCommunity, eventsRecent, eventsFirst, eventsId, eventsCreate } from '../middleware'

const router = Router()

router.get('/api/events/all', eventsAll)

router.get('/api/events/community/:community', eventsCommunity)

router.get('/api/events/recent/:format', eventsRecent)

router.get('/api/events/first/:x', eventsFirst)

router.get('/api/events/:id', eventsId)

router.post('/api/events/create', eventsCreate)

export default router
