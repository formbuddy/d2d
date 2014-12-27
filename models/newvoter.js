var mongoose = require('mongoose');

module.exports = mongoose.model('Newvoter',{
    acno: Number,
    partno: Number,
    section: Number,
    houseno: String,
    name: String,
    mobile: String
});
