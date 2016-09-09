var mysql = require('mysql');
module.exports = function() {
	
	if (!process.env.NODE_ENV) {
		console.log('desenvolvimento');
		return mysql.createConnection({
			host: "localhost",
			user: "node",
			password : "123456",
			database: "casadocodigo"}
		);
	}	
	
	if (process.env.NODE_ENV == 'test') {
		console.log('teste');
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'casadocodigo_teste'
        });
    }
	
}