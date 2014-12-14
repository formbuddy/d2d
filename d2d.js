var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var dbConfig = require('./lib/db.js');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

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
app.use(cookieParser());

// Configuring Passport
var passport = require('passport');
var session = require('express-session');
app.use(session({
    secret: 'randomstring',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash
// to store messages in session and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./lib/initPassport.js');
initPassport(passport);

var routes = require('./lib/routes.js')(passport);
app.use('/', routes);

app.listen(app.get('port'), '0.0.0.0', function(){
    console.log('Express started on http://0.0.0.0:' +
    app.get('port') + '; press Ctrl+C to terminate');
});
