'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//override deprecation
mongoose.Promise = require('bluebird')

const PlanetSchema = require('./planet').PlanetSchema

const DaySchema = Schema({
  number: {type: Number, index:true},
  planets: [PlanetSchema],
  climate: {type: String, enum: ['Lluvia', 'Óptimas Condiciones', 'Sequía', 'Normal']}
})

module.exports = mongoose.model('Day', DaySchema)