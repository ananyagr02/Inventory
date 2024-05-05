const url = require('url');
const mongoose = require('mongoose');
const Warehouse = require('../models/warehouseModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.create=catchAsync(async(req,res)=>{
    try {
        const {warehouseCompany,warehouseId,warehouseAddress,partnerId}=req.body;
        const warehouseExist= await Warehouse.findOne({warehouseId})
        if(warehouseExist){
            return res.status(400).json({msg:"Warehouse already exists"})
        }
        const warehouseCreated=await Warehouse.create({warehouseCompany,warehouseId,warehouseAddress,partnerId})
       
        res.status(200).json({msg:warehouseCreated,warehouseCompany, warehouseId});
    } catch (error) {
        console.log(error)
    }
});

exports.about = catchAsync(async(req, res,next) =>{
    

    // EXECUTE QUERY
    const features = new APIFeatures(Warehouse.find().populate('partnerId'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    const warehouse = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: "success",
        results: warehouse.length,
        data:{
            warehouse
        }
    });

});

exports.updateWarehouse = catchAsync(async (req,res,next)=>{
    // use patch methods
        const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, {
            new: true ,// returns the modified document rather than the original
            runValidators: true
        })
        if (!warehouse) {
            return next(new AppError('No such warehouse found in inventory', 404));
        }
        res.status(200).json({
            status: "success",
            data:{
                warehouse
            }
        })
    
    });

exports.deleteWarehouse =  catchAsync(async (req, res, next)=>{
    
        const warehouse=await Warehouse.findByIdAndDelete(req.params.id);
        if (!warehouse) {
            return next(new AppError('No warehouse found with that ID', 404));
        }
        res.status(204).json({
            status: "success",
            data: null
        })
    
    })
    
