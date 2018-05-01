// app/routes.js
var mysql = require('mysql');
var dbconfig = require('../config/database.js');

var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		var sqlQuery = "SELECT apple_count, auto_clicker, wheat, house, company, apple_per_s from users where username = '"+req.user.username+"'"
		connection.query(sqlQuery, function(err, rows){
			if(err){
				console.log(err)
			}
			else{
				console.log(rows)
				res.render('profile.ejs', {
					user : req.user,
					apples: rows[0].apple_count,
					autoclicker: rows[0].auto_clicker,
					wheat:rows[0].wheat,
					house:rows[0].house,
					company:rows[0].company,
					applespers:rows[0].apple_per_s
				});
			}
		})
	});

	//Leaderboard

	app.get('/leaderboard', isLoggedIn, function(req, res){
		var sqlQuery = "SELECT username, apple_count AS score FROM users ORDER BY apple_count DESC LIMIT 25;";
		console.log(sqlQuery);
		connection.query(sqlQuery, function(err, rows){
			if(err){
				console.log(err)
			}
			else{
				console.log(rows);
				res.render('leaders.ejs', {
					user:req.user,
					data:rows
				})
			}
		})
	})

	//about PAGE

	app.get('/about', isLoggedIn, function(req, res){
		res.render('about.ejs', {
			user:req.user
		})
	})

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.post('/logout', function(req,res){
		console.log("SAVE and logout CALLED with "+req.body.apple_count)
		var sqlQuery = "update users SET apple_count = "+req.body.apple_count +", auto_clicker = "+req.body.autoclicker+", wheat = "+req.body.wheat+", house = "+req.body.house+", company = "+req.body.company+", apple_per_s ="+req.body.applespers+"  WHERE username = '"+req.user.username+"';"
		connection.query(sqlQuery, function(err,rows){
			if(err){
				console.log(err)
			}
			else{
				req.logout();
				res.redirect('/');
			}
		})
	})


	app.post('/save', function(req,res){
		console.log("SAVE CALLED with "+req.body.apple_count)
		var sqlQuery = "update users SET apple_count = "+req.body.apple_count +", auto_clicker = "+req.body.autoclicker+", wheat = "+req.body.wheat+", house = "+req.body.house+", company = "+req.body.company+", apple_per_s ="+req.body.applespers+"  WHERE username = '"+req.user.username+"';"
		connection.query(sqlQuery, function(err,rows){
			if(err){
				console.log(err)
			}
			else{
				res.render('profile.ejs', {
					user:req.user,
					apples:req.body.apple_count,
					autoclicker:req.body.autoclicker,
					wheat:req.body.wheat,
					house:req.body.house,
					company:req.body.company,
					applespers:req.body.applespers
				})
			}
		})
	})
};



// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
