var db      = require('./dbconnection');

module.exports = {

    getEmp: function(uID, callback){
        var sql="SELECT * FROM `employee_details` as emp, `login` as log WHERE emp.uID = log.ID AND emp.uID = '"+uID+"'";
        db.getResults(sql,function(result){
            callback(result[0]);
        });
    },

    updEmp: function(uID, username, password, name, phone, gender, designation, picture, callback){
        var sql="UPDATE `employee_details` SET `name`='"+name+"',`phone`='"+phone+"',`gender`='"+gender+"',`designation`='"+designation+"', `picture`='"+picture+"' WHERE `uID`='"+uID+"';";
        db.getResults(sql,function(result1){
            var sql1="UPDATE `login` SET `username`='"+username+"',`phone`='"+password+"' WHERE `ID`='"+uID+"';";
            callback(result1);
        });
    },
}