/**
 * 
 * Arquivo: server.js
 * Descrição: 
 * Autor:
 * Data Criação:
 * 
 */
// Configurar o setup da app

// Chamadas dos pacotes
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Produto = require('./app/models/produto');

// Verificar a necessidade da promise do mongoose
mongoose.Promise = global.Promise;

// URI: MLAB
// mongoose.connect('mongodb://lbsantos:lucas010203@ds016298.mlab.com:16298/node-crud-api-lucas', {
//   useNewUrlParser: true
// });

// Local Usando mono DB
mongoose.connect('mongodb://localhost:27017/node-crud-api-lucas', {useNewUrlParser:true});


//Configuração da variável app para usar o bodyparser ( bodyParser retorna os dados a partir de um JSON )
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Defino a porta que será executado a API
var port = process.env.port || 3000;

// Criando uma Instancia das rotas via express
var router = express.Router();

// Rotas da API:
// ***************************************************************************

router.use((req, res, next) => {
  console.log("Passei aqui....");
  next();
});

// Rota de exemplo
router.get('/', (req, res) => {
  res.json({ message: 'Funcionou !' });
});


// APIS:
// ****************************************************************************

// Essas rotas que terminarem com "/produtos" servem para o GETALL e POST
router.route('/produtos')
  // 1) POST
  .post((req, res) => {
    var produto = new Produto();

    // populo o OBJ com os elementos vindos da request
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    produto.save(error => {
      if (error) {
        res.send("Erro ao tentar salvar o produto" + error);
      }
      res.json({ message: "Sucesso ao incluir produto! " });
    });
  })

  // 2) GET ALL
  .get((req, res) => {
    Produto.find((error, produtos) => {
      if (error)
        res.send("Erro ao listar produtos " + error);
      res.json(produtos)
    });
  });

// Rotas que irão terminar em "/produtos/:produto_id"

router.route('/produtos/:produto_id')

  .get((req, res) => {
    Produto.findById(req.params.produto_id, (error, produto) => {
      if (error)
        res.send("Produto não encontrado " + error);

      res.json(produto)
    })
  })

  .put((req, res) => {
    Produto.findById(req.params.produto_id, (error, produto) => {
      if (error)
        res.send("Produto não econtrado " + error);

      produto.nome = req.body.nome;
      produto.preco = req.body.preco;
      produto.descricao = req.body.descricao;

      produto.save(error => {
        if (error)
          res.send("Não foi possível atualizar o produto " + error);

        res.json({
          message: "Produto atualizado com sucesso",
          Produto: produto
        })
      });
    });
  })


  .delete((req, res) => {

    Produto.remove({
      _id: req.params.produto_id
    }, error => {
      if (error)
        res.send("Error ao localizar produto" + error)

      res.json({ message: "Produto excluido com sucesso ! " })
    });
  });


// Definido um prefexio das rotas: '/api' 
app.use('/api', router);

// Iniciando o servidor
app.listen(port);
console.log("Iniciando a app na porta " + port);