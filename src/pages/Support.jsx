import { useState, useEffect } from 'react'
import axios, { config } from '../services/Api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './styles/Support.css'

const Support = () => {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [allowSend, setAllowSend] = useState(false)
	const [submitedResponse, setSubmitedResponse] = useState({
		error: null,
		message: null,
	})

	useEffect(() => {
		if (email) {
			if (message.length > 50) {
				setAllowSend(true)
				return
			}
		}

		setAllowSend(false)
	}, [email, message])


	async function sendTicket() {
		if (!allowSend) {
			return
		}

		try {
			setIsLoading(true)

			const response = await axios.post(config.api.support, {
				email: email,
				message: message,
			})

			setSubmitedResponse({
				message: response?.data?.message,
			})
		} catch(err) {
			setSubmitedResponse({
				error: err?.response?.data || err,
			})
		}
		
		setIsLoading(false)
	}

	const back = () => {
		setSubmitedResponse({
			error: null,
			message:null,
		})
	}

	return (
		<div className="App">
			<Navbar />

			<div className="support">
				<div className="s-wrap">
					<div className="form">
						<div className="title">
							<h3>Submit a ticket</h3>
						</div>

						<div className="content"
							style={{
								display: submitedResponse?.message ? 'none' : 'block'
							}}>
							<p>Describe your issue by filling up this form</p>
							<input
								placeholder="Email"
								value={email || ''}
								onChange={(e) => setEmail(e.target.value)}
								/><br/>
							<textarea
								placeholder="Type your message here..."
								value={message || ''}
								onChange={(e) => setMessage(e.target.value)}
								rows="10"
								>
							</textarea>

							<span className="note">note: minimum length for a message is 50 characters.</span>

							{
								submitedResponse?.error 
								?
								<span className="alert">*Network Error</span>
								:
								''
							}
							
							<div className="submit">
								<button onClick={sendTicket}
									className={allowSend ? '' : 'disable'}>
									{isLoading ? 'SENDING...' : 'SUBMIT'}
								</button>
							</div>
						</div>

						{/* SUBMITED RESPONSE */}
						<div className="response"
							style={{
								display: submitedResponse?.message ? 'block' : 'none'
							}}>
							<h4>Submited Result</h4>
							<h5>{submitedResponse?.message}</h5>
							<p>TID: qwertyuiopasdfghjklzxcvbnm</p>
							<button onClick={back}>BACK</button>
						</div>
					</div>

					{/*content 1 column 2*/}
				</div>

				{/*<h3>Content Second</h3>*/}
			</div>

			<Footer />
		</div>
	)
}

export default Support