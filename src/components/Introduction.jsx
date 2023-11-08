import './styles/Introduction.css'

const Introduction = (props) => {
	const telegramBOT = 'https://t.me/byseltr_faucet_bot'

	const drips = (data) => (
		<a
			href={data.URL}
			className="drip"
			key={data.ID}>
			<img
				src={data.LOGO}
				alt={data.ID+'_DRIP'}
				width="50"
			/>
			<h3>{data.NAME}</h3>
			<p>DRIP {data.AMOUNT} {data.TOKEN}</p>
		</a>
	)

	return (
		<div className="intro">
			<h4>Byseltr Faucet</h4>
			<h1>Testnet Faucet</h1>
			<p>request testnet tokens from various blockchain and test your smart contract or dapp. it's all free!
			</p>

			<a href={telegramBOT}>TELEGRAM FAUCET</a>
			<a href="page.disable" className="disable">DRIP LIST</a>

			<div className="drips">
				{props.drips.map((drip) => drips(drip))}
			</div>

		</div>
	)
}

export default Introduction