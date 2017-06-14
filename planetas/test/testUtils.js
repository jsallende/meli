'use strict'

module.exports = {
    planetWithSpeed1 : {
        speed: 1 * Math.PI / 180,
        radius: 100
    },
    planetsNormal: [
        {
            position: {
                x:0, y:10
            }
        },
        {
            position: {
                x:0, y:90
            }
        },
        {
            position: {
                x:45, y:10
            }
        }
    ],
    planetsRain: [
        {
            position: {
                x:-50, y:30
            }
        },
        {
            position: {
                x:50, y:30
            }
        },
        {
            position: {
                x:0, y:-30
            }
        }
    ],
    planetsOptimal: [
        {
            position: {
                x:1, y:30
            }
        },
        {
            position: {
                x:1, y:40
            }
        },
        {
            position: {
                x:1, y:-30
            }
        }
    ],
    planetsDrought: [
        {
            position: {
                x:0, y:30
            }
        },
        {
            position: {
                x:0, y:40
            }
        },
        {
            position: {
                x:0, y:-30
            }
        }
    ]
}