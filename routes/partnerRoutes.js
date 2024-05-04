const express = require('express');
const router = express.Router()
const partnerController = require('./../controllers/partnerController')
router.post('/partnercreate', partnerController.create);
router.get('/getAllPartners', partnerController.getAllPartners);
router.patch('/partnerupdate/:id', partnerController.updatePartner);
router.delete('/partnerdelete/:id',partnerController.deletePartner);
router
.route('/:identifier')
.get(partnerController.getPartnerByIdOrNameOrBrand);
module.exports = router;                         