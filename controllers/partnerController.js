const url = require('url');
const mongoose = require('mongoose');
const Partner = require('../models/partnerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');


exports.create=catchAsync(async(req,res)=>{
    try {
        const {name,email,phoneNumber,role,partnerId}=req.body;
        const partnerExist= await Partner.findOne({email})
        if(partnerExist){
            return res.status(400).json({msg:"Partner already exists"})
        }
        const partnerCreated=await Partner.create({name,email,phoneNumber,role,partnerId})
        res.status(200).json({msg:partnerCreated});
    } catch (error) {
        console.log(error)
    }
});   

exports.getAllPartners = catchAsync(async(req, res,next) =>{
    

    // EXECUTE QUERY
    const features = new APIFeatures(Partner.find().populate('brandId'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    const partners= await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: "success",
        results: partners.length,
        data:{
            partners
        }
    });

});

exports.getPartnerByIdOrNameOrBrand = catchAsync(async (req, res, next) => {
    const { identifier } = req.params;

    let partners;

    // Check if the identifier is a valid MongoDB ObjectID
    if (mongoose.Types.ObjectId.isValid(identifier)) {
        // If it's a valid ObjectID, fetch the partner by ID
        const partnerById = await Partner.findById(identifier).populate('brandId');
        if (partnerById) {
            // If a partner is found by ID, return it
            return res.status(200).json({
                status: 'success',
                data: {
                    partner: partnerById
                }
            });
        }
    }

    // If it's not a valid ObjectID or no partner found by ID, assume it's a name or brand
    // Fetch partners by name or brand
    partners = await Partner.find({
        $or: [
            { partner_name: { $regex: new RegExp(identifier, 'i') } }, // Match partner_name
            { brandName: { $regex: new RegExp(identifier, 'i') } }      // Match brandName (if applicable)
        ]
    }).populate('brandId');

    if (!partners || partners.length === 0) {
        return next(new AppError('No partners found with the given ID, name, or brand', 404));
    }

    res.status(200).json({
        status: 'success',
        results: partners.length,
        data: {
            partners
        }
    });
});

exports.updatePartner = catchAsync(async (req,res,next)=>{
    // use patch methods
        const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
            new: true ,// returns the modified document rather than the original
            runValidators: true
        })
        if (!partner) {
            return next(new AppError('No such partner found in inventory', 404));
        }
        res.status(200).json({
            status: "success",
            data:{
                partner
            }
        })
    
    });

exports.deletePartner =  catchAsync(async (req, res, next)=>{
    
        const partner=await Partner.findByIdAndDelete(req.params.id);
        if (!partner) {
            return next(new AppError('No partner found with that ID', 404));
        }
        res.status(204).json({
            status: "success",
            data: null
        })
    
    })
    