class Produto {
    constructor(id, nome, descricao, valor, data_cadastro, data_alteracao, fabricante_id){
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.data_cadastro = data_cadastro;
        this.data_alteracao = data_alteracao;
        this.fabricante_id = fabricante_id
    }
}

module.exports = Produto;