const express = require('express');
const router = express.Router()
const brandController = require('./../controllers/brandController')
router.post('/brandcreate', brandController.create);
router.get('/brandabout', brandController.about);
router.patch('/brandupdate/:id', brandController.updateBrand);
router.delete('/branddelete/:id',brandController.deleteBrand);
module.exports = router;               