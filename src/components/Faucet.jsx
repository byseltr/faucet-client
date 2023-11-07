import { useState, useEffect } from 'react'
import axios, { config } from '../services/Api'
import { ethers } from 'ethers'
import './styles/Faucet.css'
import './styles/Premium.css'

const Faucet = (props) => {
	const [serverStatus, setServerStatus] = useState(false)
	const [inputAddress, setInputAddress] = useState('')
	const [inputTweetURL, setInputTweetURL] = useState('')
	const [address, setAddress] = useState(null)
	const [tweetURL, setTweetURL] = useState(null)
	const [allowSend, setAllowSend] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [sendDripResponse, setSendDripResponse] = useState({
		message: null,
		txHash: null,
	})

	let textTweet = `request testnet $${props.chain.TOKEN} tokens from @byseltr faucet on ${props.chain.NAME} Drip. #byseltr #testnet-faucet #testnet`

	useEffect(() => {
		const status = async () => {
			try {
				await axios.get(config.status)
				setServerStatus(true)
			} catch(err) {
				setServerStatus(false)
			}
		}

		status()
	}, [])

	useEffect(() => {
		if (address) {
			if (tweetURL) {
				setAllowSend(true)
				return
			}
		}

		setAllowSend(false)
	}, [address, tweetURL])

	function updateAddress(addr) {
		setInputAddress(addr)

		if (addr) {
			if (ethers.isAddress(addr)) {
				setAddress(addr)
			} else {
				setAddress(null)
			}
		} else if (address !== null) {
			setAddress(null)
		}
		
	}

	function updateTweetURL(url) {
		setInputTweetURL(url)

		if (url) {
			if (checkTweetURL(url)) {
				setTweetURL(url)
			} else {
				setTweetURL(null)
			}
		} else if (tweetURL !== null) {
			setTweetURL(null)
		}
	}

	// NOT FIX
	async function sendDrip() {
		if(!allowSend) {
			return
		}

		let data
		try {
			setIsLoading(true)

			const response = await axios.post(config.api.drip, {
				address: address,
				tweet: tweetURL,
				chain: props.chain.ID
			})

			data = response?.data 
		} catch(err) {
			data = err?.response?.data || err
		}
		
		setSendDripResponse({
			message: data?.message,
			txHash: data?.txHash,
		})
		
		setIsLoading(false)
	}

	const back = () => {
		setSendDripResponse({
			message: null,
			txHash: null,
		})
	}

	return (
	<div className="faucet">
		<div className="form">
			<div className="head">
				<h3>{props.chain.NAME} Faucet</h3>
				<span
					className={serverStatus ? 'status' : 'status inactive'}>
					&#9679; {serverStatus ? 'active' : 'inactive'}
				</span>
			</div>

			<div
				className="body"
				style={{
					display: sendDripResponse?.txHash ? 'none' : 'block'
				}}>
				<div className="wrap">
					<label>WALLET ADDRESS</label>
					{
						inputAddress
						?
						ethers.isAddress(inputAddress)
						?
						''
						: 
						<span className="warn">*invalid wallet address</span>
						:
						''
					}
					<br/>
					<input id="addr"
						placeholder="Your Wallet Address (0x..."
						value={inputAddress || ''}
						onChange={(e) => updateAddress(e.target.value)}
					/>
				</div>

				<div className="wrap">
					<label>FOLLOW AND SEND TWEET</label>
					<p>follow our twitter account</p>
					<a
						href="https://twitter.com/byseltr"
						target="_noblank">
						<i className="fa-brands fa-x-twitter"></i>
						Follow @byseltr
					</a>
					<p>post this tweet and you will receive your tokens in just seconds.</p>
					<div className="tweet">
						{textTweet}
					</div>
					<a
						href={'https://twitter.com/intent/tweet?text=' + textTweet}
						target="_noblank">
						<i className="fa-brands fa-x-twitter"></i>
						Post a Tweet
					</a>
				</div>

				<div className="wrap">
					<label>TWEET URL</label>
					{
						inputTweetURL
						?
						checkTweetURL(inputTweetURL)
						?
						''
						:
						<span className="warn">*invalid tweet url</span>
						:
						''
					}
					<br/>
					<input id="turl"
						placeholder="Your Tweet URL (https://twitter.com/byseltr/status/...)"
						value={inputTweetURL || ''}
						onChange={(e) => updateTweetURL(e.target.value)}
					/>
				</div>

				{/*==================================================*/}
				<span className="note">note: funds that you receive throught this faucet are not real funds. it's just used to testing.
				</span>

				{
					sendDripResponse?.message
					?
					<span className="alert">*{sendDripResponse?.message}</span>
					:
					''
				}

				<div style={{textAlign: 'center'}}>
					<button className={allowSend ? 'submit' : 'submit disable'} onClick={sendDrip}>
						{isLoading ? 'DRIP ON PROCESS...' : 'REQUEST DRIP'}
					</button>
				</div>
			</div>

			{/* SEND DRIP RESPONSE */}
			<div
				className="drip-response"
				style={{
					display: sendDripResponse?.txHash ? 'block' : 'none'
				}}>
				<h4>Drip Result</h4>
				<h5>{sendDripResponse?.message}</h5>
				<p className="txh">
					<strong>txh: </strong>
					<a href={props.chain.EXPLORER + sendDripResponse?.txHash} target="_noblank">
						{sendDripResponse?.txHash}
					</a>
				</p>
				<button onClick={back}>BACK</button>
			</div>
		</div>

		{/* PREMIUM FAUCET */}
		<div className="premium">
			<h3>Need more testnet tokens?</h3>
			<p>to request more tokens that you can use to testing, please used instans faucet.</p>
			<a href="/premium">BUY TBNB</a>
			<a href="/premium">BUY TMATIC</a>
		</div>
	</div>
	)
}

function checkTweetURL(url) {
	return url.slice(0, 19) === 'https://twitter.com'
}

export default Faucet