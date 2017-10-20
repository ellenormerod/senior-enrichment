'use strict'
const api = require('express').Router()
const { Student, Campus } = require('../db/models')

// const Students = db.Students;
// const Campuses = db.Campuses;

// api.use((req, res, next) => {
//   res.status(404).send('Not found');
// });

api.param('id', function (req, res, next, id) {
  Student.findById(id, {
		include: [Campus]
	})
  .then(function (student) {
    if (!student) res.sendStatus(404);
		req.student = student;
    next();
    return null;
  })
  .catch(next);
});

api.get('/campuses', function(req, res, next){
	Campus.findAll({include: [Student]})
		.then(campus => res.json(campus))
		.catch(next)
})

api.get('/campuses/:campusId', function(req, res, next){
	Campus.findById(req.params.campusId, {include: [Student]})
		.then(campus => res.json(campus))
  	.catch(next);
})

api.get('/students', function(req, res, next){
	Student.findAll({ include: [ Campus ] })
		.then(students => res.json(students))
		.catch(next)
})

api.get('/students/:studentId', function(req, res, next){
	Student.findById(req.params.studentId, {include: [Campus]})
		.then(student => res.json(student))
})

api.post('/campuses', function(req, res, next){
	Campus.create(req.body)
	.then(campus => res.json(campus))
	.catch(next)
})

api.post('/students', function(req, res, next){
	Campus.findOne({
		where: {
			name: req.body.campus
		}
	})
	.then(campus => {
		Student.create({
			name: req.body.name,
			email: req.body.email,
			CampusId: campus.id
		})
			.then(student => {
				return Student.findById(student.id, {
					include: [Campus]
				})
			})
			.then(student => {
				res.json(student)
			})
			.catch(next)
	})
	.catch(next);
})

api.put('/campuses/:campusId', function (req, res, next) {
  const campusId = req.params.campusId;
  Campus.findById(campusId, {include: [Student]})
		.then(campus => campus.update(req.body))
		.then(info => res.json(info))
    .catch(next);
});

api.put('/students/:id', function (req, res, next) {
	req.student.update(req.body)
		.then(student => {
			res.json(student)
		})
    .catch(next);
});

api.delete('/campuses/:campusId', function (req, res, next) {
  const id = req.params.campusId;
  Campus.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});

api.delete('/students/:studentId', function (req, res, next) {
  const id = req.params.studentId;
  Student.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});

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