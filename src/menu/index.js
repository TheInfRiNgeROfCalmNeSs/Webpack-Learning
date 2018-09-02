'use strict'

//import './menu.css'
import './styles.styl'

import imgOne from './windows.jpg'
import imgTwo from './photo.jpg'
import imgThree from './mi.jpg'

import template from './menu.jade'

export default class Menu {
	constructor(options) {
		this.elem = document.createElement('div')
		this.elem.className = "menu"

		this.elem.innerHTML = template(options)		
		this.titleElem = this.elem.querySelector('.title')

		let img = document.createElement('img')
		img.src = imgOne
		this.elem.appendChild(img)

		this.titleElem.onclick = () => this.elem.classList.toggle('open')

		this.titleElem.onmousedown = () => false
	}
} 
