'use strict'

const express = require('express')
const dayController = require('../controllers/day')
const api = express.Router()

api.get('/day/:dayNum', dayController.getDay)

module.exports = api