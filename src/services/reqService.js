const { fetchJson } = require("../utils/functions")
const { filtrarPorEstado } = require("../utils/filters")

exports.getInfo = () => {
    const data = fetchJson()
    console.log(data[0])


    var funcionarios = []

    data.forEach((chamado) => {
        let nome = chamado.nomeUsuario
        if (!funcionarios.includes(nome)) {
            funcionarios.push(nome)
        }

    })

    var col_info = []
    const informações_do_colaborado = () => {
        funcionarios.forEach((funcionario) => {
            let filtros = { nomeUsuario: funcionario }
            let casos = filtrarPorEstado(data, filtros)
            let horas_desenvolvidas = 0

            casos.forEach((caso) => {
                horas_desenvolvidas += caso.horasDesenvolvimentoA1
                // console.log(horas_desenvolvidas)
            })

            col_info.push({
                nome: funcionario.trim(),
                metricas: {
                    porcentagem: Math.floor(((casos.length * 100) / data.length)),
                    quantidade_apontamentos: casos.length,
                    horas_desenvolvidas: horas_desenvolvidas
                }
            })
        })
    }

    informações_do_colaborado()

    var clientes = []
    data.forEach((chamado) => {
        let cliente = chamado.nomeCliente
        if (!clientes.includes(cliente)) {
            clientes.push(cliente)
        }
    })

    var cli_info = []
    const informacoes_clientes = () => {
        clientes.forEach((cliente) => {
            let filtros = { nomeCliente: cliente }
            let casos = filtrarPorEstado(data, filtros)

            cli_info.push({
                cliente: cliente.trim(),
                quantidade_casos: casos.length
            })

            // console.log(casos)
        })
    }

    informacoes_clientes()



    const message = {
        title: "Informações sobre a multi",
        apontamentos: {
            quantidades: {
                total: data.length
            },
        },
        colaboradores: col_info,
        clientes: cli_info
    }
    return message
}