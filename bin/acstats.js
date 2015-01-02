var dbConfig = require('../lib/db.js');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);
var o = require('../lib/acstatsmr.js');
var Voterlist = require('../models/voterlist.js');

Voterlist.mapReduce(o, function (err, model, stats) {
  console.log('map reduce took %d ms', stats.processtime);
  process.exit();
});
