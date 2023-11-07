import config from './config.json'

export let chains = new Map()
config['CHAINS'].forEach((chain) => {
	chains.set(chain.ID, chain)
})

export let drips = config['CHAINS']