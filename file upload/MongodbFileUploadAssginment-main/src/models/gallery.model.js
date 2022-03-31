
const mongoose = require("mongoose")

const GallerySchema = mongoose.Schema({
    GalleryPic : [{type : String, required : true}],
    user_id : 
    {
        type : mongoose.Schema.Types.ObjectId, 
        ref:"user",
        required : true, 
    },
})

const Gallery1 = mongoose.model("gallery",GallerySchema)

module.exports = Gallery1