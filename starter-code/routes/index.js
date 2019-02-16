const express = require('express');
const router  = express.Router();
const Place = require('../models/place');

// GET => to retrieve all the places from the DB
router.get('/', (req, res, next) => {
	Place.find({},(error, placesFromDB) => {
		if (error) { 
			next(error); 
		} else { 
			res.render('index', { places: placesFromDB });
		}
	});
});

module.exports = router;
