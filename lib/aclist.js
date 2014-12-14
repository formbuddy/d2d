var Aclist = require('../models/aclist.js');

exports.printACs = function(res){
    Aclist.find({}, function(err, acs){
        console.log("found" + acs);
        console.log("error = " + err);
        var context = {
            acs: acs.map(function(ac){
                    return {
                        acno: ac.acno,
                        name: ac.name
                    };
                })
            }
        res.render('aclist', context);
    });
}
