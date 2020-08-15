var express = require('express');
var admin = require.main.require('./models/admin');
var router = express.Router();
const { check, validationResult } = require('express-validator');


//root
router.get('/', function(req, res){
    res.render('employee');
});

module.exports = router;