
import { Link } from 'react-router-dom'
import './Navigation.css'

const toggle = () => {
  const menu = document.getElementById('hamburger-menu')
  menu.classList.toggle('open')
  menu.classList.toggle('closed')
}

//NavBar
export const Navigation = () => (
  <div className="navigation-bar">
    <Link to="/">
      <div id="logo">
        <img src={'/assets/images/logos/Format Library.png'} alt="logo"/>
        <h1>Format Library</h1>
      </div>
    </Link>
    <div id="navigation-menu">
      <Link to="/">
        <h2 className="navigation-item">HOME</h2>
      </Link>
      <Link to="/cards/">
        <h2 className="navigation-item">CARDS</h2>
      </Link>
      <Link to="/decks/">
        <h2 className="navigation-item">DECKS</h2>
      </Link>
      <Link to="/events/">
        <h2 className="navigation-item">EVENTS</h2>
      </Link>
      <Link to="/formats/">
        <h2 className="navigation-item">FORMATS</h2>
      </Link>
      <a href="/auth/login/">
        <h1 id="login" className="navigation-item">LOGIN</h1>
      </a>
    </div>
    <div id="hamburger-menu" className="closed" onClick={() => toggle()}>
      <div id="hamburger-button" className="closed-b">
        ≡
      </div>
      <div id="hamburger-button" className="open-b">
        ⌄
      </div>
      <Link to="/" >
        <h3 className="hamburger-item">Home</h3>
      </Link>
      <Link to="/cards/">
        <h3 className="hamburger-item">Cards</h3>
      </Link>
      <Link to="/decks/">
        <h3 className="hamburger-item">Decks</h3>
      </Link>
      <Link to="/events/">
        <h3 className="hamburger-item">Events</h3>
      </Link>
      <Link to="/formats/">
        <h3 className="hamburger-item">Formats</h3>
      </Link>
    </div>
  </div>
)
