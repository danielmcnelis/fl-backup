
import { capitalize, underscorize } from '@fl/utils'
import { Link } from 'react-router-dom'

const emojis = {
  god: '/assets/images/emojis/god.png',
  legend: '/assets/images/emojis/legend.png',
  master: '/assets/images/emojis/master.png',
  diamond: '/assets/images/emojis/diamond.png',
  platinum: '/assets/images/emojis/platinum.png',
  gold: '/assets/images/emojis/gold.png',
  silver: '/assets/images/emojis/silver.png',
  bronze: '/assets/images/emojis/bronze.png',
  rock: '/assets/images/emojis/rock.png',
  sad: '/assets/images/emojis/sad.png',
  mad: '/assets/images/emojis/mad.png'
}
const { god, legend, master, diamond, platinum, gold, silver, bronze, rock, sad, mad } = emojis

//GET MEDAL
const getMedal = (elo) => {
  return !elo
    ? gold
    : elo <= 230
    ? mad
    : elo > 230 && elo <= 290
    ? sad
    : elo > 290 && elo <= 350
    ? rock
    : elo > 350 && elo <= 410
    ? bronze
    : elo > 410 && elo <= 470
    ? silver
    : elo > 470 && elo <= 530
    ? gold
    : elo > 530 && elo <= 590
    ? platinum
    : elo > 590 && elo <= 650
    ? diamond
    : elo > 650 && elo <= 710
    ? master
    : elo > 710 && elo <= 770
    ? legend
    : god
}

//BADGE
export const Badge = (props) => {
  const { stats } = props
  if (!stats) return
  const medal = getMedal(stats.elo)

  return (
    <Link className="link" to={underscorize(`/formats/${stats.format}`)}>
        <div className="badge">
            <img src={medal} alt="medal"/>
            <div className="badge-label">{capitalize(stats.format.replace('_', ' '), true)}</div>
        </div>
    </Link>
  )
}
