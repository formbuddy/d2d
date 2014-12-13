var express = require('express');
var pv = require('./lib/processvoter.js');

var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
mongoose.connect('mongodb://localhost/d2d', opts);
var Voterlist = require('./models/voterlist.js');

// Authentication module.
var auth = require('http-auth');
var basic = auth.basic({
  realm: "Restricted area",
  file: __dirname + "/../users.htpasswd" // gevorg:gpass, Sarah:testpass ...
});


var app = express();
var bodyParser = require('body-parser');
app.use(auth.connect(basic));


//setup handlebars and view engine
var handlebars = require('express-handlebars')
                 .create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/voterlist', function(req, res){
    Voterlist.find({}, function(err, voters){
        var context = {
            voters: voters.map(function(voter){
                var rowclass = '';
                if(voter.mod == 'V') {
                    rowclass = 'success';
                }
                else if(voter.mod == 'C'){
                    rowclass = 'danger';
                }
                else if(voter.mod == 'E'){
                    rowclass = 'warning';
                }

                var supporter;
                if(voter.d2dstatus == 'S'){
                  supporter = 1;
                }
                var neutral;
                if(voter.d2dstatus == 'N'){
                  neutral = 1;
                }
                var antagonist;
                if(voter.d2dstatus == 'A'){
                  antagonist = 1;
                }

                var volunteer;
                if(voter.volunteer == 'Y'){
                  volunteer = 1;
                }
                var donor;
                if(voter.donor == 'Y'){
                  donor = 1;
                }
                var wp;
                if(voter.wp == 'Y'){
                  wp = 1;
                }

                return {
                    id       : voter._id,
                    sno      : voter.sno,
                    ename    : voter.ename,
                    houseno  : voter.houseno,
                    rowclass : rowclass,
                    supporter : supporter,
                    neutral  : neutral,
                    antagonist : antagonist,
                    volunteer : volunteer,
                    donor : donor,
                    wp : wp,
                    mobile: voter.mobile,
                    email: voter.email,
                    receipt: voter.receipt,
                    amount: voter.amount
                }
            })
        };
        res.render('voterlist', context);
    });
});

app.post('/process', function(req, res){
    var status = pv.processvoter(req, Voterlist);
    res.send("Done");
});

app.listen(app.get('port'), '0.0.0.0', function(){
    console.log('Express started on http://0.0.0.0:' +
    app.get('port') + '; press Ctrl+C to terminate');
});
