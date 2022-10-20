const emojis = {
  First: '/assets/images/emojis/first.png',
  Second: '/assets/images/emojis/second.png',
  Third: '/assets/images/emojis/third.png',
  Consolation: '/assets/images/emojis/consolation.png'
}
const { First, Second, Third, Consolation } = emojis

/*eslint-disable*/

//PLACEMENT
export const Placement = (props) => {
  const { deck } = props
  if (!deck) return <div />

  const placementImage =
    deck.placement === 1 ? First : deck.placement === 2 ? Second : deck.placement === 3 ? Third : Consolation

  return (
    // <Link className="link" to={`/events/${deck.eventName}`}>
    <div className="badge">
      <img src={placementImage} />
      <div className="badge-label">{deck.eventName}</div>
    </div>
    // </Link>
  )
}
