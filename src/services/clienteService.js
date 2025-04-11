const { fetchJson } = require('../utils/functions')
const { filtrarCampos } = require('../utils/filters')
const { converterHoras } = require("../utils/delta")
exports.getData = () =>{
    const data = fetchJson()

    const clientes = () => {
        let campos = "nomeCliente"
        let res = filtrarCampos(data,campos)
        // console.log(res)

        let nomesUnicos = [... new Set(res.map((obj) => obj.nomeCliente))]
        let message = []

        nomesUnicos.forEach((cliente) => {
            let filtro = { nomeCliente : cliente }
            let campos = "nomeCliente,tipoTarefa,fatura,esforco,valorA1"
            var filter_camp = filtrarCampos(data,campos)
            // console.log(filter_camp)
            let a_faturar = 0
            let cont = 0
            let horas_apontadas = 0

            filter_camp.forEach((caso) => {
                if(caso.nomeCliente == cliente)
                    
                {
                    if(caso.tipoTarefa == "S"){
                        if(caso.fatura == "1"){
                            a_faturar += caso.esforco * caso.valorA1
                            cont++;
                        }
                    }

                    if(caso.tipoTarefa == "D"){
                        if(caso.fatura == "1"){
                            a_faturar += caso.esforco * caso.valorA1
                            cont++;
                        }
                    }

                    // console.log(caso.esforco)
                    horas_apontadas += Number(caso.esforco)
                }
                
            })

            let res = {
                cliente : cliente.toString().trim(),
                a_faturar : a_faturar,
                qtd_chamados : cont,
                horas_apontadas : converterHoras(horas_apontadas)
            }

            message.push(res)

        })

        message.sort((a, b) => a.cliente.localeCompare(b.cliente))
        //arrayDeObjetos.sort((a, b) => a.nome.localeCompare(b.nome));

        return message
    }   

    return clientes()
}