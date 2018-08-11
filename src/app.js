"use strict"

window.onload = function() {
	document.getElementById('loginButton').addEventListener("click", function(MouseEvent) {
		require.ensure([], function(require) {
			let login = require('./login')
			login()
		},
		function(error) {
			console.log('login error:', error)
		},
		"auth")
	})
	document.getElementById('logoutButton').addEventListener("click", function(MouseEvent) {
		require.ensure([], function(require) {
			let logout = require('./logout')
			logout()
		},
		function(error) {
			console.log('logout error:', error)
		},
		"auth")
	})
}