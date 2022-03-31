
const mongoose = require("mongoose");

const Connectdb = () =>
{
    return mongoose.connect("mongodb+srv://pooja123:pooja123@cluster0.jjbeq.mongodb.net/MongodbRedis?retryWrites=true&w=majority");
}

module.exports = Connectdb;