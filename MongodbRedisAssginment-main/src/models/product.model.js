
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    ProductName : {type : String, required : true},
    whenToLunch : {type : Date, required : true},
},
{
    versionKey : false,
    timestamps : true,
})

const Product1 = mongoose.model("product", ProductSchema);

module.exports = Product1;