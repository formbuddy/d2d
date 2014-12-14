var mongoose = require('mongoose');

var partlistSchema = mongoose.Schema({
    acno      : Number,
    acname    : String,
    partno    : Number,
    partname  : String
}, { collection: 'part'});

var Partlist = mongoose.model('Partlist', partlistSchema);
module.exports = Partlist;
