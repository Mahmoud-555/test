const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'user',
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'user',
    },
    message: {
        type: String,
        // required: true,
    },
    type: {
        type: String,
        enum: ['invitation',"mention", "friend request",'info',"comment", 'warning', 'error'], // Example types
        default: 'info'
    },
    friendRequestStatus: {
        type: String,
        enum: ['Pending', "accepted",'declined'], // Example types
        default: 'Pending'
    }    
    ,
    avatar: String,
    href: String,
    isRead: {
        type: Boolean,
        default: false
    },
   
    time: {
        type: Date,
        default: Date.now
    },
    active:{
        type:Boolean,
        default:true
    }
}, { timestamps: true });




var Mymodel = mongoose.model('notification', myschema);
module.exports = Mymodel