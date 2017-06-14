module.exports = {
	planets:[
		{
			name: "Ferengi",
			speed: -1 * Math.PI / 180,
			radius: 500
		},
		{
			name: "Betasoide",
			speed: -3 * Math.PI / 180,
			radius: 2000
		},
		{
			name: "Vulcano",
			speed: 5 * Math.PI / 180,
			radius: 1000
		}
	],
	mongo:{
		host: 'localhost:27017/planetas'
	},
	daysToAnalyze: 3650,
	climateTypes:{
		RAIN: 'Lluvia',
		OPTIMAL: 'Óptimas Condiciones',
		DROUGHT: 'Sequía',
		NORMAL: 'Normal'
	}
};

