const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
    block: { type: String ,trim:true },
    abbreviation:{ type: String ,trim:true },
    blockImage:String
},{timestamps:true});





var Mymodel = mongoose.model('block', myschema);
module.exports = Mymodel