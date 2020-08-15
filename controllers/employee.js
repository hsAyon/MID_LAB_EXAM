var express = require('express');
var employee = require.main.require('./models/employee');
var router = express.Router();
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

module.exports = router;