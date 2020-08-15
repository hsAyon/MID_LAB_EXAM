var express 	= require('express');
var exSession 	= require('express-session');
var bodyParser 	= require('body-parser');
var session = require('express-session');
var validator = require('express-validator');
const cookieParser = require('cookie-parser');
var app = express();

var login = require('./controllers/login');
var admin = require('./controllers/admin');


app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'secret', saveUninitialized: false, resave: false}));


app.use('/login',login);
app.use('/admin',admin);


app.use(function (req, res, next) {
    res.locals.username = req.session.username;
    res.locals.usertype = req.session.usertype;
    res.locals.userid = req.session.userid;
    next();
});
  
app.listen(3000, function(){
    console.log('express http server started at...3000');
});

//ROOT
app.get('/', function(req, res){
    res.redirect('/login');
});

