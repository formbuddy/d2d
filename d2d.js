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

var ConnectRoles = require('connect-roles');
var user = new ConnectRoles({
  failureHandler: function (req, res, action) {
    // optional function to customise code that runs when
    // user fails authorisation
    var accept = req.headers.accept || '';
    res.status(403);
    res.send('Access Denied - You don\'t have permission to: ' + action);
  }
});
app.use(user.middleware());


//admin users can access all pages
user.use(function (req) {
  if (req.user.role === 'admin') {
    return true;
  }
});

var routes = require('./lib/routes.js')(passport, user);
app.use('/', routes);

app.listen(app.get('port'), '0.0.0.0', function(){
    console.log('Express started on http://0.0.0.0:' +
    app.get('port') + '; press Ctrl+C to terminate');
});
