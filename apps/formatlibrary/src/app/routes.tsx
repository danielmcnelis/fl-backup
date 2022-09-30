import { Redirect, Route, Switch}  from 'react-router-dom'
import {
	Home,
	AdminPortal,
	SingleCard,
	CardTable,
	SingleDeck,
	DeckGallery,
	DeckTable,
	DeckType,
	EventTable,
	SingleEvent,
	FormatMenu,
	FormatIntro,
	LeaderBoard,
	Login,
	SingleBanList,
	PlayerProfile,
	NotFound
} from '@fl/components'

const Routes = () => {
	return (
		<Switch>
			<Route path="/" element=<Home /> />
			<Route path="/home/" element= <Home /> />
			<Route path="/great-library.html" element= <CardTable /> />
			<Route path="/great-library" element= <CardTable /> />
			<Route path="/cards-by-format.html" element= <CardTable /> />
			<Route path="/cards-by-format" element= <CardTable /> />
			<Route path="/cards-by-year.html" element= <CardTable /> />
			<Route path="/cards-by-year" element= <CardTable /> />
			<Route path="/goat-pool.html" element= <CardTable /> />
			<Route path="/goat-pool" element= <CardTable /> />
			<Route path="/goat-card-pool.html" element= <CardTable /> />
			<Route path="/goat-card-pool" element= <CardTable /> />
			<Route path="/cards/" element= <CardTable /> />
			<Route path="/cards?format=:id" element= <CardTable /> />
			<Route path="/cards/:id" element= <SingleCard /> />
			<Route path="/goat-deck-gallery"><Redirect to="/gallery/Goat" /> /></Route>
			<Route path="/decks/" element= <DeckTable /> />
			<Route path="/decks/:id" element= <SingleDeck /> />
			<Route path="/decktypes/:id" element= <DeckType /> />
			<Route path="/gallery/:id" element= <DeckGallery /> />
			<Route path="/events/" element= <EventTable /> />
			<Route path="/events/:id" element= <SingleEvent /> />
			<Route path="/ban-lists" element= <FormatMenu /> />
			<Route path="/goat-intro.html"><Redirect to="/formats/Goat" /> /></Route>
			<Route path="/goat-intro"><Redirect to="/formats/Goat" /> /></Route>
			<Route path="/goat-history.html"><Redirect to="/formats/Goat" /> /></Route>
			<Route path="/goat-history"><Redirect to="/formats/Goat" /> /></Route>
			<Route path="/goat-rulings.html"><Redirect to="/formats/Goat" /> /></Route>
			<Route path="/goat-rulings"><Redirect to="/formats/Goat" /> /></Route>
			<Route path="/formats/" element= <FormatMenu /> />
			<Route path="/formats/:id" element= <FormatIntro /> />
			<Route path="/leaderboards/:id" element= <LeaderBoard /> />
			<Route path="/banlists/:id" element= <SingleBanList /> />
			<Route path="/players/:id" element= <PlayerProfile /> />
			<Route path="/admin-portal" element= <AdminPortal /> />
			<Route path="/login" element= <Login /> />
			<Route path="/may-2002---yugi-kaiba"><Redirect to="/formats/Yugi-Kaiba" /> /></Route>
			<Route path="/jul-2002---critter"><Redirect to="/formats/Critter" /> /></Route>
			<Route path="/apr-2003---android"><Redirect to="/formats/Android" /> /></Route>
			<Route path="/aug-2003---yata"><Redirect to="/formats/Yata" /> /></Route>
			<Route path="/aug-2004---chaos"><Redirect to="/formats/Chaos" /> /></Route>
			<Route path="/oct-2004---warrior"><Redirect to="/formats/Warrior" /> /></Route>
			<Route path="/apr-2005---goat"><Redirect to="/formats/Goat" /> /></Route>
			<Route path="/oct-2005---reaper"><Redirect to="/formats/Reaper" /> /></Route>
			<Route path="/apr-2006---chaos-return"><Redirect to="/formats/Chaos_Return" /> /></Route>
			<Route path="/oct-2006---stein-monarch"><Redirect to="/formats/Stein" /> /></Route>
			<Route path="/mar-2007---troop-dup"><Redirect to="/formats/Trooper" /> /></Route>
			<Route path="/jan-2008---perfect-circle"><Redirect to="/formats/Perfect_Circle" /> /></Route>
			<Route path="/sep-2008---teledad"><Redirect to="/formats/TeleDAD" /> /></Route>
			<Route path="/mar-2009---synchro-cat"><Redirect to="/formats/Cat" /> /></Route>
			<Route path="/mar-2010---edison"><Redirect to="/formats/Edison" /> /></Route>
			<Route path="/july-2010---glad-beast"><Redirect to="/formats/Frog" /> /></Route>
			<Route path="/oct-2011---tengu-plant"><Redirect to="/formats/Tengu_Plant" /> /></Route>
			<Route path="/dec-2012---wind-up"><Redirect to="/formats/Wind-Up" /> /></Route>
			<Route path="/mar-2013---baby-ruler"><Redirect to="/formats/Baby_Ruler" /> /></Route>
			<Route path="/sep-2013---ravine-ruler"><Redirect to="/formats/Ravine_Ruler" /> /></Route>
			<Route path="/july-2014---hat"><Redirect to="/formats/HAT" /> /></Route>
			<Route path="/july-2015---djinn-lock"><Redirect to="/formats/Nekroz" /> /></Route>
			<Route path="/aug-2015---newgioh"><Redirect to="/formats/" /> /></Route>
			<Route path="/flc1"><Redirect to="/events/FLC1" /> /></Route>
			<Route path="/flc2"><Redirect to="/events/FLC2" /> /></Route>
			<Route path="/flc3"><Redirect to="/events/FLC3" /> /></Route>
			<Route path="/flc4"><Redirect to="/events/FLC4" /> /></Route>
			<Route path="/flc5"><Redirect to="/events/FLC5" /> /></Route>
			<Route element= <NotFound /> />
		</Switch>
	)
}

export default Routes
