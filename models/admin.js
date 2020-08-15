var db      = require('./dbconnection');

module.exports = {
    userCount: function(callback){
        var sql="SELECT Count(*) as count FROM `login` WHERE 1;";
        db.getResults(sql,function(result){
            callback(result);
        });
    },
    
    empCount: function(callback){
        var sql="SELECT Count(*) as count FROM `login` WHERE type LIKE 'employee';";
        db.getResults(sql,function(result){
            callback(result);
        });
    },

    addEmp: function(name, username, password, phone, gender, designation, callback){
        var sql="INSERT INTO `login` (`username`, `password`, `type`) VALUES ('"+username+"','"+password+"','employee');";
        db.getResults(sql,function(result){
            var sql1="INSERT INTO `employee_details`(`uID`, `name`, `phone`, `gender`, `designation`) VALUES ('"+result.insertId+"','"+name+"','"+phone+"','"+gender+"','"+designation+"');";
            db.getResults(sql1,function(result1){
                callback(result1);
            });
        });
    },

    getEmpList: function(callback){
        var sql="SELECT * FROM `employee_details`";
        db.getResults(sql,function(result){
            callback(result);
        });
    },
}