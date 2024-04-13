const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        unique: [true, "Product name should be unique"],
        maxLength: [40, "Product name should be less than 40 characters"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        validate:{
        validator:function(){
        return this.price > 0
        },
        message: "Price should be greater than 0"
        }
    },
    categories:{
        required:true,
        type: [String]
    },
    images:{
        type:[String]
    },
    averageRating:Number,
    discount:{
        type:Number,
        validate:{
        validator:function(){
        return this.discount < this.price
        },
        message:"Discount should be less than price"
        }
    },
    description:{
        type:String,
        required:[true,'Please provide description'],
        maxLength:[200,'Description should be less than 200 characters']
    },
    stock:{
        type:Number,
        required:[true,'Please provide stock'],
        validate:{
            validator:function(){
            return this.stock >= 0
            },
            message:"Stock should be greater than 0"
        }
    },
    brand:{
        type:String,
        required:[true,'Please provide brand']
    },
        
});

// for model.findByIdAndUpdate
ProductSchema.pre('findOneAndUpdate', function(next){
    console.log("product schema findOneAndUpdate  hook");
    if(this.price > 0){
        next()
    }else{
        return next('Price must be greater than zero');
    }
})

const ProductModal = mongoose.model('Products', ProductSchema);

module.exports = ProductModal;