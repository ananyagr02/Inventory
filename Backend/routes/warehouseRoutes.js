const express = require('express');
const router = express.Router()
const warehouseController = require('./../controllers/warehouseController')
router.post('/warehouseabout', warehouseController.about);
module.exports = router;