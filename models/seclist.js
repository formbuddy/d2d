var mongoose = require('mongoose');

var seclistSchema = mongoose.Schema({
    acno      : Number,
    acname    : String,
    partno    : Number,
    partname  : String,
    secno     : Number,
    secname   : String
}, { collection: 'section'});

var Seclist = mongoose.model('Seclist', seclistSchema);
module.exports = Seclist;
