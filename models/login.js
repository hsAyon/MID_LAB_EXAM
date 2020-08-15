var db      = require('./dbconnection');

module.exports = {
    auth: function(username,password,callback){
        var sql="SELECT * FROM `login` WHERE username = '"+username+"' AND password = '"+password+"';";
        db.getResults(sql,function(result){
            callback(result);
        });
    },
}