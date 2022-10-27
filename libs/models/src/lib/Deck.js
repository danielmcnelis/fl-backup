
import { Op, Sequelize } from 'sequelize'
import { db } from './db'
import { Card } from './Card'
import { Status } from './Status'
import { arrayToObject } from '@fl/utils'

export const Deck = db.define('decks', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  builder: {
    type: Sequelize.STRING
  },
  playerId: {
    type: Sequelize.STRING
  },
  formatName: {
    type: Sequelize.STRING
  },
  formatId: {
    type: Sequelize.INTEGER
  },
  ydk: {
    type: Sequelize.TEXT
  },
  eventName: {
    type: Sequelize.STRING
  },
  eventDate: {
    type: Sequelize.DATE
  },
  eventId: {
    type: Sequelize.INTEGER
  },
  community: {
    type: Sequelize.STRING
  },
  placement: {
    type: Sequelize.INTEGER
  },
  display: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  downloads: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  views: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  suggestedType: {
      type: Sequelize.STRING
  },
  shareLink: {
    type: Sequelize.STRING
  },
  linkExpiration: {
    type: Sequelize.DATE
  }
})

Deck.verifyLegality = async (ydk, formatName, formatDate, formatBanlist) => { 
    const cardIds = formatName === 'Current' ? [...await Card.findAll({ where: { tcgLegal: true }})].map(c => c.konamiCode) : [...await Card.findAll({ where: { tcgDate: { [Op.lte]: formatDate } }})].map(c => c.konamiCode)
    const forbiddenIds = [...await Status.findAll({ where: { banlist: formatBanlist, restriction: 'forbidden' }, include: Card })].map(s => s.card.konamiCode)
    const limitedIds = [...await Status.findAll({ where: { banlist: formatBanlist, restriction: 'limited' }, include: Card })].map(s => s.card.konamiCode)
    const semiIds = [...await Status.findAll({ where: { banlist: formatBanlist, restriction: 'semi-limited' }, include: Card })].map(s => s.card.konamiCode)

    const main = ydk.split('#main')[1].split('#extra')[0].split('\n').filter((e) => e.length)
    const extra = ydk.split('#extra')[1].split('!side')[0].split('\n').filter((e) => e.length)
    const side = ydk.split('!side')[1].split('\n').filter((e) => e.length)
    const deckArr = [...main, ...side, ...extra]
    const deck = arrayToObject(deckArr)
    const keys = Object.keys(deck)

    for (let i = 0; i < keys.length; i++) {
        let konamiCode = keys[i]
        while (konamiCode.length < 8) konamiCode = '0' + konamiCode 

        if (!cardIds.includes(konamiCode)) {
            return false
        } else if (forbiddenIds.includes(konamiCode)) {
            return false
        } else if (limitedIds.includes(konamiCode) && deck[konamiCode] > 1) {
            return false
        } else if (semiIds.includes(konamiCode) && deck[konamiCode] > 2) {
            return false
        }
    }
    
    return true
}

Deck.generateShareLink = async () => {
    const base52 = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    return import('nanoid').then(({ customAlphabet }) => customAlphabet(base52, 8)())
}