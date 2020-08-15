var mysql	= require('mysql');
function getConnection(callback){

	var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'mid_lab_exam'
	});

	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }
	  //console.log('connected as id ' + connection.threadId);

	});

	callback(connection);
}


module.exports = {
	getResults: function (sql, callback){
		getConnection(function(connection){
			connection.query(sql, function(error, results){
				if(error){
					console.log(error.stack);
					callback([],error);
				}else{
					callback(results);
				}
			});

			connection.end(function(err){
				//console.log('connection end...');
			});
		});
	},

	execute: function (sql, callback){

		getConnection(function(connection){
			connection.query(sql, function(error, results){
				if(error){
					console.log(error.stack);
					callback([],error);
				}else{
					callback(results);
				}
			});

			/* connection.end(function(err){
				//console.log('connection end...');
			}); */
		});
	},
}