var Voter = require('../models/newvoter.js');

exports.addvoter = function(req){
  var acno = req.body.acno;
  var section = req.body.section;
  var partno = req.body.partno;
  var name = req.body.name;
  var mobile = req.body.mobile;
  var houseno = req.body.houseno;

  console.log("acno = " + acno + "name = " + name);

  var newvoter = new Voter({
      acno: acno,
      section: section,
      partno: partno,
      name: name,
      mobile: mobile,
      houseno: houseno
  });
  newvoter.save(function(err, data){
    if(err){
      console.log("Error while creating new voter: " +err)
    }
    else{
      return 1;
    }
  })
};
