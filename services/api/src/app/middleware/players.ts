import { Player } from '@fl/models'
import { Op } from 'sequelize'
import * as fs from 'fs'

export const playersAdmin = async (req, res, next) => {
    try {
        const player = await Player.findOne({
          where: {
            id: req.params.id,
            admin: true
          }
        })

        if (player) {
            res.send(200)
        } else {
            res.send(404)
        }
      } catch (err) {
        next(err)
      }
}

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
        where: req.query.discriminator ? ({
                name: { [Op.iLike]: req.params.id },
                discriminator: req.query.discriminator,
                hidden: false
        }) : ({
                id: { [Op.iLike]: req.params.id },
                hidden: false            
        }),
        attributes: ['id', 'email', 'name', 'discordId', 'discordName', 'discriminator', 'firstName', 'lastName', 'googleId', 'googlePfp', 'duelingBook', 'duelingBookPfp', 'country', 'timeZone', 'youtube', 'twitch', 'twitter']
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

export const playersUpdateId = async (req, res, next) => {
    try {
        const player = await Player.findOne({ 
            where: {
                id: req.params.id
            },
            attributes: ['id', 'email', 'name', 'discordId', 'discordName', 'discriminator', 'firstName', 'lastName', 'googleId', 'googlePfp', 'duelingBook', 'duelingBookPfp', 'country', 'timeZone', 'youtube', 'twitch', 'twitter']
        })

        if (!req.body.name || !req.body.name.length) {
            res.sendStatus(400)
        } else if (req.body.youtube && req.body.youtube.length && !req.body.youtube.includes('youtube.com/channel/')) {
            res.sendStatus(400)
        } else {
            await player.update({ 
                name: req.body.name,
                duelingBook: req.body.duelingBook,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                country: req.body.country,
                timeZone: req.body.timeZone,
                youtube: req.body.youtube,
                twitch: req.body.twitch,
                twitter: req.body.twitter,
            })
    
            res.json(player)
        }
    } catch (err) {
        console.log(err)
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