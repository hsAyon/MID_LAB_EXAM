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
}