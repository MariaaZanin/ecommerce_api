const { Router } = require('express');

const { rotasProdutos } = require('./rotasProdutos');
const { rotasFabricantes } = require('./rotasFabricantes');

const { login } = require('../controllers/segurancaController');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(login);

rotas.use(rotasProdutos);
rotas.use(rotasFabricantes);

module.exports = rotas;