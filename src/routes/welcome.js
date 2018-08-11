'use strict'

export default function(message) {

	if(NODE_ENV == 'development') {
		console.log('development mode')
	}

	const testWeb = 'Qwerty'

	console.log(`Welcome ${message}`) 
}