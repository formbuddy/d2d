exports.processvoter = function(req, Voterlist){
    var id = req.body.id;
    var action = req.body.action;
    var mod;
    if(action == 'verify') {
        mod = 'V';
    }
    else if(action == 'deletion') {
        mod = 'C';
    }
    else if(action == 'modification'){
        mod = 'E';
    }

    Voterlist.findByIdAndUpdate(id, { mod: mod }, { multi:true }, function(err, numAffected){
    });

    var volunteer = req.body.volunteer;
    var d2dstatus = req.body.d2dstatus;
    var wp = req.body.wp;
    var donor = req.body.donor;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var receipt = req.body.receipt;
    var amount = req.body.amount;
    console.log('before' + amount);

    if(action == 'modification'){
        Voterlist.findByIdAndUpdate(id, {
                                            volunteer: volunteer,
                                            d2dstatus: d2dstatus,
                                            wp: wp,
                                            donor: donor,
                                            email: email,
                                            mobile: mobile,
                                            receipt: receipt,
                                            amount: amount
                                        },
                                        { multi:true }, function(err, numAffected){
                                          console.log("error = " + err);
        });
        console.log('update');
    }
    return 1;
};
