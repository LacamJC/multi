const analistaService = require('../services/analistaService.js')

exports.getData = (req,res) => {
    try{
        const metricas = analistaService.getData()

        res.status(200).json(metricas)
    } catch(err){
        res.status(500).json(err.message)
        console.log(err.message)
    }
}