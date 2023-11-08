import { useState, useEffect } from 'react'
import axios, { config } from '../services/Api'
import './styles/TxHistory.css'

const TxHistory = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [txs, setTxs] = useState({
		error: null,
		left: null,
		right: null,
	})

	useEffect(() => {
		const TXS = async () => {
			try {
				setIsLoading(true)

				const response = await axios.get(config.api.txs)

				let data = response?.data
				setTxs({
					left: data?.left,
					right: data?.right,
				})
			} catch(err) {
				setTxs({
					error: err,
				})
			}

			setIsLoading(false)
		}
		
		TXS()
	}, [])

	const Tx = (prop) => {
		const tx = prop.tx
		const addr = tx.address
		const address = [addr.slice(0,4),'...',addr.slice(addr.length-4)].join('')
		const hash = tx.hash
		const url = tx.explorer+hash
		const chain = chainIS(tx.chain)
		const time = timeAgo(tx.time)

		return (
		<div className="tx">
			<p className="tx-title">
				<strong>{address}</strong>
				request has successful
			</p>
			<p className="tx-body">
				<strong>Tx hash:</strong>
				<a href={url} target="_noblank">
					{hash}
				</a>
			</p>
			<p className="tx-info">
				<strong>on {chain}</strong>
				<span>{time}</span>
			</p>
		</div>
		)
	}


	return (
	<div className="txs">
		<div className="head">
			<h3>Transaction History</h3>
		</div>

		{
			isLoading ?
			<p>load content...</p> : txs.error ?
			<p>can't load content</p> : ''
		}

		<div className="body">
			<div className="wrap">
				{txs?.left?.map((t1) => (
					<Tx key={t1._id} tx={t1} />
				))}
			</div>

			<div className="wrap">
				{txs?.right?.map((t2) => (
					<Tx key={t2._id} tx={t2} />
				))}
			</div>
		</div>
	</div>
	)
}

const timeAgo = (timestamp) => {
	const now = new Date()
	const diff = Date.parse(now) - Date.parse(timestamp)
	const second = diff / 1000

	const minute = Math.round(second / 60)
	const hour = Math.round(second / 3600)
	const day = Math.round(second / 86400)
	const week = Math.round(second / 604800)
	const month = Math.round(second / 2629440)
	const year = Math.round(second / 31553280)

	const ago = (sec, time) => {
		if (sec === 1) {
			return `a ${time}s ago`
		} else {
			return `${sec} ${time} ago`
		}
	}

	if (second <= 60) return 'a seconds ago'
	else if (minute <= 60) return ago(minute, 'minute')
	else if (hour <= 24) return ago(hour, 'hour')
	else if (day <= 7) return ago(day, 'day')
	else if (week <= 4.3) return ago(week, 'week')
	else if (month <= 12) return ago(month, 'month')
	else if (year <= 1) return ago(year, 'year')
}

const chainIS = (chain) => {
	if (chain === 'MUMBAI') return 'Polygon Mumbai'
	else if (chain === 'FUJI') return 'Avalanche Fuji'
	else if (chain === 'ATHENS') return 'Zetachain Athens 3'
	else if (chain === 'HOLESKY') return 'Ethereum Holesky'
	else return 'Unknown Chain'
}

export default TxHistory