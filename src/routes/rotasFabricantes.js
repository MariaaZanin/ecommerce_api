const { Router } = require('express');

const { getFabricantes, addFabricante, updateFabricante, getFabricantePorId, deleteFabricante } = require('../controllers/fabricanteController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasFabricantes = new Router();

rotasFabricantes.route('/fabricante')
   .get(verificaJWT, getFabricantes)
   .post(verificaJWT, addFabricante)
   .put(verificaJWT, updateFabricante)

rotasFabricantes.route('/fabricante/:codigo')
   .get(verificaJWT, getFabricantePorId)
   .delete(verificaJWT,deleteFabricante)

module.exports = { rotasFabricantes: rotasFabricantes };