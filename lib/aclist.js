var Aclist = require('../models/aclist.js');
var Voterlist = require('../models/voterlist.js');
var async = require('async');

exports.printACs = function(res, isAdmin){
    Aclist.find({}, function(err, acs){
        var context;
        async.map(acs, function(ac, next){
          Voterlist.count({acno: ac.acno}, function(err, count){
            next(err,{
                acno: ac.acno,
                name: ac.name,
                count: count
            });
          });
        },
        function(err, acs){
          console.log('getting here');
          context = {
            admin: isAdmin,
            acs: acs
          };
          res.render('aclist', context);
        });
    });
}
