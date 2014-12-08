var express = require('express');

var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
mongoose.connect('mongodb://localhost/d2d', opts);
var Voterlist = require('./models/voterlist.js');

var app = express();

//setup handlebars and view engine
var handlebars = require('express-handlebars')
                 .create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/voterlist', function(req, res){
    Voterlist.find({}, function(err, voters){
        var context = {
            voters: voters.map(function(voter){
                return {
                    sno     : voter.sno,
                    ename   : voter.ename,
                    houseno : voter.houseno
                }
            })
        };
        res.render('voterlist', context);
    });
});

app.listen(app.get('port'), '0.0.0.0', function(){
    console.log('Express started on http://0.0.0.0:' +
    app.get('port') + '; press Ctrl+C to terminate');
});
