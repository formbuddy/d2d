var mongoose = require('mongoose');

var acstatsSchema = mongoose.Schema({
    _id       : Number,
    value     : {
                    verified: Number,
                    deletion: Number,
                    correction: Number,
                    supporter: Number,
                    antagonist: Number,
                    neutral: Number,
                    processed: Number,
                    total: Number
                }
}, { collection: 'acStats'});

var Acstats = mongoose.model('Acstats', acstatsSchema);
module.exports = Acstats;
