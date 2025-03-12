const express = require('express');
const Schools = require('../controller/schoolController');

const router = express.Router();

// Routes
router.post('/addSchool', Schools.addSchool);
router.get('/listSchools', Schools.listSchools);

module.exports = router;
