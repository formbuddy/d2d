var Partlist = require('../models/partlist.js');

exports.printParts = function(res, acno){
    Partlist.find({acno: acno}, function(err, parts){
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
