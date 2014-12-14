var Seclist = require('../models/seclist.js');

exports.printSecs = function(res, acno, partno){
    Seclist.find({acno: acno, partno: partno}, function(err, secs){
    //    console.log("found" + parts);
        console.log("error = " + err);
        var context = {
            secs: secs.map(function(sec){
                return {
                    acno: sec.acno,
                    acname: sec.acname,
                    partno: sec.partno,
                    partname: sec.partname,
                    secno : sec.secno,
                    secname: sec.secname
                };
            })
        }
        res.render('seclist', context);
    });
}
