'use strict'

const Day = require('../models/day')
const Promise = require('bluebird')

let saveDay = (dayToSave) => {

	return new Promise((resolve, reject) => {
		let day = new Day()

		day.number = dayToSave.number
		day.planets = dayToSave.planets
		day.climate = dayToSave.climate

		day.save((err, dayStored) => {
    		if (err) return reject(`Error al salvar en la base de datos ${err} `)
    		return resolve(dayStored)
  		})	
	})
	
}

let resetDays = () => {

	return new Promise((resolve, reject) => {
		Day.remove({},(err) => {
			if(err) return reject(`Error al vaciar la base de datos: ${err}`)
			return resolve()
		})
	})

}

module.exports = {
	saveDay,
	resetDays
}