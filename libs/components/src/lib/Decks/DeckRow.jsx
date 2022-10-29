
import { Link } from 'react-router-dom'
import { ordinalize } from '@fl/utils'

export const DeckRow = (props) => {
    const {deck} = props
    const evenOrOdd = props.index % 2 ? 'even' : 'odd'
    
    return (
          <tr className={`${evenOrOdd}-search-results-row`}>
            <td className="no-padding">
              <Link className="black-text" 
                  to={`/decks/${deck.id}`}
                  target="_blank" 
                  rel="noopener noreferrer"
              >
                <div className="format-cell-flexbox">
                  <img src={`/assets/images/emojis/${deck.format.icon}.png`} alt={deck.format.icon}/>
                  <div>{deck.formatName}</div>
                </div>
              </Link>
            </td>
            <td className="no-padding">
              <Link className="black-text" 
                  to={`/decks/${deck.id}`}
                  target="_blank" 
                  rel="noopener noreferrer"
              >
                <div className="deckType-cell">
                  {deck.type || '-'}
                </div>
              </Link>
            </td>
            <td className="no-padding">
              <Link className="black-text" 
                  to={`/decks/${deck.id}`}
                  target="_blank" 
                  rel="noopener noreferrer"
              >
                <div className="deckCategory-cell">
                  {deck.category || '-'}
                </div>
              </Link>
            </td>
            <td className="no-padding">
              <Link className="black-text" 
                  to={`/decks/${deck.id}`}
                  target="_blank" 
                  rel="noopener noreferrer"
              >
                <div className="player-cell">
                  <img 
                      className="player-cell-pfp"
                      src={`/assets/images/pfps/${deck.player.discordId || deck.player.name}.png`}
                      alt={`${deck.player.name}-pfp`}
                      onError={(e) => {
                              e.target.onerror = null
                              e.target.src="https://cdn.discordapp.com/embed/avatars/1.png"
                          }
                      }
                  />
                  <div>{deck.builder || '-'}</div>
                </div>
              </Link>
            </td>
            <td className="no-padding">
              <Link className="black-text" 
                  to={`/decks/${deck.id}`}
                  target="_blank" 
                  rel="noopener noreferrer"
              >
                <div className="placement-cell">
                  {deck.placement ? ordinalize(deck.placement) : '-'}
                </div>
              </Link>
            </td>
            <td className="no-padding">
              <Link className="black-text"
                  to={`/decks/${deck.id}`}
                  target="_blank" 
                  rel="noopener noreferrer"
              >
                <div className="community-cell-flexbox">
                  {
                    deck.eventName ? <img src={`/assets/images/logos/${deck.community}.png`} alt={deck.community}/> : <img/>
                  }
                  <div>{deck.eventName || '-'}</div>
                </div>
              </Link>
            </td>
            <td className="no-padding">
              <Link className="black-text" 
                  to={`/decks/${deck.id}`}
                  target="_blank" 
                  rel="noopener noreferrer"
              >
                <div className="date-cell">
                  {deck.publishDate ? deck.publishDate.substring(0, 10) : '-'}
                </div>
              </Link>
            </td>
          </tr>
    )
}
