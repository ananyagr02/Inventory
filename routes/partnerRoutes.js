const express = require('express');
const router = express.Router()
const partnerController = require('./../controllers/partnerController')
router.post('/partnercreate', partnerController.create);
router.get('/partnerabout', partnerController.about);
module.exports = router;                         