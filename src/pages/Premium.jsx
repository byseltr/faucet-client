import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './styles/Premium.css'

const Premium = () => {
	
	return (
	<div className="App">
		<Navbar />

		<div className="p-premium">
			<div className="p-wrap">
				<div className="pc1">
					<h4>Byseltr Faucet</h4>
					<p>the byseltr testnet faucet only dispenses a small number of test tokens every day. to request more tokens, please used premium faucet with complete this form.</p>
					
					<div className="form">
						<div className="f-title">
							<h3>Premium Faucet</h3>
						</div>

						<div className="f-content">
							<p>premium faucet under-maintenance. DM our twitter account for request premium faucet</p>
							<a href="https//twitter.com/byseltr">request via twitter</a>
						</div>
					</div>
				</div>

				<div className="p-price">
					<h3>Page Under Maintenance</h3>
				</div>
			</div>
			
		</div>
		
		<Footer />
	</div>
	)
}

export default Premium