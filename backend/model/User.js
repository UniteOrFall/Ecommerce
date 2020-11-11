const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id:{
        type: String
    },
    title:{
        type: String
    },
    color: {
        type: String
    },
    price:{
        type: String
    },
    product_type:{
        type: String
    },
    quantity:{
        type: String
    },
    size:{
        type: String
    }
})

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type:String,
    },
    cart: {
        type:[cartSchema]
    }
  });
  
  module.exports = User = mongoose.model('user', UserSchema);
  