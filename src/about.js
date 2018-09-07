'use strict'

exports.showMenu = function() {
	require.ensure([], function(require) {
		let Menu = require('./menu').default

		let mainMenu = new Menu({
			title: "О сайте 2",
			items: [{
				text: 'Кто придумал?',
				href: '#who-invented'
			},
			{
				text: 'Кто сделал?',
				href: '#who-made'
			},
			{
				text: 'Кто оплатил?',
				href: '#who-payed'
			}]
		})

		document.body.appendChild(mainMenu.elem)

	})
}