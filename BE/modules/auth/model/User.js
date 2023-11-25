const mongoose = require('mongoose')

const {Schema} = mongoose;

const userSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    password: String,
    date: {type: Date, default: Date.now},
});
module.exports = mongoose.model('User', userSchema);

