var mongoose = require('mongoose');

var voterlistSchema = mongoose.Schema({
  acno      : Number,
  partno    : Number,
  sno       : Number,
  ename     : String,
  sex       : String,
  rname     : String,
  rtype     : String,
  age       : Number,
  idno      : String,
  status    : String,
  section   : Number,
  houseno   : String,
  mod       : String,
  mobile    : String,
  email     : String,
  d2dstatus : String,
  volunteer : String,
  wp        : String,
  donor     : String,
  amount    : Number,
  receipt   : String
}, { collection: 'voterlist'});

var Voterlist = mongoose.model('Voterlist', voterlistSchema);
module.exports = Voterlist;
