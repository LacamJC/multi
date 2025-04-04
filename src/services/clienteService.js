const { fetchJson } = require('../utils/functions')
const { filtrarCampos } = require('../utils/filters')
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
                }
                
            })

            let res = {
                cliente : cliente.trim(),
                a_faturar : a_faturar,
                qtd_chamados : cont
            }

            message.push(res)

        })

        return message
    }   

    return clientes()
}