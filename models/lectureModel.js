const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
    lecture: { type: String ,trim:true },
    lectureImage:String,
    questionNum:Number,
    subject:String,
    module:String,


},{timestamps:true});






var Mymodel = mongoose.model('lecture', myschema);
module.exports = Mymodel