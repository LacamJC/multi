const clienteService = require('../services/clienteService.js')

exports.getData = (req,res) => {
    try{
        const metricas = clienteService.getData()

        res.status(200).json(metricas)
    }catch(err){
        res.status(500).json(err.message)
    }
}