const url = require('url');
const mongoose = require('mongoose');
const Brand = require('../models/brandModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');


exports.create=catchAsync(async(req,res)=>{
    try {
        const {brandName}=req.body;
        const brandExist= await Brand.findOne({brandName})
        if(brandExist){
            return res.status(400).json({msg:"Brand already exists"})
        }
        const brandCreated=await Brand.create({brandName})
        res.status(200).json({msg:brandCreated});
    } catch (error) {
        console.log(error)
    }
});

exports.about = catchAsync(async(req, res,next) =>{
    

    // EXECUTE QUERY
    const features = new APIFeatures(Brand.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    const brand = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: "success",
        results: brand.length,
        data:{
            brand
        }
    });

});

exports.updateBrand = catchAsync(async (req,res,next)=>{
    // use patch methods
        const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
            new: true ,// returns the modified document rather than the original
            runValidators: true
        })
        if (!brand) {
            return next(new AppError('No such brand found in inventory', 404));
        }
        res.status(200).json({
            status: "success",
            data:{
                brand
            }
        })
    
    });

exports.deleteBrand =  catchAsync(async (req, res, next)=>{
    
        const brand=await Brand.findByIdAndDelete(req.params.id);
        if (!brand) {
            return next(new AppError('No brand found with that ID', 404));
        }
        res.status(204).json({
            status: "success",
            data: null
        })
    
    })
    



