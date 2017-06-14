'use strict'

const Day = require('../models/day')

function getDay (req, res) {
  let dayNumber = req.params.dayNum

  Day.findOne({number: dayNumber}, (err, day) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
    if (!day) return res.status(404).send({ message: 'El día no existe' })

    res.status(200).send({ day })
  })
}

module.exports = {
  getDay
}