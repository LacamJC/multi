const fs = require("fs")
const caminho = "./src/data/resultados_consulta.json"

const chaveMapeamento = {
    "ZAD_NUM": "numeroZad",
    "ZAD_CODUS": "codigoUsuario",
    "ZAD_NOME": "nomeUsuario",
    "ZAD_PROJET": "projeto",
    "ZAD_NUMTAR": "numeroTarefa",
    "ZAD_DESCR": "descricaoTarefa",
    "ZAD_TIPO": "tipoTarefa",
    "ZAD_DTINI": "dataInicio",
    "ZAD_DTFIM": "dataFim",
    "ZAD_ESFOR": "esforco",
    "A1_NREDUZ": "nomeCliente",
    "ZAA_COD": "codigoUsuarioAprovador",
    "ZAA_NOME": "nomeUsuarioAprovador",
    "ZAA_VALHOR": "valorHora",
    "A1_VALOR": "valorA1",
    "A1_HRDEV": "horasDesenvolvimentoA1",
    "ZAC_FATURA": "fatura",
    "A1_PARCEIR": "parceiroA1"
};

exports.fetchJson = () => {
    try {
        let data = fs.readFileSync(caminho, 'utf-8');
        let jsonData = JSON.parse(data);

        // Mapeia os nomes das chaves e formata as datas
        const dadosMapeados = jsonData.map(objeto => {
            const objetoMapeado = {};
            for (const chaveAntiga in objeto) {
                if (chaveMapeamento.hasOwnProperty(chaveAntiga)) {
                    const chaveNova = chaveMapeamento[chaveAntiga];
                    let valor = objeto[chaveAntiga];

                    // Formata as datas se forem 'dataInicio' ou 'dataFim'
                    if (chaveNova === "dataInicio" || chaveNova === "dataFim") {
                        if (valor && typeof valor === 'string' && valor.match(/^\d{8}$/)) { // Verifica se é uma string de 8 dígitos
                            valor = valor.substring(0, 4) + "-" + valor.substring(4, 6) + "-" + valor.substring(6, 8);
                        }
                    }

                    // Converte o campo 'esforco' para horas inteiras
                    if (chaveNova === "esforco") {
                        if (valor && typeof valor === 'string' && valor.match(/^\d{2}:\d{2}$/)) {
                            const [horas, minutos] = valor.split(':').map(Number);
                            valor = (horas + minutos / 60).toFixed(2); // Converte para horas decimais
                        } else {
                            valor = 0; // Se o formato for inválido, assume 0 horas
                        }
                    }

                    objetoMapeado[chaveNova] = valor;
                } else {
                    objetoMapeado[chaveAntiga] = objeto[chaveAntiga]; // Mantém chaves não mapeadas
                }
            }
            return objetoMapeado;
        });

        return dadosMapeados;
    } catch (error) {
        return error.message;
    }
};

