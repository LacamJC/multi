
const express = require("express")
const reqController = require("../controllers/reqController.js")
const metricaController = require("../controllers/metricaController.js")
const router = express.Router()
const authenticatReq = require("../../index.js")

// router.get("/", reqController.getInfo)
router.get("/metrica", metricaController.getData)








module.exports = router