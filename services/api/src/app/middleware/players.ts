import { Player } from '@fl/models'
import { Op } from 'sequelize'

export const playersQuery = async (req, res, next) => {
  try {
    const players = await Player.findAll({
      where: {
        name: { [Op.substring]: req.params.query }
      },
      attributes: ['id', 'name', 'discriminator', 'discordId', 'firstName', 'lastName'],
      order: [['name', 'ASC']]
    })

    res.json(players)
  } catch (err) {
    next(err)
  }
}

export const playersId = async (req, res, next) => {
  try {
    const player = await Player.findOne({
      where: {
        name: { [Op.iLike]: req.params.id },
        discriminator: req.headers.discriminator,
        hidden: false
      },
      attributes: ['id', 'name', 'discordId', 'discriminator', 'firstName', 'lastName', 'duelingBook']
    })

    res.json(player)
  } catch (err) {
    next(err)
  }
}

export const playersAll = async (req, res, next) => {
  try {
    const players = await Player.findAll({
      attributes: ['id', 'name', 'discordId', 'discriminator', 'firstName', 'lastName', 'duelingBook'],
      order: [['name', 'ASC']]
    })

    res.json(players)
  } catch (err) {
    next(err)
  }
}
