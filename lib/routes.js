var express = require('express');
var router = express.Router();
var Voterlist = require('../models/voterlist.js');
var aclist = require('./aclist.js');
var partlist = require('./partlist.js');
var seclist = require('./seclist.js');
var pv = require('./processvoter.js');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()) {
        return next();
    }
        // if the user is not authenticated then redirect him to the login page
        res.redirect('/');
}

module.exports = function(passport){

    /* GET login page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/aclist',
        failureRedirect: '/',
        failureFlash : true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res){
        res.render('register',{ message: req.flash('message') });
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res){
        res.render('home', { user: req.user });
    });

    router.get('/aclist', isAuthenticated, function(req, res){
        aclist.printACs(res);
    });

    router.get('/ac/:acno', isAuthenticated, function(req, res){
        var acno = req.params.acno;
        partlist.printParts(res, acno);
    });

    router.get('/ac/:acno/:partno', isAuthenticated, function(req, res){
        var acno = req.params.acno;
        var partno = req.params.partno;
        seclist.printSecs(res, acno, partno);
    });

    router.get('/ac/:acno/:partno/:secno/voterlist', isAuthenticated, function(req, res){
        var acno = req.params.acno;
        var partno = req.params.partno;
        var secno = req.params.secno;
        Voterlist.find({acno: acno, partno: partno, section: secno}, function(err, voters){
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

    router.post('/process', isAuthenticated, function(req, res){
        var status = pv.processvoter(req, Voterlist);
        res.send("Done");
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}
