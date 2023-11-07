import Navbar from '../components/Navbar'
import './styles/404.css'

const NotFound = () => {
	return (
		<div className="App">
			<Navbar />
			
			<div className="not-found">
				<h3>Page Not Found</h3>
				<a href="/" className="back">back to the home</a>
			</div>

		</div>
	)
}

export default NotFound