var express = require('express');
var admin = require.main.require('./models/admin');
var router = express.Router();
const { check, validationResult } = require('express-validator');


//Root
router.get('/', function (req, res){
    admin.userCount(function(userCount){
        admin.empCount(function(empCount){
            res.render('admin', {userCount: userCount[0].count, empCount: empCount[0].count});
        });
    });
});

module.exports = router;