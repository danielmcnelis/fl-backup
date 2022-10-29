
import { Sequelize } from 'sequelize'
import { db } from './db'

export const Player = db.define('players', {
  id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  discordName: {
    type: Sequelize.STRING
  },
  discriminator: {
    type: Sequelize.STRING
  },
  discordId: {
    type: Sequelize.STRING
  },
  discordPfp: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  googlePfp: {
    type: Sequelize.TEXT
  },
  duelingBook: {
    type: Sequelize.STRING
  },
  duelingBookPfp: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  hash: {
    type: Sequelize.STRING
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  hidden: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  oldId: {
      type: Sequelize.STRING
  }
})

Player.generateId = async () => {
    const base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    return import('nanoid').then(({ customAlphabet }) => customAlphabet(base58, 22)())
  }
  
  Player.findByDiscordId = (id) => Player.findOne({ where: { discordId: id }})
  
  Player.findByEmail = (email) => {
      if (email.includes('@gmail.com')) {
          const googleId = email.replace('@gmail.com', '')
          return Player.findOne({ where: { [Op.or]: [{ email: email}, {googleId: googleId }] } })
      } else {
          return Player.findOne({ where: { email: email }})
      }
  }
  
  Player.discordLogin = async (user) => {
      const existingPlayer = await Player.findOne({ 
          where: { 
              discordId: user.id
          }
      }) || await Player.findOne({ 
          where: { 
              email: user.email
          }
      })
  
      if (existingPlayer) {
          const googleId = user.email.includes('@gmail.com') ? user.email.slice(0, -10) : null
          await existingPlayer.update({
              name: existingPlayer.name || user.username,
              discordName: user.username,
              discriminator: user.discriminator,
              discordPfp: user.avatar,
              email: existingPlayer.email || user.email,
              googleId: existingPlayer.googleId || googleId
          })

          return existingPlayer.id
      } else {
          const newPlayer = await Player.create({
              name: user.username,
              discordName: user.username,
              discriminator: user.discriminator,
              discordPfp: user.avatar,
              email: user.email
          })

          return newPlayer.id
      }
  }
  
  Player.googleLogin = async (payload) => {
      const existingPlayer = await Player.findOne({ 
          where: { 
              googleId: payload.email.slice(0, -10)
          }
      }) || await Player.findOne({ 
          where: { 
              email: payload.email
          }
      })
  
      if (existingPlayer) {
          await existingPlayer.update({
              name: existingPlayer.name || payload.name,
              googleId: payload.email.slice(0, -10),
              googlePfp: payload.picture,
              firstName: existingPlayer.firstName || payload.given_name,
              lastName: existingPlayer.lastName || payload.family_name,
              email: existingPlayer.email || payload.email
          })

          return existingPlayer.id
      } else {
          const newPlayer = await Player.create({
              name: payload.name,
              googleId: payload.email.slice(0, -10),
              googlePfp: payload.picture,
              firstName: payload.given_name,
              lastName: payload.family_name,
              email: payload.email
          })

          return newPlayer.id
      }
  }

  Player.verifyLogin = async (payload) => {
    console.log('verifyLogin !!!')
    console.log('payload', payload)
    const player = await Player.findOne({
        where: {
            email: payload.email,
            hash: payload.password
        }
    })

    console.log('!!player', !!player)
    return player.id
  }
  
  Player.prototype.hide = () => this.update({ hidden: true })