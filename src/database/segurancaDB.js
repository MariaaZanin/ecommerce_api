const { pool } = require('../../config');
const Usuario = require('../models/usuario')

const autenticaUsuarioDB = async (body) => {
    try {
        console.log('[AutenticaUsuarioDB] - Iniciando autenticacao do usuario');
        const { email, senha } = body;
        const results = await pool.query(`SELECT * FROM usuarios WHERE 
        email = $1 AND senha = $2`,[email, senha]);
        if (results.rowCount == 0){
            throw "Usuário ou senha inválidos";
        }
        const usuario = results.rows[0];
        console.log('[AutenticaUsuarioDB] - Finalizando autenticacao do usuario');
        return new Usuario(usuario.email, 
            usuario.tipo, usuario.telefone, usuario.nome, 
            ['ADICIONA','REMOVE']);
    } catch (err){
        throw err;
    }
}

module.exports = { autenticaUsuarioDB };
