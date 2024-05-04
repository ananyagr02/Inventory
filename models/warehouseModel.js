const mongoose = require('mongoose')
const slugify = require('slugify');
const validator = require('validator');
const warehouseSchema = new mongoose.Schema({
    warehouseCompany: {
        type: String,
        required: [true, 'Please enter the warehouse company!']
    },
    warehouseCode:{
        type: String,
        required: [true, 'Please tell us warehouse code!']
    },
    warehouseAddress: {
        // brand
        // id from warehouse table
        street: {
        type: String,
        //   required: true
        },
        city: {
        type: String,
        //   required: true
        },
        state: {
        type: String,
        //   required: true
        },
        pinCode: {
        type: String,
        //   required: true
        }
    },
    partnerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner'
    }]
})

const Warehouse= mongoose.model("Warehouse", warehouseSchema)
module.exports =Warehouse;
