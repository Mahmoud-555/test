const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
    grade: { type: String ,trim:true },
    gradeImage:String
},{timestamps:true});






var Mymodel = mongoose.model('grades', myschema);
module.exports = Mymodel