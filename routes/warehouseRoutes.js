const express = require('express');
const router = express.Router()
const warehouseController = require('./../controllers/warehouseController')
router.post('/warehousecreate', warehouseController.create);
router.get('/warehouseabout', warehouseController.about);
router.patch('/warehouseupdate', warehouseController.updateWarehouse);
router.delete('/warehousedelete',warehouseController.deleteWarehouse);
module.exports = router;             