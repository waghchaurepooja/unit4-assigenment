
const mongoose = require("mongoose")

const Connectdb = () =>
{
  return mongoose.connect("mongodb+srv://pooja41180:pooja12345@cluster0.jjbeq.mongodb.net/MongodbFileUploadAssignment?retryWrites=true&w=majority")
}

module.exports = Connectdb;