import { BlogPost } from '@fl/models'

export const blogpostsAll = async (req, res, next) => {
  try {
    const blogposts = await BlogPost.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['eventDate', 'DESC']]
    })

    res.json(blogposts)
  } catch (err) {
    next(err)
  }
}

export const blogpostsFirst = async (req, res, next) => {
  try {
    const blogposts = await BlogPost.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: req.params.x,
      order: [['eventDate', 'DESC']]
    })

    res.json(blogposts)
  } catch (err) {
    next(err)
  }
}
