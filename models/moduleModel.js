const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
    module: { type: String ,trim:true },
    moduleImage:String,

},{timestamps:true});






var Mymodel = mongoose.model('Module', myschema);
module.exports = Mymodel