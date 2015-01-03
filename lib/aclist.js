var Aclist = require('../models/aclist.js');
var Acstats = require('../models/acstats.js');
var async = require('async');

exports.printACs = function(res, isAdmin){
    Aclist.find({}, function(err, acs){
        var context;
        async.map(acs, function(ac, next){
          Acstats.findOne({_id: ac.acno}, function(err, stat){

              var verified = 0;
              var deletion = 0;
              var correction = 0;
              var supporter = 0;
              var antagonist = 0;
              var neutral = 0;
              var processed = 0;
              var total = 0;

              var sv;
              
              if(stat){
                  sv = stat.value;
                  verified = sv.verified;
                  deletion = sv.deletion;
                  correction = sv.correction;
                  supporter = sv.supporter;
                  antagonist = sv.antagonist;
                  neutral = sv.neutral;
                  processed = sv.processed;
                  total = sv.total;
              }

              next(err,{
                  acno: ac.acno,
                  name: ac.name,
                  verified: verified,
                  deletion: deletion,
                  correction: correction,
                  supporter: supporter,
                  antagonist: antagonist,
                  neutral: neutral,
                  processed: processed,
                  total: total
            });
          });
        },
        function(err, acs){
          context = {
            admin: isAdmin,
            acs: acs
          };
          res.render('aclist', context);
        });
    });
}
