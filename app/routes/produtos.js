module.exports = function(app) {
	
    app.get("/produtos", function(req, res, next) {
		var connection = app.infra.connectionFactory;	
		console.log(connection.state);
		connection.connect(function(err) {
		  if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		  }

		  console.log('connected as id ' + connection.threadId);
		});
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results) {	

			if (err){
				return next(err);
			}
			
			res.format({
				html: function() {
                    res.render("produtos/lista",{lista:results});
                },
				json: function() {
					res.json(results);
				}
			});
		});
		
		connection.end();
    });
	
	app.get("/produtos/form", function(req, res) {
		res.render('produtos/form', {validationErrors: {}, produto: {}});
	});
	
	app.post("/produtos", function(req, res, next) {
		var produto = req.body;
		console.log(produto);
						
		req.assert('titulo', 'Titulo deve ser preenchido').notEmpty();
		req.assert('preco', 'Preco deve ser um número').isFloat();
		var validationErrors = req.validationErrors();
		
		if (validationErrors) {			
			res.format({
				html: function() {
                    res.status(400).render("produtos/form",{validationErrors: validationErrors, produto: produto});
                },
				json: function() {
					res.status(400).send(validationErrors);
				}
			});
            return;
		}
		
		var connection = app.infra.connectionFactory;	
		connection.connect();
		console.log(connection.state);
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.salva(produto, function(erros, results) {		
			if (erros) {
				return next(erros);
			}
			res.render("produtos/lista",{lista:results});	
		});
		connection.end();
	});
}