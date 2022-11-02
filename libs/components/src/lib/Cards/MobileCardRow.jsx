import { Link } from 'react-router-dom'

const symbols = {
  Aqua: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/aqua.png',
  Beast: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/beast.png',
  BeastWarrior: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/beast-warrior.png',
  Continuous: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/continuous.png',
  Counter: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/counter.png',
  Cyberse: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/cyberse.png',
  DARK: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/dark.png',
  Dinosaur: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/dinosaur.png',
  DIVINE: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/divine.png',
  DivineBeast: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/divine-beast.png',
  Dragon: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/dragon.png',
  EARTH: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/earth.png',
  Equip: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/equip.png',
  Fairy: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/fairy.png',
  Field: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/field.png',
  Fiend: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/fiend.png',
  FIRE: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/fire.png',
  Fish: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/fish.png',
  Insect: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/insect.png',
  LIGHT: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/light.png',
  LinkSymbol: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/link.png',
  Machine: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/machine.png',
  Normal: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/normal.png',
  Plant: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/plant.png',
  Psychic: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/psychic.png',
  Pyro: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/pyro.png',
  QuickPlay: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/quick-play.png',
  Rank: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/rank.png',
  Reptile: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/reptile.png',
  Ritual: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/ritual.png',
  Rock: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/rock.png',
  Scale: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/Scale.png',
  SeaSerpent: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/sea-serpent.png',
  Spell: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/spell.png',
  Spellcaster: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/spellcaster.png',
  Star: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/star.png',
  Thunder: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/thunder.png',
  Trap: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/trap.png',
  Warrior: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/warrior.png',
  WATER: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/water.png',
  WIND: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/wind.png',
  WingedBeast: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/winged-beast.png',
  Wyrm: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/wyrm.png',
  Zombie: 'https://formatlibrary.s3.us-east-2.amazonaws.com/images/symbols/zombie.png'
}

/* eslint-disable complexity */
export const MobileCardRow = (props) => {
    const { card, status } = props
    const { category, attribute, level, rating, atk, def } = card
    const line = card.type
    
    const symbol = symbols[card.attribute] || symbols[card.category]
    const symbol2 = card.link ? `/assets/images/arrows/${card.arrows}.png` :
      card.xyz ? symbols.Rank :
      category === 'Monster' ? symbols.Star :
      card.icon ? symbols[card.icon.replace('-', '')] :
      ''
  
    const line2 = card.link ? `Lk${rating}` :
    card.xyz ? `Rk${level}` :
    category === 'Monster' ? `Lv${level}` :
    card.icon
  
    const symbol3 = category === 'Monster' && card.type ? symbols[card.type.replace(/[\s-]/g, '')] : null
    const evenOrOdd = props.index % 2 ? 'even' : 'odd'
    const filePath = `/assets/images/cards/${card.ypdId}.jpg`
    
    return (
        <tr className={`${evenOrOdd}-search-results-row`}>
                  <td className="no-padding-2" style={{verticalAlign: 'top'}}>
                      <Link className="black-text" to={`/cards/${
                          card.name.replaceAll('%', '%252525')
                          .replaceAll('/', '%2F')
                          .replaceAll(' ', '_')
                          .replaceAll('#', '%23')
                          .replaceAll('?', '%3F')
                          }`}
                          
                          target="_blank" 
                          rel="noopener noreferrer"
                      >
                          <div className='card-image-cell'>
                              <img
                              className="card-image"
                              src={filePath}
                              style={{width: '82px'}}
                              alt={card.name}
                              />
                              {
                              status ? (
                                  <img
                                  className="small-status-icon"
                                  src={`/assets/images/emojis/${status}.png`}
                                  alt={status}
                                  />
                              ) : ''
                              }
                          </div>
                      </Link>
                  </td>
                  <td className="no-padding-2" style={{verticalAlign: 'top'}}>
                      <Link className="black-text" to={`/cards/${
                          card.name.replaceAll('%', '%252525')
                          .replaceAll('/', '%2F')
                          .replaceAll(' ', '_')
                          .replaceAll('#', '%23')
                          .replaceAll('?', '%3F')
                          }`}
                          
                          target="_blank" 
                          rel="noopener noreferrer"
                          >
                          <table className="inner-cardRow-table">
                              <tbody>
                                  <tr>
                                  <th
                                      colSpan="5"
                                      style={{
                                      textAlign: 'left',
                                      fontSize: '24px',
                                      borderBottom: '2px solid #CFDCE5'
                                      }}
                                  >
                                      {card.name}
                                  </th>
                                  </tr>
                                  <tr>
                                  <td height="25px" width="90px" style={{borderRight: '2px solid #CFDCE5'}}>
                                      <img
                                      src={symbol}
                                      height="24px"
                                      style={{verticalAlign: 'middle'}}
                                      alt="symbol"
                                      />
                                      {' ' + (attribute || category.toUpperCase())}
                                  </td>
                                  {symbol2 ? (
                                      <td height="25px" width="120px" style={{borderRight: '2px solid #CFDCE5'}}>
                                      <img
                                          src={symbol2}
                                          margin="0px"
                                          height="24px"
                                          style={{verticalAlign: 'middle'}}
                                          alt="level/category"
                                      />
                                      {' ' + line2}
                                      </td>
                                  ) : (
                                      <td height="25px" width="120px" />
                                  )}
                                  {
                                      card.category === 'Monster' ? (
                                          <td height="25px" width="120px" style={{borderRight: '2px solid #CFDCE5'}}>
                                              <img
                                                  src={symbol3}
                                                  margin="0px"
                                                  height="24px"
                                                  style={{verticalAlign: 'middle'}}
                                                  alt="level/category"
                                              />
                                              {' ' + line}
                                          </td>
                                      ) : (
                                          <td height="25px" width="120px" />
                                      )
                                  }
                                  {
                                      atk !== null ? (
                                          <td height="25px" width="100px" style={{borderRight: '2px solid #CFDCE5'}}>
                                              {'ATK: ' + atk}
                                          </td>
                                      ) : (
                                          <td height="25px" width="100px" />
                                      )
                                  }
                                  {
                                      def !== null ? (
                                          <td height="25px" width="100px" style={{borderRight: '2px solid #CFDCE5'}}>
                                              {'DEF: ' + def}
                                          </td>
                                      ) : (
                                          <td height="25px" width="100px" />
                                      )
                                  }
                                  </tr>
                              </tbody>
                          </table>
                      </Link>
                  </td>
              </tr>
    )
}
