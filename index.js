require("dotenv").config()

const express = require("express")
const rateLimit = require('express-rate-limit')
const cors = require("cors")
const morgan = require("morgan")
const path = require("path");
const fs = require("fs")

const routes = require("./src/routes")
const app = express()

const chave = process.env.API_KEY

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000000,
    message: "Muitas requisições feitas deste IP, tente novamente mais tarde."
})


app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// const accessLogStream = fs.createWriteStream(path.join(__dirname, "./src/log/log.txt"), {
//     flags: "a",
// });
// app.use(
//     morgan(":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] - :response-time ms \n", {
//         stream: accessLogStream,
//     })
// );

app.use(morgan("dev"))


app.use(limiter)
app.use(authenticatReq)
app.use("/", routes)
app.get("/", (req, res) => { res.send("Entre em contato com @LacamJC para mais informações") })




function authenticatReq(req, res, next) {
    const api_req = req.headers['token']

    // if (!api_req || api_req !== chave) {
    //     return res.status(401).json({ hasPermission: false, message: "Falta de credenciais para acessar" })
    // }
    console.log("Alguem tentou acessar")

    next()
}



const PORT = process.env.PORT

app.listen(PORT, () => {
    `
        Servidor aberto na porta: ${PORT}
    `

})