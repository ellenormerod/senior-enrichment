'use strict'
const api = require('express').Router()
const db = require('../db')

const Students = db.Students;
const Campuses = db.Campuses;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
// api.get('/hello', (req, res) => res.send({hello: 'world'}))

api.get('/', function(req, res, next){
	Campuses.findAll()
		.then((campus) => res.render('home', {campuses: campus}))
		.catch(next)
})

api.get('/:campusId', function(req, res, next){
	Campuses.findOne({
        where: {
            campusId: req.params.campusId
        }
	})
	.then(function(campus){
        res.render('campus', {campuses: campus})
    })
    .catch(next);
})

api.get('/students', function(req, res, next){
	
})

module.exports = api

// GET
// - all campuses
// - a campus by id
// - all students
// - a student by id
// POST
// - new campus
// - new student
// PUT
// - updated student info for one student
// - updated campus info for one campus
// DELETE
// - a campus
// - a student