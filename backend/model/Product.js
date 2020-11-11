const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    cloth_type:{
        type: String,
        enum: ["Tshirt","Polo","mug","couple"],
        required: true
    },
    image:{
        type: [String],
}, 
    colors:{
        red: {
            type: Boolean,
            default: false
        },
        blue: {
            type: Boolean,
            default: false
        },
        yellow:{
            type:Boolean,
            default: false
        },
        white:{
            type: Boolean,
            default: false
        }
    }, 
    red_image:{
        type: [String],
        required: true
},
    blue_image:{
        type: [String],
        required: true
},
    white_image:{
        type: [String],
        required: true
},
    black_image:{
        type: [String],
        required: true
},
    yellow_image:{
        type: [String],
        required: true
}
  });
  
  module.exports = Product = mongoose.model('product', ProductSchema);
  