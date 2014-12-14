var mongoose = require('mongoose');

var aclistSchema = mongoose.Schema({
    acno      : Number,
    name      : String
}, { collection: 'ac'});

var Aclist = mongoose.model('Aclist', aclistSchema);
module.exports = Aclist;
