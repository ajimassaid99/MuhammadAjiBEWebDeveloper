const Product = require('../products/model');
const CartItems = require('../cart-items/model');

const updateCart = async(req,res,next)=>{
    try{
        const {items} = req.body;
        const productIds = items.map(item=>item.product);
        const products = await Product.find({_id:{$in:productIds}});
        let cartItems = items.map(item=>{
            let relatedProduct = products.find(product => product._id.toString() === item.product);
            return{
                product:relatedProduct,
                qty: item.qty,
                name:relatedProduct.name,
                price:relatedProduct.price
            }
        });
        await CartItems.deleteMany();
        await CartItems.bulkWrite(cartItems.map(item=>{
            return{
                updateOne:{
                    filter:{
                        product:item.product
                    },
                    update:item,
                    upsert:true
                }
            }
        }));
        return res.json(cartItems)
    }catch(e){
        if(e && e.name === 'ValidationError'){
            return res.json({
                error:1,
                message:e.message,
                fields: e.errors
            })
        }
        next(e);

    }
}

const getCart = async(req,res,next)=>{
    try{
        let items= 
            await CartItems
            .find()
            .populate('product');
        return res.json({items});
    }catch(e){
        if(e && e.name === 'ValidationError'){
            return res.json({
                error:1,
                message:e.message,
                fields: e.errors
            })
        }
        next(e);
    }
}

module.exports = {
    updateCart,
    getCart
}
