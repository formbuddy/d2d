var Partlist = require('../models/partlist.js');

exports.printParts = function(res, acno){
    Partlist.find({acno: acno}, function(err, parts){
        console.log("found" + parts);
        console.log("error = " + err);
        var context = {
            parts: parts.map(function(part){
                return {
                    acno: part.acno,
                    acname: part.acname,
                    partno: part.partno,
                    partname: part.partname
                };
            })
        }
        res.render('partlist', context);
    });
}
