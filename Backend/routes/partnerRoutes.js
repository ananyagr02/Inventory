const express = require('express');
const router = express.Router()
const partnerController = require('./../controllers/partnerController')
router.post('/partnerabout', partnerController.pabout);
module.exports = router;