const Brand = require('../models/brandModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.about=catchAsync(async(req,res)=>{
    try {
        const {brandName}=req.body;
        const brandExist= await Warehouse.findOne({brandName})
        if(brandExist){
            return res.status(400).json({msg:"Brand already exists"})
        }
        const brandCreated=await Warehouse.create({brandName})
        res.status(200).json({msg:brandCreated});
    } catch (error) {
        console.log(error)
    }
});



