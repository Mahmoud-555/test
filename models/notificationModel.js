const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['invitation','info', 'warning', 'error'], // Example types
        default: 'info'
    },
    avatar: String,
    href: String,
    isRead: {
        type: Boolean,
        default: false
    },
   
    time: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });




var Mymodel = mongoose.model('notification', myschema);
module.exports = Mymodel