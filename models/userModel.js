const mongoose = require("mongoose")
const schema = mongoose.Schema
var myschema = new schema({
  username: { type: String, trim: true },
  email: { type: String, required: [true, "password is requird"], unique: true },
  password: { type: String, required: true, minlength: [6, "too short password"] },
  passwordChangedAt: Date,
  name: {type: String,trim: true,required: [true, 'name required']},
  profileImage: { type: String, default: "/images/uploads/emoji-avatar-thumb-768x810.png" },
  role: { type: String, enum: ["user", "helper", "admin"], default: "user" },
  friends: [{
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  }],
  friendRequests: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: true
    },
    requestedAt: {
      type: Date,
      default: Date.now
    }
  }],
  sentFriendRequests:  [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: true
    },
    requestedAt: {
      type: Date,
      default: Date.now
    }
  }],
  balance: Number,
  uniqueString: String,
  verified: { type: Boolean, default: false },
}, { timestamps: true });









var Mymodel = mongoose.model('user', myschema);
module.exports = Mymodel















