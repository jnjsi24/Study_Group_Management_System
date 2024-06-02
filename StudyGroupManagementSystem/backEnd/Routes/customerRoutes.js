const express = require('express');
const router = express.Router();
const customerController = require('../Controllers/customerController');

// Routes for customers
router.get('/', customerController.getCustomers);
router.get('/name', customerController.queryCustomerByName); // New route to query customers by name
router.get('/:id', customerController.getCustomerById);
router.post('/', customerController.createCustomer); // Updated route to create customer
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
