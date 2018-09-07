"use strict"

require.ensure([], function(require) {
	let Menu = require('./menu')

	let pandaMenu = new Menu({
		title: "Меню панды",
		items: [{
			text: 'Яйца',
			href: '#eggs'
		},
		{
			text: 'Мясо',
			href: '#meat'
		},
		{
			text: 'Бамбук',
			href: '#bamboo'
		}]
	})

	console.log('pandaMenu', pandaMenu)

	window.onload = function() {
		document.body.appendChild(pandaMenu.elem)
	}
})