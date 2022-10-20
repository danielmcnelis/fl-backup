import { useNavigate } from 'react-router-dom'
import { ordinalize } from '@fl/utils'

// const emojis = {
//   god: '/assets/images/emojis/god.png',
//   legend: '/assets/images/emojis/legend.png',
//   master: '/assets/images/emojis/master.png',
//   diamond: '/assets/images/emojis/diamond.png',
//   platinum: '/assets/images/emojis/platinum.png',
//   gold: '/assets/images/emojis/gold.png',
//   silver: '/assets/images/emojis/silver.png',
//   bronze: '/assets/images/emojis/bronze.png',
//   rock: '/assets/images/emojis/rock.png',
//   sad: '/assets/images/emojis/sad.png',
//   mad: '/assets/images/emojis/mad.png'
// }
// const { god, legend, master, diamond, platinum, gold, silver, bronze, rock, sad, mad } = emojis

/* eslint-disable */
//GET MEDAL
const getMedal = (elo) => {
  return !elo
    ? gold
    : elo <= 230
    ? 'Mad'
    : elo > 230 && elo <= 290
    ? 'Sad'
    : elo > 290 && elo <= 350
    ? 'Rock'
    : elo > 350 && elo <= 410
    ? 'Bronze'
    : elo > 410 && elo <= 470
    ? 'Silver'
    : elo > 470 && elo <= 530
    ? 'Gold'
    : elo > 530 && elo <= 590
    ? 'Platinum'
    : elo > 590 && elo <= 650
    ? 'Diamond'
    : elo > 650 && elo <= 710
    ? 'Master'
    : elo > 710 && elo <= 770
    ? 'Legend'
    : 'God'
}

//GET TITLE
const getTitle = (elo) => {
  return !elo
    ? 'gold'
    : elo <= 230
    ? 'tilted'
    : elo > 230 && elo <= 290
    ? 'chump'
    : elo > 290 && elo <= 350
    ? 'rock'
    : elo > 350 && elo <= 410
    ? 'bronze'
    : elo > 410 && elo <= 470
    ? 'silver'
    : elo > 470 && elo <= 530
    ? 'gold'
    : elo > 530 && elo <= 590
    ? 'platinum'
    : elo > 590 && elo <= 650
    ? 'diamond'
    : elo > 650 && elo <= 710
    ? 'master'
    : elo > 710 && elo <= 770
    ? 'legend'
    : 'deity'
}

export const StatsRow = (props) => {
  const { index, stats } = props
  const { elo, wins, losses, player } = stats
  if (!player) return <tr />
  const extension =
    player.name
      .replaceAll('%', '%25')
      .replaceAll('/', '%2F')
      .replaceAll(' ', '_')
      .replaceAll('#', '%23')
      .replaceAll('?', '%3F') +
    '#' +
    player.discriminator

  const evenOrOdd = props.index % 2 ? 'even' : 'odd'
  const displayName =
    player.name.length <= 24 ? player.name : player.name.slice(0, 24).split(' ').slice(0, -1).join(' ')
  const navigate = useNavigate()
  const goToPlayer = () => navigate(`/players/${extension}`)

  return (
    <tr onClick={() => goToPlayer()} className={`${evenOrOdd}-search-results-row`}>
      <td className="leaderboard-cell-1">{ordinalize(index + 1)}</td>
      <td className="leaderboard-cell-2">
        <div className="player-cell">
          <img
            className="player-cell-pfp"
            src={`/assets/components/images/pfps/${stats.player.discordId}.png`}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = 'https://cdn.discordapp.com/embed/avatars/1.png'
            }}
          />
          <div>{displayName}</div>
        </div>
      </td>
      <td className="leaderboard-cell-3">{Math.round(100 * elo) / 100}</td>
      <td className="leaderboard-cell-4">
        <div className="medal-cell">
          <div className="medal-title">{getTitle(elo)}</div>
          <img width="32px" src={`/assets/components/images/emojis/${getMedal(elo)}.png`} />
        </div>
      </td>
      <td className="leaderboard-cell-5">{wins}</td>
      <td className="leaderboard-cell-6">{losses}</td>
      <td className="leaderboard-cell-7">{(Math.round((1000 * wins) / (wins + losses)) / 10).toFixed(1)}%</td>
    </tr>
  )
}
