var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('../node_modules/database-cleaner');
var databaseCleaner = new DatabaseCleaner('mysql'); //type = 'mongodb|redis|couchdb'
var connection = express.infra.connectionFactory;

describe('#ProdutosController', function() {
		
	/*beforeEach(function(done) {		
        var connection = express.infra.connectionFactory;		
		connection.query("delete from livros", function(ex,result){
			if(!ex){
				done();
			}
		});
	});*/
	
	/*beforeEach(function(done) {		
		databaseCleaner.clean(connection, function() {
			console.log('done');			
			done();
		});		
	});*/
	
    it('#listagem de produtos json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,done);
    });
	
    it('#passando produto com campo faltando json', function (done) {
        request.post('/produtos')
			.send({titulo:'', descricao:'', preco: 100.50})
            .expect(400,done);
    });
	
	it('#salvar produtos json', function (done) {		
        request.post('/produtos')
			.send({titulo:'teste rafael', descricao:'teste node rafael', preco: 100.50})
			.expect(200,done);
		databaseCleaner.clean(connection, function() {
			console.log('done');			
			done();
		});	
    });
});