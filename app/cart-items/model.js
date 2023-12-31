const mongoose = require('mongoose');
const {model,Schema} = mongoose;

const cartItemsSchema=Schema({
    name:{
        type:String,
        minLength:[5,'Panjang Nama Makanan Minimal 5 karakter'],
        required: [true,'nama Harus ada']
    },
    qty:{
        type:Number,
        required:[true,'qty Harus ada'],
        min: [1,'minimal qty 1']
    },
    price:{
        type:Number,
        default:0
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }

});

const CartItems =  mongoose.model('cartItem',cartItemsSchema);

module.exports = CartItems;