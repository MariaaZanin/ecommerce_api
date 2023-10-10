const { getFabricantesDB, getFabricantePorIdDB, addFabricanteDB, updateFabricanteDB, deleteFabricanteDB } 
    = require('../database/fabricanteDB')
  
  const getFabricantes = async (request, response) => {
    await getFabricantesDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar as Fabricantes: ' + err
          }))
  }
  
  const getFabricantePorId= async (request, response) => {
    await getFabricantePorIdDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
  }
  
  const addFabricante = async (request, response) => {
    await addFabricanteDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Fabricante adicionado",
            data: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
  }
  
  const updateFabricante = async (request, response) => {
    await updateFabricanteDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Fabricante alterado",
            data: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
  }
  
  const deleteFabricante = async (request, response) => {
    await deleteFabricanteDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
  }
  
  module.exports = { getFabricantes, getFabricantePorId: getFabricantePorId, addFabricante: addFabricante, updateFabricante: updateFabricante, deleteFabricante: deleteFabricante }