'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlanetSchema = Schema({
  name: String,
  position: {x: Number, y: Number}
})

module.exports = {
	PlanetSchema
}