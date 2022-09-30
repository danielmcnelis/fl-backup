import { Footer, NavBar } from '@fl/components'
import Routes from './routes'

const App = () => {
	return (
		<div className="app">
			<NavBar />
			<Routes />
			<Footer />
		</div>
	)
}

export default App
