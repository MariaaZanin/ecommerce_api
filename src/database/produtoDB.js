// const { pool } = require('../../config');
// const Produto = require('../models/produto');

// const getProdutosDB = async () => {
//     try {
//         const { rows } = await pool.query(`SELECT * FROM produtos ORDER BY id`);
//         return rows.map((produto) => new Produto(produto.id, produto.nome, produto.descricao, produto.valor, produto.data_cadastro));
//     } catch (err){
//         throw "Erro: " + err;
//     }
// }

// const addProdutoDB = async (body) => {
//     try {   
//         const { nome, descricao, valor, data_cadastro } = body; 
//         const results = await pool.query(`INSERT INTO produtos (nome, descricao, valor, data_cadastro) 
//             VALUES ($1, $2, $3, $4)
//             returning  id, nome, valor, data_cadastro`,
//         [nome, descricao, valor, data_cadastro]);
//         const produto = results.rows[0];
//         return new Produto(produto.id, produto.nome, produto.descricao, produto.valor, produto.data_cadastro); 
//     } catch (err) {
//         throw "Erro ao inserir a produto: " + err;
//     }    
// }


// const updateProdutoDB = async (body) => {
//     try {   
//         const { id, nome, descricao, valor, data_cadastro }  = body; 
//         const results = await pool.query(`
//             UPDATE produtos
//             SET nome = $2, descricao = $3, valor = $4, data_cadastro = $5
//             WHERE id = $1
//             RETURNING id, nome, valor, data_cadastro`,
//             [id, nome, descricao, valor, data_cadastro]
//         );        
//         if (results.rowCount == 0){
//             throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
//         }
//         const produto = results.rows[0];
//         return new Produto(produto.id, produto.nome, produto.descricao, produto.valor, produto.data_cadastro); 
//     } catch (err) {
//         throw "Erro ao alterar o produto: " + err;
//     }      
// }

const { pool } = require('../../config');
const Produto = require('../models/produto');

const getProdutosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM produtos ORDER BY id`);
        return rows.map((produto) => new Produto(produto.id, produto.nome, produto.descricao, produto.valor, produto.data_cadastro, produto.data_alteracao, produto.fabricante_id));
    } catch (err){
        throw "Erro: " + err;
    }
}

const addProdutoDB = async (body) => {
    try {   
        const { nome, descricao, valor, data_cadastro, data_alteracao, fabricante_id } = body; 
        const results = await pool.query(`INSERT INTO produtos (nome, descricao, valor, data_cadastro, data_alteracao, fabricante_id) 
            VALUES ($1, $2, $3, $4, $5, $6)
            returning id, nome, descricao, valor, data_cadastro, data_alteracao, fabricante_id`,
        [nome, descricao, valor, data_cadastro, data_alteracao, fabricante_id]);
        const produto = results.rows[0];
        return new Produto(produto.id, produto.nome, produto.descricao, produto.valor, produto.data_cadastro, produto.data_alteracao, produto.fabricante_id); 
    } catch (err) {
        throw "Erro ao inserir o produto: " + err;
    }    
}

const updateProdutoDB = async (body) => {
    try {   
        const { id, nome, descricao, valor, data_cadastro, data_alteracao, fabricante_id }  = body; 
        const results = await pool.query(`
            UPDATE produtos
            SET nome = $2, descricao = $3, valor = $4, data_cadastro = $5, data_alteracao = $6, fabricante_id = $7
            WHERE id = $1
            RETURNING id, nome, descricao, valor, data_cadastro, data_alteracao, fabricante_id`,
            [id, nome, descricao, valor, data_cadastro, data_alteracao, fabricante_id]
        );        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }
        const produto = results.rows[0];
        return new Produto(produto.id, produto.nome, produto.descricao, produto.valor, produto.data_cadastro, produto.data_alteracao, produto.fabricante_id); 
    } catch (err) {
        throw "Erro ao alterar o produto: " + err;
    }      
}

const deleteProdutoDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM produtos where id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return "Produto removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a produto: " + err;
    }     
}

const getProdutoPorIdDB = async (id) => {
    try {           
        const results = await pool.query(`SELECT * FROM produtos where id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + id;
        } else {
            const produto = results.rows[0];
            return new Produto(produto.id, produto.nome, produto.descricao, produto.valor, produto.data_cadastro, produto.data_alteracao, produto.fabricante_id); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a produto: " + err;
    }     
}

module.exports = {
    getProdutosDB: getProdutosDB, addProdutoDB: addProdutoDB, updateProdutoDB: updateProdutoDB, deleteProdutoDB: deleteProdutoDB, getProdutoPorIdDB: getProdutoPorIdDB
}