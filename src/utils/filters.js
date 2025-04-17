exports.filtrarPorEstado = (arrayOriginal, filtros) => {
    /**
      *  FILTRA OS REGISTROS COM BASE EM FILTROS
      * EX:
      *       filtros = { Prioridade : "Baixa", UltimaSituacao : "Finalizada" }
      *       arrayOriginal = <objeto de arrays>
      * 
      *  Ira retornar um novo indice somente com os registros que possuem seus valores identicos aos filtros
      * 
      * Aviso: Este filtro não modifica os campos da planilha não confunda com Filter que retorna somente os campos
      * especificados
      */
    return arrayOriginal.filter(item => {
        for (const chave in filtros) {
            if (item[chave] !== filtros[chave]) {
                return false;
            }
        }
        return true;
    });
}

exports.filtrarCampos = (dados, campos) => {
    /**
     * Recebe um conjunto de indices(dados) e campos(campos) para retornar um novo conjunto de indices
     * somente com os campos especificados
     * EX:
     *       campos = {"Protocolo,Assunto,Categoria"}
     *       arrayOriginal = <objeto de arrays>
     * 
     * retorno: 
     * {
        "Protocolo": "851",
        "Assunto": "Segundo treinamento rotina thermas - Caixa",
        "Categoria": "Suporte",
        },
     * 
     *  Ira retornar um novo indice somente com os campos(chaves) iguais a variavel campos
     * 
     */
    if (!campos) {
        return dados
    }


    const camposArray = campos.split(",");
    return dados.map((item) => {
        const novoItem = {};
        camposArray.forEach((campo) => {
            if (item.hasOwnProperty(campo)) {
                novoItem[campo] = item[campo];
            }
        });
        return novoItem;
    });

}