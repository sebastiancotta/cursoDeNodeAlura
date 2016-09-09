module.exports = function(app) {
    app.get("/promocoes/form", function(req,res) {
        var connection = app.infra.connectionFactory;
		console.log(connection.state);
        var produtoDao = new app.infra.ProdutosDAO(connection);

        produtoDao.lista(function(error,results){
            res.render('promocoes/form',{lista:results});
        });

    });
	
	app.post("/promocoes", function(req,res) {
        var promocao = req.body;		
		console.log('inicio do socke');
        app.get('io').emit("novaPromocao",promocao);		
        res.redirect("/promocoes/form");
		console.log('acabou o socket');
    });

}