require("dotenv").config()

const express = require("express")
const rateLimit = require('express-rate-limit')
const cors = require("cors")
const morgan = require("morgan")
const path = require("path");
const fs = require("fs")

const routes = require("./src/routes")
const app = express()

const chave = "a92mf83n2mfkb83nHj"
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Muitas requisições feitas deste IP, tente novamente mais tarde."
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a",
});
app.use(
    morgan(":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] - :response-time ms \n", {
        stream: accessLogStream,
    })
);


app.use(cors())
app.use(morgan("dev"))


app.use(limiter)
app.use(authenticatReq)
app.use("/", routes)
app.get("/", (req, res) => { res.send("OF") })




function authenticatReq(req, res, next) {
    const api_req = req.headers['token']

    if (!api_req || api_req !== chave) {
        return res.status(401).json({ hasPermission: false, message: "Falta de credenciais para acessar" })
    }

    next()
}



const PORT = process.env.PORT

app.listen(PORT, () => {
    `
        Servidor aberto na porta: ${PORT}
    `

})