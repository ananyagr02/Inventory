const Partner = require('../models/partnerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.pabout=catchAsync(async(req,res)=>{
    try {
        const {name,email,phoneNumber,role,brandId}=req.body;
        const partnerExist= await Partner.findOne({email})
        if(partnerExist){
            return res.status(400).json({msg:"Partner already exists"})
        }
        const partnerCreated=await Partner.create({name,email,phoneNumber,role,brandId})
        res.status(200).json({msg:partnerCreated});
    } catch (error) {
        console.log(error)
    }
});