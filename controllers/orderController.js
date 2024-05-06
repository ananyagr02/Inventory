const url = require('url');
const mongoose = require('mongoose');
const Order = require('./../models/orderModel')
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
exports.getAllOrders =catchAsync(async(req, res,next)=>  {
    

        // EXECUTE QUERY
        const features = new APIFeatures(Order.find().populate('partner_Id'), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
        const orders = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: "success",
            results: orders.length,
            data:{
                orders
            }
        });
});

    
    
    


// exports.getOrder =catchAsync(async(req, res,next) =>{
    
//         console.log(req.query);
//         console.log(req.method, req.url);
//         // console.log(req)
//     const order = await Order.findById(req.params.id).populate('partner_Id');
//     res.status(200).json({
//         status: "success",
//         data:{
//             order
//         }
//     })
// }

exports.getOrderByIdOrTypeOrPartner = catchAsync(async (req, res, next) => {
    const { identifier } = req.params;

    let orders;

    // Check if the identifier is a valid MongoDB ObjectID
    if (mongoose.Types.ObjectId.isValid(identifier)) {
        // If it's a valid ObjectID, fetch the order by ID
        const orderById = await Order.findById(identifier).populate('partner_Id');
        if (orderById) {
            // If a order is found by ID, return it
            return res.status(200).json({
                status: 'success',
                data: {
                    order: orderById
                }
            });
        }
    }

    // If it's not a valid ObjectID or no order found by ID, assume it's a name or brand
    // Fetch orders by name or brand
    orders = await Order.find({
        $or: [
            { orderType: { $regex: new RegExp(identifier, 'i') } }, // Match order_name
            { partner_Id: { $regex: new RegExp(identifier, 'i') } }      // Match brandName (if applicable)
        ]
    }).populate('partner_Id');

    if (!orders || orders.length === 0) {
        return next(new AppError('No orders found with the given ID, type, or partner', 404));
    }

    res.status(200).json({
        status: 'success',
        results: orders.length,
        data: {
            orders
        }
    });
});



exports.createOrder =catchAsync(async(req, res,next)=>{
    
const newOrder = await Order.create(req.body)
    // req.body passed in the body of post request
    // console.log("printed")
    res.status(201).json({
        status:"success",
        data:{
            order:newOrder}
        })
    
});
    

exports.updateOrder =catchAsync(async(req, res,next)=>{
// use patch methods
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true ,// returns the modified document rather than the original
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            data:{
                order
            }
        })
    })
   
exports.deleteOrder =catchAsync(async(req, res,next)=>{

    const order=await Order.findByIdAndDelete(req.params.id);
    if (!order)
        {
            return next(new AppError('No order forund with that id',404));
        }
        res.status(204).json({
            status: "success",
            data: null
        })
    });


    exports.summarizeOrdersByMonthAndType = async (req, res) => {
        try {
            const { orderType } = req.body; // Extract the order type from query parameters
            const currentMonth = new Date().getMonth() + 1; // Get the current month
            
            // Query to summarize orders by month and order type
        const summary = await Order.aggregate([
            {
                $match: {
                    orderType: orderType, // Match orders with the specified order type
                    orderDate: { $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1),
                         $lt: new Date(new Date().getFullYear(), currentMonth, 1) } // Match orders for the current month
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$orderDate' }, type: '$orderType' }, // Group by month and order type
                    totalOrders: { $sum: 1 }, // Count the number of orders
                    totalAmount: { $sum: '$paymentAmount' } // Calculate the total order amount
                }
            }
        ]);
    
        res.status(200).json(summary); // Return the summary directly
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    };
    
