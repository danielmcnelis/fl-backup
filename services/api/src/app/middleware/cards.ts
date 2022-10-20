import { Card, Print, Set, Status, Format } from '@fl/models'
import { Op } from 'sequelize'

export const cardsQuery = async (req, res, next) => {
  try {
    const cards = await Card.findAll({
      where: {
        name: { [Op.substring]: req.params.query }
      },
      attributes: ['name', 'ypdId'],
      order: [['name', 'ASC']]
    })

    res.json(cards)
  } catch (err) {
    next(err)
  }
}

export const cardsAll = async (req, res, next) => {
  try {
    const format = await Format.findOne({
      where: {
        name: { [Op.iLike]: req.headers.format }
      },
      attributes: ['id', 'date']
    })

    const cards = await Card.findAll({
      where: {
        tcgLegal: true,
        tcgDate: format ? { [Op.lte]: format.date } : { [Op.not]: null }
      },
      attributes: { exclude: ['konamiCode', 'tcgLegal', 'ocgLegal', 'ocgDate', 'extraDeck', 'createdAt', 'updatedAt'] },
      include: [{ model: Print, attributes: ['id', 'cardCode', 'rarity', 'setId'] }],
      order: [['name', 'ASC']]
    })

    res.json(cards)
  } catch (err) {
    next(err)
  }
}

export const cardsFirst = async (req, res, next) => {
  try {
    const format = await Format.findOne({
      where: {
        name: { [Op.iLike]: req.headers.format }
      },
      attributes: ['id', 'date']
    })

    const cards = await Card.findAll({
      where: {
        tcgLegal: true,
        tcgDate: format ? { [Op.lte]: format.date } : { [Op.not]: null }
      },
      attributes: { exclude: ['konamiCode', 'tcgLegal', 'ocgLegal', 'ocgDate', 'extraDeck', 'createdAt', 'updatedAt'] },
      include: [{ model: Print, attributes: ['id', 'cardCode', 'rarity', 'setId'] }],
      limit: req.params.x,
      order: [['name', 'ASC']]
    })

    res.json(cards)
  } catch (err) {
    next(err)
  }
}

export const cardsId = async (req, res, next) => {
  try {
    const card = await Card.findOne({
      where: {
        name: { [Op.iLike]: req.params.id }
      },
      attributes: { exclude: ['konamiCode', 'tcgLegal', 'ocgLegal', 'ocgDate', 'extraDeck', 'createdAt', 'updatedAt'] }
    })

    const statuses =
      (await Status.findAll({
        where: {
          cardId: card.id
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }).map((s) => [s.banlist, s.restriction])) || []

    const prints = await Print.findAll({
      where: {
        cardId: card.id
      },
      attributes: { exclude: ['tcgPlayerProductId', 'createdAt', 'updatedAt'] },
      include: [{ model: Set, attributes: ['tcgDate'] }],
      order: [[Set, 'tcgDate', 'ASC']]
    })

    const info = {
      card: card,
      statuses: Object.fromEntries(statuses),
      prints: prints || []
    }

    res.json(info)
  } catch (err) {
    next(err)
  }
}
