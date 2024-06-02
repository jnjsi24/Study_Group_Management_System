const express = require('express');
const router = express.Router();
const cafeController = require('../Controllers/cafeController');

router.post('/cafes', cafeController.createCafe);
router.get('/cafes', cafeController.getCafes);
router.get('/cafes/query', cafeController.queryCafeByName);
router.get('/cafes/:id', cafeController.getCafeById); // Correctly reference the controller function
router.put('/cafes/:id', cafeController.updateCafe);
router.delete('/cafes/:id', cafeController.deleteCafe);

module.exports = router;
