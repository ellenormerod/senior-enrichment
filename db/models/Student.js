var db = require('../index');
var Sequelize = require('sequelize');

var Student = db.define('Student', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		isAlphanumeric: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	}
});


module.exports = Student