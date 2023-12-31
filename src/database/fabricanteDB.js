const { pool } = require('../../config');
const Fabricante = require('../models/fabricante');

const getFabricantesDB = async () => {
    try {
        console.log('[GetFabricantesDB] - Iniciando busca de fabricantes');
        const { rows } = await pool.query(`SELECT * FROM fabricantes ORDER BY id`);
        console.log('[GetFabricantesDB] - Finalizando busca de fabricantes');
        return rows.map((fabricante) => new Fabricante(fabricante.id, fabricante.nome, fabricante.pais, fabricante.telefone, fabricante.descricao));
    } catch (err){
        throw "Erro: " + err;
    }
}

const getFabricantePorIdDB = async (id) => {
    try {           
        console.log('[GetFabricantePorIdDB] - Iniciando busca de fabricante');
        const results = await pool.query(`SELECT * FROM fabricantes where id = $1`,
        [id]);
        console.log('[GetFabricantePorIdDB] - Finalizando busca de fabricante');
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + id;
        } else {
            const fabricante = results.rows[0];
            return new Fabricante(fabricante.id, fabricante.nome, fabricante.pais, fabricante.telefone, fabricante.descricao); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a Fabricante: " + err;
    }     
}

const addFabricanteDB = async (body) => {
    try {   
        console.log('[AddFabricanteDB] - Iniciando insert de fabricante');
        const { nome, pais, telefone, descricao } = body; 
        const results = await pool.query(`INSERT INTO fabricantes (nome, pais, telefone, descricao) 
            VALUES ($1, $2, $3, $4)
            returning id, nome, pais, telefone, descricao`,
        [nome, pais, telefone, descricao]);
        const fabricante = results.rows[0];
        console.log('[AddFabricanteDB] - Finalizando insert de fabricante');
        return new Fabricante(fabricante.id, fabricante.nome, fabricante.pais, fabricante.telefone, fabricante.descricao); 
    } catch (err) {
        throw "Erro ao inserir o fabricante: " + err;
    }    
}

const updateFabricanteDB = async (body) => {
    try {   
        console.log('[UpdateFabricanteDB] - Iniciando update de fabricante');
        const { id, nome, pais, telefone, descricao }  = body; 
        const results = await pool.query(`
            UPDATE fabricantes
            SET nome = $2, pais = $3, telefone = $4, descricao = $5
            WHERE id = $1
            RETURNING id, nome, pais, telefone, descricao`,
            [id, nome, pais, telefone, descricao]
        );       
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }
        const fabricante = results.rows[0];
        console.log('[UpdateFabricanteDB] - Finzalizando update de fabricante');
        return new Fabricante(fabricante.id, fabricante.nome, fabricante.pais, fabricante.telefone, fabricante.descricao); 
    } catch (err) {
        throw "Erro ao alterar o fabricante: " + err;
    }      
}

const deleteFabricanteDB = async (id) => {
    try {      
        console.log('[DeleteFabricanteDB] - Iniciando delete de fabricante');     
        const results = await pool.query(`DELETE FROM fabricantes where id = $1`,
        [id]);
        console.log('[DeleteFabricanteDB] - Finzalizando delete de fabricante');     
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return "Fabricante removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a Fabricante: " + err;
    }     
}

module.exports = {
    getFabricantesDB: getFabricantesDB, getFabricantePorIdDB: getFabricantePorIdDB, addFabricanteDB: addFabricanteDB, updateFabricanteDB: updateFabricanteDB, deleteFabricanteDB: deleteFabricanteDB, 
}