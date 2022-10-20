import { BlogPost } from './BlogPost'
import { Card } from './Card'
import { Deck } from './Deck'
import { DeckThumb } from './DeckThumb'
import { DeckType } from './DeckType'
import { Event } from './Event'
import { Format } from './Format'
import { Player } from './Player'
import { Print } from './Print'
import { Set } from './Set'
import { Server } from './Server'
import { Stats } from './Stats'
import { Status } from './Status'
import { Tournament } from './Tournament'

//DECK
Format.hasMany(Deck)
Deck.belongsTo(Format)

//DECKTYPE
DeckType.hasMany(Deck)
Deck.belongsTo(DeckType)

DeckType.hasMany(DeckThumb)
DeckThumb.belongsTo(DeckType)

//EVENT
Event.hasMany(Deck)
Deck.belongsTo(Event)

Event.belongsTo(Tournament)
Tournament.hasOne(Event)

//PLAYER
Player.hasMany(Deck)
Deck.belongsTo(Player)

Player.hasMany(Event)
Event.belongsTo(Player)

Format.hasMany(Event)
Event.belongsTo(Format)

//PRINT
Print.belongsTo(Card)
Card.hasMany(Print)

Print.belongsTo(Set)
Set.hasMany(Print)

//STATS
Stats.belongsTo(Player)
Player.hasMany(Stats)

Stats.belongsTo(Server)
Server.hasMany(Stats)

//STATUS
Status.belongsTo(Card)
Card.hasMany(Status)

//TOURNAMENT
Tournament.belongsTo(Server)
Server.hasMany(Tournament)

export {
  BlogPost,
  Card,
  Deck,
  DeckThumb,
  DeckType,
  Event,
  Format,
  Player,
  Print,
  Server,
  Set,
  Stats,
  Status,
  Tournament
}
