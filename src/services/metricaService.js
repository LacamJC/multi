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
            // if (registro.tipoTarefa == "S") {

            //     if (registro.fatura == "1") {
            //         valor += (registro.esforco * registro.valorA1)
            //     }
            // } else {
            //     if (registro.fatura == "1") {
            //         valor_dev += (registro.esforco * horasDesenvolvimentoA1)
            //         // console.log(`A pagar: ${registro.esforco * registro.valorA1}`)
            //     }
            // }
            if(registro.fatura == "1"){
                if(registro.tipoTarefa == "S"){
                    valor += (registro.esforco * registro.valorA1)
                }
                if(registro.tipoTarefa == "D"){
                    valor += (registro.esforco * registro.horasDesenvolvimentoA1)
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
        fatoramento: valor_a_faturar(),
        registros: data.length
    }


    return message
}

exports.getDataByMonth = (mounth) => {
    const meses = [
        { mes: "Janeiro", valor: 0, ano: 2024, dataInicio: 20240101, dataFim: 20240131 },
        { mes: "Fevereiro", valor: 1, ano: 2024, dataInicio: 20240201, dataFim: 20240229 },
        { mes: "Março", valor: 2, ano: 2024, dataInicio: 20240301, dataFim: 20240331 },
        { mes: "Abril", valor: 3, ano: 2024, dataInicio: 20240401, dataFim: 20240430 },
        { mes: "Maio", valor: 4, ano: 2024, dataInicio: 20240501, dataFim: 20240531 },
        { mes: "Junho", valor: 5, ano: 2024, dataInicio: 20240601, dataFim: 20240630 },
        { mes: "Julho", valor: 6, ano: 2024, dataInicio: 20240701, dataFim: 20240731 },
        { mes: "Agosto", valor: 7, ano: 2024, dataInicio: 20240801, dataFim: 20240831 },
        { mes: "Setembro", valor: 8, ano: 2024, dataInicio: 20240901, dataFim: 20240930 },
        { mes: "Outubro", valor: 9, ano: 2024, dataInicio: 20241001, dataFim: 20241031 },
        { mes: "Novembro", valor: 10, ano: 2024, dataInicio: 20241101, dataFim: 20241130 },
        { mes: "Dezembro", valor: 11, ano: 2024, dataInicio: 20241201, dataFim: 20241231 },
        { mes: "Janeiro", valor: 12, ano: 2025, dataInicio: 20250101, dataFim: 20250131 },
        { mes: "Fevereiro", valor: 13, ano: 2025, dataInicio: 20250201, dataFim: 20250228 },
        { mes: "Março", valor: 14, ano: 2025, dataInicio: 20250301, dataFim: 20250331 },
        { mes: "Abril", valor: 15, ano: 2025, dataInicio: 20250401, dataFim: 20250430 },
        { mes: "Maio", valor: 16, ano: 2025, dataInicio: 20250501, dataFim: 20250531 },
        { mes: "Junho", valor: 17, ano: 2025, dataInicio: 20250601, dataFim: 20250630 },
        { mes: "Julho", valor: 18, ano: 2025, dataInicio: 20250701, dataFim: 20250731 },
        { mes: "Agosto", valor: 19, ano: 2025, dataInicio: 20250801, dataFim: 20250831 },
        { mes: "Setembro", valor: 20, ano: 2025, dataInicio: 20250901, dataFim: 20250930 }
      ];
      
      if (mounth === undefined || mounth === null || mounth.length === 0 || isNaN(parseInt(mounth)) || parseInt(mounth) < 0) {
        return { message: "Mês inválido. Por favor, forneça um número entre 0 e 11." };
    }
    
    const mesSelecionado = meses.find(m => m.valor == mounth)
    console.log(mesSelecionado)
    
    const data = executarConsulta(mesSelecionado)
    console.log(data.length)
    console.log(`
        
            DADOS DO RESULTADO 

            ${data.length}
        
            ` )
    
    const res = fetchJson()
    setTimeout(()=>{
        if(res){
            console.log(`
                
                    Dados encontrados na nova data

                    `)
        }else{
            console.log(`

                nenhum dado encontrado

                    `)
        }
    },1000)
    return data
}