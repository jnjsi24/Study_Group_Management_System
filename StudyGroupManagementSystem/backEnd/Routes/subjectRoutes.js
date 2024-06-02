const express = require('express');
const router = express.Router();
const subjectController = require('../Controllers/subjectController');

// CRUD operations for subjects
router.post('/', subjectController.createSubject);
router.get('/', subjectController.getSubjects);
router.get('/:id', subjectController.getSubjectById);
router.get('/name/:name', subjectController.getSubjectByName); // Route to get subject by name
router.put('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
