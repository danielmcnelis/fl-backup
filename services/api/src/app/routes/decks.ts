import { Router } from 'express'
import {
  decksPopular,
  decksGallery,
  decksFrequent,
  decksPlayer,
  decksLike,
  decksDownload,
  decksAll,
  decksFirst,
  decksId,
  decksCreate
} from '../middleware'

const router = Router()

router.get('/api/decks/popular/:format', decksPopular)

router.get('/api/decks/gallery/:format', decksGallery)

router.get('/api/decks/frequent/:id', decksFrequent)

router.get('/api/decks/player/:id', decksPlayer)

router.get('/api/decks/like/:id', decksLike)

router.get('/api/decks/download/:id', decksDownload)

router.get('/api/decks/all', decksAll)

router.get('/api/decks/first/:x', decksFirst)

router.get('/api/decks/:id', decksId)

router.post('/api/decks/create', decksCreate)

export default router
