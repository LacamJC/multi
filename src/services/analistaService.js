const { fetchJson } = require('../utils/functions')
const { filter, filtrarCampos, filtrarPorEstado } = require('../utils/filters')
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
            console.log(filter_camp)
            let a_pagar = 0
            filter_camp.forEach((caso)=>{
                if(caso.nomeUsuario == analista)
                {
                    a_pagar += caso.valorHora * caso.esforco
                }
            })




            let res ={
                nome : analista.trim(),
                a_pagar : a_pagar
            }

            message.push(res)

            // console.log(message)

        })

        return message
    }
    console.log(analistas())

    return analistas()
    // console.log(analistas())
}