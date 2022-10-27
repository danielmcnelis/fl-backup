import { Player } from '@fl/models'
import { Op } from 'sequelize'
import * as fs from 'fs'

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
    console.log('req.query', req.query)
    console.log('req.params', req.params)
  try {
    const player = await Player.findOne({
      where: {
        name: { [Op.iLike]: req.params.id },
        discriminator: req.query.discriminator,
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

export const playersCreate = async (req, res, next) => {
    try {
        if (req.body.pfp) {
            const buffer = req.body.pfp.replace(/^data:image\/png;base64,/, '')
            fs.writeFileSync(`./public/images/pfps/${req.body.name}.png`, buffer, 'base64')
        }

        const alreadyExists = await Player.count({
            where: {
                [Op.or]: [
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                    },
                    {
                        discordName: {[Op.and]: [req.body.discordName, {[Op.not]: null}]},
                        discriminator: {[Op.and]: [req.body.discriminator, {[Op.not]: null}]}
                    }
                ]
            }
        })


        if (alreadyExists) throw new Error('This player already exists')
    
        const player = await Player.create({
            id: await Player.generateId(),
            name: req.body.name,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            discordName: req.body.discordName,
            discriminator: req.body.discriminator
        })

        res.json(player)
    } catch (err) {
      next(err)
    }
}