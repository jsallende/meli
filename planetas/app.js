'use strict'

//external deps
const express = require('express')
const mongoose = require('mongoose')
const Promise = require('bluebird')

//my deps
const config = require('./config/config')
const planetUtils = require('./planetUtils')
const geoUtils = require('./geoUtils')
const daysController = require('./controllers/day')

//override deprecation
mongoose.Promise = Promise

//acum
let diasSequia = 0
let diasOptimo = 0
let diasNormal = 0

let periodosLluvia = []
let maxPerimetro = 0
let inicioLluvia = 0
let diaMaximoLluvia = 0

let mainProcess = () => {
	return new Promise((resolve, reject)=>{

		//funcion que me permite encadenar la ejecucion de las promises
		let analyzeDaysSequentially = (day) => {
			if(day > config.daysToAnalyze){
				resolve()	
			}else{
				analyzeDay(day).then(()=>{
					analyzeDaysSequentially(day+1)
				})
			}
		}
		//empiezo desde el día 1
		analyzeDaysSequentially(1)
	})
}

let updateAcums = (climate) => {
	switch(climate){
		case config.climateTypes.DROUGHT:
			diasSequia++
			break
		case config.climateTypes.OPTIMAL:
			diasOptimo++
			break
		case config.climateTypes.NORMAL:
			diasNormal++
			break
	}
}

let analyzeRainPeriod = (day) => {
	if(day.climate == config.climateTypes.RAIN){
		//si es un día de lluvia, tengo que ver si es el primero de un nuevo período. Esto lo puedo saber chequeando maxPerimetro
		let currentPerimetro = geoUtils.getPerimeter(day.planets[0].position, day.planets[1].position, day.planets[2].position)
		if(maxPerimetro > 0){
			//es un nuevo día de lluvia en un mismo período, así que tengo que comparar si es pico o no
			if(currentPerimetro > maxPerimetro){
				maxPerimetro = currentPerimetro
				diaMaximoLluvia = day.number
			}
		}else{
			//es el primer día de lluvia del período
			maxPerimetro = currentPerimetro
			diaMaximoLluvia = day.number
			inicioLluvia = day.number
		}
	}else{
		//si no es un día de lluvia, puede que tenga que cerrar un período de lluvia. Lo puedo saber chequeando maxPerimetro
		if(maxPerimetro > 0){
			//el último día fue de lluvia, tengo que cerrar el período y updatear el máximo
			let unPeriodo = {
				primerDia: inicioLluvia,
				ultimoDia: day.number - 1,
				pico: diaMaximoLluvia
			}
			periodosLluvia.push(unPeriodo)
			//reinicio los indicadores de lluvia
			diaMaximoLluvia = 0
			maxPerimetro = 0
			inicioLluvia = 0
		}
		//si el último día no había sido de lluvia, no tengo que hacer nada
	}
}

let analyzeDay = (day) => {
	return new Promise((resolve, reject)=>{
		let planetsByDay = []
		config.planets.forEach((planet)=>{
			planetsByDay.push({
				name: planet.name,
				position: planetUtils.calculatePosition(planet,day)
			})
		})
		let dayToSave = {
			number: day,
			planets: planetsByDay
		}
		dayToSave.climate = planetUtils.getClimate(planetsByDay)

		updateAcums(dayToSave.climate)

		analyzeRainPeriod(dayToSave)

		daysController.saveDay(dayToSave).then(()=>{
			resolve()
		}).catch((err)=>{
			console.log(`Hay un error en la escritura en base de datos: ${err} - Abortando ejecución...`)
			process.exit(1)
		})
	})
}

let printRainPeriods = () => {
	console.log(`Períodos de lluvia:`)
	periodosLluvia.forEach((periodo) => {
		console.log(`- Desde el día ${periodo.primerDia} hasta el día ${periodo.ultimoDia}, con pico en el día ${periodo.pico}`)
	})
}

let printResults = () => {
	return new Promise((resolve, reject) => {
		console.log(`Total días Sequía: ${diasSequia}`)
		console.log(`Total días de Condiciones Óptimas: ${diasOptimo}`)
		console.log(`Total días de condiciones Normales: ${diasNormal}`)
		printRainPeriods()
		resolve()
	})
}

let finishUp = () => {
	mongoose.connection.close()
}

mongoose.connect(config.mongo.host, (err, res) => {
    if (err) {
        return console.log(`Error al conectar con la base de datos: ${err}`)
    }
    console.log('Conexión a la base de datos establecida!')
    daysController.resetDays().then(mainProcess).then(printResults).then(finishUp).catch(errMsg => {
    	return console.log(`Ocurrió un error inesperado: ${errMsg}`)
    })
})
