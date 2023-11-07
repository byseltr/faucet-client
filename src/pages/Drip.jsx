import Navbar from '../components/Navbar'
import Introduction from '../components/Introduction'
import Faucet from '../components/Faucet'
import TxHistory from '../components/TxHistory'
import Footer from '../components/Footer'
import { chains, drips } from '../setup'
import './styles/Drip.css'

const Drip = (props) => {
	
	return (
		<div className="App">
			<Navbar />

			<div className="main">
				<div className="container content-1">
					<Introduction drips={drips} />
					<Faucet chain={chains.get(props.cid)} />
				</div>

				<div className="container content-2">
					<TxHistory />
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default Drip