const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 5},
    firstName:{type: String, required: true},
    lastName: {type: String, required: true},
    companyName: {type: String},
    webMaster: {type: Boolean},
    associatedVessels: [String]
});

module.exports = User = mongoose.model("user", userSchema);