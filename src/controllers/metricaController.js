const metricaService = require("../services/metricaService.js")

exports.getData = (req, res) => {
    try {
        const metricas = metricaService.getData()

            res.status(200).json(metricas)
    } catch (err) {
        res.status(500).json(err.message)
    }
}