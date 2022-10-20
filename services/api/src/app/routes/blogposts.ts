import { Router } from 'express'
import { blogpostsAll, blogpostsFirst } from '../middleware'

const router = Router()

router.get('/api/blogposts/all', blogpostsAll)

router.get('/api/blogposts/first/:x', blogpostsFirst)

export default router
