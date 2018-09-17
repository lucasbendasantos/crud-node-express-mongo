/**
 * Arquivo modelo da classe 'Produto'
 */

 var mongoose =  require('mongoose');
 var Schema = mongoose.Schema;

 /**
  * Produto:
  * 
  * -> id: int
  * -> nome: String
  * -> preco: number
  * -> Descricao: String
  */

  var produtoSchema =  new Schema({
     nome: String,
     preco: Number,
     descricao: String
  });

  module.exports = mongoose.model("Produto", produtoSchema);