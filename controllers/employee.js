var express = require('express');
var employee = require.main.require('./models/employee');
var router = express.Router();
var fileUpload = require('express-fileupload');
const { check, validationResult } = require('express-validator');


//root
router.get('/', function(req, res){
    res.render('employee');
});

//myprofile
router.get('/myprofile', function (req, res){
    employee.getEmp(req.session.userid, function(results){
        console.log(results);
        res.render('myprofile',{employee: results});
    });
});

//update
router.get('/update', function (req, res){
    
    uID = req.session.userid;

    employee.getEmp(uID, function (result){
        var form = {
            name: result.name,
            username: result.username,
            phone: result.phone,
            gender: result.gender,
            designation: result.designation,
        };
        
        var valError = [];

        res.render('updateEmp2',{form, valError, employee: result});
    });    
});

router.post('/update',[
    check('name','Name required!').notEmpty(),
    check('username').notEmpty().withMessage('Username required!').isLength({min: 8}).withMessage('Username must be atleast 8 characters!'),
    check('password').optional({checkFalsy: true}).isLength({min: 8}).withMessage('Password must be atleast 8 characters!').custom((value,{req, loc, path}) => {
        if (value != req.body.cPassword) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }),
    check('phone').notEmpty().withMessage('Phone number required!').isNumeric().withMessage('Phone number must be numeric!').isLength({min: 11, max: 11}).withMessage('Phone number must be 11 characters!'),
    check('gender','Gender required!').notEmpty(),
], function (req, res){
    
    uID = req.session.userid;

    employee.getEmp(uID, function (result){
        var form = {
            name: req.body.name,
            username: req.body.username,
            phone: req.body.phone,
            gender: req.body.gender,
            designation: req.body.designation,
        };
        var password = req.body.password;

        if(req.body.password == ''){
            password = result.password;
        }

        var valError = [];
    
        validationResult(req).errors.forEach(error => {
            valError.push(error.msg);
        });
        //console.log(req);
        var picture = req.files.picture;
        console.log(req.files.picture);
        if(req.files.picture){
            if (valError.length > 0){
                res.render('updateEmp2',{form, valError, employee: result});
            } else {
                var ext = picture.name.substr(picture.name.lastIndexOf('.') + 1);
                path = '/assets/profile/'+Date.now()+'.'+ext;
                picture.mv('.'+path, function(result2){
                    employee.updEmp(uID, req.body.username, password, req.body.name, req.body.phone, req.body.gender, req.body.designation, path, function(result3){
                        res.redirect('/employee/myprofile');
                    });
                });
            }
        } else {
            if (valError.length > 0){
                res.render('updateEmp2',{form, valError, employee: result});
            } else {
                employee.updEmp(uID, req.body.username, password, req.body.name, req.body.phone, req.body.gender, req.body.designation, '', function(result1){
                    res.redirect('/employee/myprofile');
                });
            }
        }
    });    
});


module.exports = router;