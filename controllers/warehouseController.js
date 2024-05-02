const Warehouse = require('../models/warehouseModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.about=catchAsync(async(req,res)=>{
    try {
        const {warehouseCompany,warehouseId,warehouseAddress}=req.body;
        const warehouseExist= await Warehouse.findOne({warehouseId})
        if(warehouseExist){
            return res.status(400).json({msg:"Warehouse already exists"})
        }
        const warehouseCreated=await Warehouse.create({warehouseCompany,warehouseId,warehouseAddress})
        res.status(200).json({msg:warehouseCreated});
    } catch (error) {
        console.log(error)
    }
});
