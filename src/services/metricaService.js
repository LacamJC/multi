const { fetchJson } = require("../utils/functions")
const { filtrarPorEstado } = require("../utils/filters")
const { converterHoras } = require("../utils/delta")
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
        })

        return valor
    }

    const valor_a_faturar = () => {
        let valor = 0
        let valor_dev = 0

        data.forEach((registro) => {
            if (registro.tipoTarefa == "S") {

                if (registro.fatura == "1") {
                    valor += (registro.esforco * registro.valorA1)
                    // console.log(registro.esforco * registro.valorA1)

                }
            } else {
                if (registro.fatura == "1") {
                    valor_dev += (registro.esforco * registro.horasDesenvolvimentoA1)
                    // console.log(registro)
                    // console.log(`
                    //         ${valor_dev.toFixed(2)}
                    //     `)
                }
            }
        })

        // return valor + valor_dev

        return {
            desenvolvimento : valor_dev,
            suporte: valor,
            total : valor_dev + valor}

    }


    const message = {
        total_horas_apontadas: horas_apontadas(),
        a_pagar_analistas: valor_a_pagar_analistas(),
        fatoramento: valor_a_faturar()
    }


    return message
}