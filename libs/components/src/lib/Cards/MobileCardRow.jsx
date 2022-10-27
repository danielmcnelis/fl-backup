import { Link } from 'react-router-dom'

const symbols = {
  Aqua: '/assets/images/symbols/aqua.png',
  Beast: '/assets/images/symbols/beast.png',
  BeastWarrior: '/assets/images/beast-warrior.png',
  Continuous: '/assets/images/symbols/continuous.png',
  Counter: '/assets/images/symbols/counter.png',
  Cyberse: '/assets/images/symbols/cyberse.png',
  DARK: '/assets/images/symbols/dark.png',
  Dinosaur: '/assets/images/symbols/dinosaur.png',
  DIVINE: '/assets/images/symbols/divine.png',
  DivineBeast: '/assets/images/symbols/divine-beast.png',
  Dragon: '/assets/images/symbols/dragon.png',
  EARTH: '/assets/images/symbols/earth.png',
  Equip: '/assets/images/symbols/equip.png',
  Fairy: '/assets/images/symbols/fairy.png',
  Field: '/assets/images/symbols/field.png',
  Fiend: '/assets/images/symbols/fiend.png',
  FIRE: '/assets/images/symbols/fire.png',
  Fish: '/assets/images/symbols/fish.png',
  Insect: '/assets/images/symbols/insect.png',
  LIGHT: '/assets/images/symbols/light.png',
  LinkSymbol: '/assets/images/symbols/link.png',
  Machine: '/assets/images/symbols/machine.png',
  Normal: '/assets/images/symbols/normal.png',
  Plant: '/assets/images/symbols/plant.png',
  Psychic: '/assets/images/symbols/psychic.png',
  Pyro: '/assets/images/symbols/pyro.png',
  QuickPlay: '/assets/images/symbols/quick-play.png',
  Rank: '/assets/images/symbols/rank.png',
  Reptile: '/assets/images/symbols/reptile.png',
  Ritual: '/assets/images/symbols/ritual.png',
  Rock: '/assets/images/symbols/rock.png',
  Scale: '/assets/images/symbols/scale.png',
  SeaSerpent: '/assets/images/symbols/sea-serpent.png',
  Spell: '/assets/images/symbols/spell.png',
  Spellcaster: '/assets/images/symbols/spellcaster.png',
  Star: '/assets/images/symbols/star.png',
  Thunder: '/assets/images/symbols/thunder.png',
  Trap: '/assets/images/symbols/trap.png',
  Warrior: '/assets/images/symbols/warrior.png',
  WATER: '/assets/images/symbols/water.png',
  WIND: '/assets/images/symbols/wind.png',
  WingedBeast: '/assets/images/symbols/winged-beast.png',
  Wyrm: '/assets/images/symbols/wyrm.png',
  Zombie: '/assets/images/symbols/zombie.png'
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
