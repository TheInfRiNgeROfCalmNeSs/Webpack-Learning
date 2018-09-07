'use strict'

exports.showMenu = function() {
	require.ensure([], function(require) {
		let Menu = require('./menu').default

		let mainMenu = new Menu({
			title: "Комнаты дома",
			items: [{
				text: 'Детская',
				href: '#childroom'
			},
			{
				text: 'Кухня',
				href: '#kitchen'
			},
			{
				text: 'Гостинная',
				href: '#guestroom'
			}]
		})

		document.body.appendChild(mainMenu.elem)
	})
}