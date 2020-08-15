const { each } = require('async');
const { render } = require('ejs');
var express = require('express');
var login = require.main.require('./models/login');
var router = express.Router();
const { check, validationResult } = require('express-validator');

//Root
router.get('/',[], function (req, res){

    if (req.session.username){
        if (req.session.usertype == 'admin'){
            res.redirect('/admin');
        } else if (req.session.usertype == 'employee'){
            res.redirect('/employee');
        } else {
            res.render('login',{valError:[]});
        }
    } else {
    res.render('login',{valError:[]});
    }
});

router.post('/', [
    check('username','Username cannot be empty!').not().isEmpty(),
    check('password','Password cannot be empty!').not().isEmpty(),
] , function (req, res){

    var username = req.body.username;
    var password = req.body.password;
    
    var valError = [];
    validationResult(req).errors.forEach(e => {
        valError.push(e.msg);
    });

    if(valError.length > 0){
        res.render('login',{valError});
    } else {
        login.auth(username,password, function(auth){
            if(auth.length > 0){
                req.session.username = auth[0].username;
                req.session.usertype = auth[0].type;
                req.session.userid = auth[0].ID;
                res.redirect('/'+auth[0].type);
            }
            else {
                valError.push('Invalid credentials!');
                res.render('login',{valError});
            }
        });
    }
});

module.exports = router;