const reqService = require("../services/reqService.js")


exports.getInfo = (req, res) => {
    try {
        const info = reqService.getInfo()

        res.status(200).json(info)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}