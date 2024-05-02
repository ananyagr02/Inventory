const express = require('express');
const router = express.Router()
const brandController = require('./../controllers/brandController')
router.post('/brands', brandController.about);
module.exports = router;