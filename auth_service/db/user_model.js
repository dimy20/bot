const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    username: {
      type: String,
      required: [true,"username is required"],
      minlength: [5,`username can not be shorter than 8`],
      maxlength: [50,`username exceeds maximum allowed (50)`]
    },
  email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    /*
    password: {
      type: String,
      minlength: 5,
      maxlength: 255,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    }, */
  });
  const user_model = mongoose.model("User",user_schema);
  module.exports ={user_model};