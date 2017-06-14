'use strict'

const config = require('./config/config')
const geoUtils = require('./geoUtils')
const origin = {x:0, y:0}

let calculatePosition = (planet,day) => {
	let posFinalX = Number((planet.radius * Math.cos(planet.speed * day)).toFixed(6)); 
	let posFinalY = Number((planet.radius * Math.sin(planet.speed * day)).toFixed(6)); 
	return {x:posFinalX, y:posFinalY};
}
let getClimate = (planets) => {
	//Primero chequeo si son colineales entre los tres planetas
	if(geoUtils.areCollineal(planets[0].position, planets[1].position, planets[2].position)){
		//si son colineales, vuelvo a preguntar si 2 de ellos son colineales con el sol
		//que está en el centro de coordenadas
		if(geoUtils.areCollineal(planets[0].position, planets[1].position, origin)){
			//si se cumple es Sequía
			return config.climateTypes.DROUGHT
		}else{
			//si no se cumple son condiciones ideales de temperatura y presión
			return config.climateTypes.OPTIMAL
		}
	}else{
		//chequeo si el sol está dentro del triángulo que forman
		if(geoUtils.isInsideTriangle(origin, planets[0].position, planets[1].position, planets[2].position)){
			return config.climateTypes.RAIN
			//es lluvia, pero tengo que hacer más cosas
		}else{
			//es normal
			return config.climateTypes.NORMAL
		}
	}
}

module.exports = {
	calculatePosition,
	getClimate
}