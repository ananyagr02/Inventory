const express = require('express');
const router = express.Router()
const warehouseController = require('./../controllers/warehouseController')
router.post('/warehousecreate', warehouseController.create);
router.get('/warehouseabout', warehouseController.about);
module.exports = router;             