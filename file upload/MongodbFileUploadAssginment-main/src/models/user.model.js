
const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: false },
  profile_pic: { type: String, required: true },
},
{
  timestamps: true,
  versionKey: false,
});

const User1 = mongoose.model("user",UserSchema)

module.exports = User1