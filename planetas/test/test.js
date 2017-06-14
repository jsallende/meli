'use strict'

let expect = require('chai').expect
let testUtils = require('./testUtils')

let planetUtils = require('../planetUtils')
let config = require('../config/config')

describe('calculatePosition', () => {
    it('Un planeta con velocidad de 1 grado por dia deberia estar en posicion inicial al cabo de 360 dias', () => {
        let position = planetUtils.calculatePosition(testUtils.planetWithSpeed1, 360)
        expect(position.x).to.be.equal(testUtils.planetWithSpeed1.radius);
    })
    it('El mismo planeta debería estar sobre el eje Y al cabo de 90 días', () => {
        let position = planetUtils.calculatePosition(testUtils.planetWithSpeed1, 90)
        expect(position.y).to.be.equal(testUtils.planetWithSpeed1.radius)
    })
});

describe('getClimate', () => {
    it('Tres planetas que forman triángulo sin incluir el sol deberían devolver clima normal', () => {
        expect(planetUtils.getClimate(testUtils.planetsNormal)).to.be.equal(config.climateTypes.NORMAL)
    })
    it('Tres planetas que forman triángulo incluyendo el sol deberían devolver clima de lluvia', () => {
        expect(planetUtils.getClimate(testUtils.planetsRain)).to.be.equal(config.climateTypes.RAIN)
    })
    it('Tres planetas colineales entre sí pero no con el sol deberían devolver clima óptimo', () => {
        expect(planetUtils.getClimate(testUtils.planetsOptimal)).to.be.equal(config.climateTypes.OPTIMAL)
    })
    it('Tres planetas colineales entre sí y con el sol deberían devolver clima de sequía', () => {
        expect(planetUtils.getClimate(testUtils.planetsDrought)).to.be.equal(config.climateTypes.DROUGHT)
    })
})