const Partner = require('../models/partnerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.create=catchAsync(async(req,res)=>{
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

exports.about = catchAsync(async(req, res,next) =>{
    

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