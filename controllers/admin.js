var express = require('express');
var admin = require.main.require('./models/admin');
var router = express.Router();
const { check, validationResult } = require('express-validator');


//root
router.get('/', function(req, res){
    admin.userCount(function(userCount){
        admin.empCount(function(empCount){
            res.render('admin', {userCount: userCount[0].count, empCount: empCount[0].count});
        });
    });
});

//addEmp
router.get('/addEmp', function(req, res){
    var form = {
        name: req.body.name,
        username: req.body.username,
        phone: req.body.phone,
        gender: req.body.gender,
        designation: req.body.designation,
    };
    var valError = [];

    res.render('addEmp',{form:form, valError:valError});
});

router.post('/addEmp', [
    check('name','Name required!').notEmpty(),
    check('username').notEmpty().withMessage('Username required!').isLength({min: 8}).withMessage('Username must be atleast 8 characters!'),
    check('password').notEmpty().withMessage('Password required!').isLength({min: 8}).withMessage('Password must be atleast 8 characters!').custom((value,{req, loc, path}) => {
        if (value != req.body.cPassword) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }),
    check('phone').notEmpty().withMessage('Phone number required!').isNumeric().withMessage('Phone number must be numeric!').isLength({min: 11, max: 11}).withMessage('Phone number must be 11 characters!'),
    check('gender','Gender required!').notEmpty(),
], function(req, res){
    
    var form = {
        name: req.body.name,
        phone: req.body.phone,
        username: req.body.username,
        gender: req.body.gender,
        designation: req.body.designation,
    };
    
    var valError = [];

    validationResult(req).errors.forEach(error => {
        valError.push(error.msg);
    });

    if(valError.length > 0){
        res.render('addEmp',{form, valError});
    } else {
        admin.addEmp(req.body.name, req.body.username, req.body.password, req.body.phone, req.body.gender, req.body.designation, function(result){
            res.redirect('/allemplist');
        });
    }
});

module.exports = router;