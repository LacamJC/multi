
const express = require("express")
const reqController = require("../controllers/reqController.js")
const metricaController = require("../controllers/metricaController.js")
const analistaController = require('../controllers/analistaController.js')
const clienteController = require('../controllers/clienteController.js')
const router = express.Router()
const { fetchJson } = require('../utils/functions')
const authenticatReq = require("../../index.js")
const { executarConsulta } = require('../services/mssqlconect.js')
// router.get("/", reqController.getInfo)
router.get("/metrica", metricaController.getData)
router.get('/mes/:month', metricaController.getDataByMonth)
router.get('/analistas', analistaController.getData)
router.get('/clientes', clienteController.getData)


router.get('/teste', (req,res) => {
    const message = {
        total_horas_apontadas: 0,
        a_pagar_analistas: 0,
        fatoramento: 0
    }
    res.json(message)
})



router.get('/sql', (req,res)=>{
    // const message = sqlAtt()
    sqlAtt()
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = agora.getMonth() + 1; // Adiciona 1 porque getMonth() retorna de 0 a 11
    const dia = agora.getDate();
    const hora = agora.getHours();
    const minutos = agora.getMinutes();
    const segundos = agora.getSeconds();
    
    const dataFormatada = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    const horaFormatada = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    
    const data = fetchJson()
    

    console.log(`Data: ${dataFormatada}`);
    console.log(`Hora: ${horaFormatada}`);
    console.log(`Data e Hora: ${dataFormatada} ${horaFormatada}`);
    const message = {
        loading: false,
        data: dataFormatada,
        hora: horaFormatada,
        registros : data.length
    }
    
    res.status(200).json(message)

})

async function sqlAtt(){
    console.log("Atualizando dados")
    executarConsulta()
    return "Atualizando dados"
}






module.exports = router