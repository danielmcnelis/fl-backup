import { Sequelize } from 'sequelize'
import { db } from './db'

export const Server = db.define('servers', {
  id: {
    primaryKey: true,
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.INTEGER
  },
  format: {
    type: Sequelize.STRING
  },
  ownerId: {
    type: Sequelize.STRING
  },
  internalLadder: {
    type: Sequelize.BOOLEAN
  },
  access: {
    type: Sequelize.STRING,
    defaultValue: 'free'
  },
  logo: {
    type: Sequelize.STRING
  },
  emoji: {
    type: Sequelize.STRING
  }
})
