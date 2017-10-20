var db = require('../index');
var Sequelize = require('sequelize');
const bosCampus = 'https://www.bu.edu/today/files/2014/08/cu_MG_6087.jpg';
const cuCampus = 'http://www.cu.edu/sites/default/files/campus_boulder_arial_870x450.jpg';
const sbCampus = 'https://usa.varsity.com/ucsb-campus-aerial.jpg?v=1';
const scCampus = 'http://www.clemson.edu/visit/images/features/15-visit-5.jpg';


const images = [
  bosCampus, cuCampus, sbCampus, scCampus
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

var Campus = db.define('Campus', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return getRandomImage();
    }
	}
});


module.exports = Campus
