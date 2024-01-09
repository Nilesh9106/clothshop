const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Slug: { type: String, required: true, unique: true },
    Desc : {type:String ,required:true},
    Img : {type:String ,required:true},
    Category : {type:String ,required:true},
    Size : {type:String },
    Color : {type:String },
    Price : {type:Number ,required:true},
    AvailableQty : {type:Number ,required:true},
    
}, { timestamps: true });

mongoose.models = {}

export default mongoose.model('Product', ProductSchema);