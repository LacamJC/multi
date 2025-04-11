const { fetchJson } = require('../utils/functions')
const { filter, filtrarCampos, filtrarPorEstado } = require('../utils/filters')
const { converterHoras } = require("../utils/delta")
exports.getData = () => {
    const data = fetchJson() 

    const analistas = () => {
        let campos = "nomeUsuario"
        let res = filtrarCampos(data,campos)
        // let non_trim = res
        // res.map((item)=>{
        //    item.nomeUsuario = item.nomeUsuario.trim() 
        // })

        let nomesUnicos = [... new Set(res.map((obj)=> obj.nomeUsuario))]
        let message = []
        nomesUnicos.forEach((analista) => {
            let filtro = { nomeUsuario : analista}
            var filter_data = filtrarPorEstado(data, filtro)
            let campos = "nomeUsuario,esforco,valorHora,valorA1,horasDesenvolvimentoA1,fatura"
            var filter_camp = filtrarCampos(data, campos)
            // console.log(filter_camp)
            let a_pagar = 0
            let horas_apontadas = 0
            let qtd = 0
            let tot = 0
            filter_camp.forEach((caso)=>{
                if(caso.nomeUsuario == analista)
                {
                    a_pagar += caso.valorHora * caso.esforco
                    horas_apontadas += Number(caso.esforco)
                    
                    qtd ++
                }

                tot += Number(caso.esforco) 
            })


            let res ={
                nome : analista.trim(),
                a_pagar : a_pagar,
                horas_apontadas : converterHoras(horas_apontadas),
                qtd_casos : qtd
            }

            message.push(res)

            // console.log(message)

        })
        message.sort((a, b) => a.nome.localeCompare(b.nome))
        return message
    }
    // console.log(analistas())

    return analistas()
    // console.log(analistas())
}