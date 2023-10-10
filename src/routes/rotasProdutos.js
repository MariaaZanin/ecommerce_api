const { Router } = require('express');

const { getProdutos, addProduto, updateProduto, getProdutoPorId, deleteProduto } = require('../controllers/produtoController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasProdutos = new Router();

rotasProdutos.route('/produto')
   .get(verificaJWT, getProdutos)
   .post(verificaJWT, addProduto)
   .put(verificaJWT, updateProduto)

rotasProdutos.route('/produto/:codigo')
   .get(verificaJWT, getProdutoPorId)
   .delete(verificaJWT,deleteProduto)

module.exports = { rotasProdutos: rotasProdutos };