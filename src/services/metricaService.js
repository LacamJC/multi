const { fetchJson } = require("../utils/functions")
const { filtrarPorEstado } = require("../utils/filters")
const { converterHoras } = require("../utils/delta")
const { executarConsulta } = require("../services/mssqlconect")
exports.getData = () => {
    const data = fetchJson()


    const horas_apontadas = () => {
        let qtd = 0
        data.forEach((registro) => {
            qtd += Number(registro.esforco)
        })

        return converterHoras(qtd)
    }

    const valor_a_pagar_analistas = () => {
        let valor = 0

        data.forEach((registro) => {
            valor += registro.valorHora * registro.esforco


            if (registro.fatura == "1") {
                // console.log(`

                //         Analista: ${registro.nomeUsuario}
                //         Esforço: ${registro.esforco}
                //         Valor hora: ${registro.valorHora}
                //         A pagar: ${registro.valorHora * registro.esforco}
                //         Faturavel: ${registro.esforco * registro.valorA1}
                //     `)
            }

        })

        return valor
    }

    const valor_a_faturar = () => {
        let valor = 0
        let valor_dev = 0

        data.forEach((registro) => {
            // console.log(registro)
            if (registro.tipoTarefa == "S") {

                if (registro.fatura == "1") {
                    valor += (registro.esforco * registro.valorA1)
                }
            } else {
                if (registro.fatura == "1") {
                    valor_dev += (registro.esforco * registro.valorA1)
                    // console.log(`A pagar: ${registro.esforco * registro.valorA1}`)
                }
            }
        })



        return {
            // desenvolvimento : valor_dev,
            // suporte: valor,
            total: valor_dev + valor
        }

    }



    const message = {
        total_horas_apontadas: horas_apontadas(),
        a_pagar_analistas: valor_a_pagar_analistas(),
        fatoramento: valor_a_faturar()
    }


    return message
}

exports.getDataByMonth = (mounth) => {
    const meses = [
        { mes: "Janeiro", valor: 0, dataInicio: 20250101, dataFim: 20250131 },
        { mes: "Fevereiro", valor: 1, dataInicio: 20250201, dataFim: 20250228 },
        { mes: "Março", valor: 2, dataInicio: 20250301, dataFim: 20250331 },
        { mes: "Abril", valor: 3, dataInicio: 20250401, dataFim: 20250430 },
        { mes: "Maio", valor: 4, dataInicio: 20240501, dataFim: 20240531 },
        { mes: "Junho", valor: 5, dataInicio: 20240601, dataFim: 20240630 },
        { mes: "Julho", valor: 6, dataInicio: 20240701, dataFim: 20240731 },
        { mes: "Agosto", valor: 7, dataInicio: 20240801, dataFim: 20240831 },
        { mes: "Setembro", valor: 8, dataInicio: 20240901, dataFim: 20240930 },
        { mes: "Outubro", valor: 9, dataInicio: 20241001, dataFim: 20241031 },
        { mes: "Novembro", valor: 10, dataInicio: 20241101, dataFim: 20241130 },
        { mes: "Dezembro", valor: 11, dataInicio: 20241201, dataFim: 20241231 }
      ];
      
    const mesSelecionado = meses.find(m => m.valor == mounth)
    executarConsulta(mesSelecionado)

    return mesSelecionado
}