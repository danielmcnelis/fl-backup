
import { Link } from 'react-router-dom'
import { capitalize } from '@fl/utils'

export const EventThumbnail = (props = {}) => {
    const {event, winner} = props
    if (!event || !winner) return <div/>

  return (
        <Link className='link' to={`/events/${event.abbreviation}`}>
          <div className="eventThumbnail">  
              <h3>{capitalize(event.abbreviation, true)}</h3>
              <div className="eventThumbnail-flexbox">
                  <img 
                    className="eventThumbnail-image" 
                    src={`https://formatlibrary.s3.us-east-2.amazonaws.com/images/emojis/${event.format.icon}.png`}
                  />
                  <img 
                    className="eventThumbnail-player-pfp" 
                    src={`https://formatlibrary.s3.us-east-2.amazonaws.com/images/pfps/${winner.discordId || winner.name}.png`} 
                    onError={(e) => {
                            e.target.onerror = null
                            e.target.src="https://cdn.discordapp.com/embed/avatars/1.png"
                        }
                    }
                  />
                  <img 
                    className="eventThumbnail-image" 
                    src={`https://formatlibrary.s3.us-east-2.amazonaws.com/images/logos/${event.community}.png`} 
                  />
              </div>
          </div>
        </Link>
  )
}
