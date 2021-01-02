/* eslint-disable no-undef */
const history = {}
const respon = require("../Helpers/respon")
const model = require("../Models/history")

history.get = async (req, res) => {
    try {
        const result = await model.getHistory()
        return respon(res, 200, result)
    } catch (error) {
        return respon(res, 400, error)
    }
}

history.add = async (req, res) => {
    try {
        const result = await model.addHistory(req.body)
        return respon(res, 200, result)
    } catch (error) {
        return respon(res, 500, error)
    }
}

history.update = async (req, res) => {
    try {
        const result = await model.updateHistory(req.body)
        return respon(res, 200, result)
    } catch (error) {
        return respon(res, 502, error)
    }
}

history.del = async (req, res) => {
    try {
        const result = await model.delHistory(req.query.id)
        return respon(res, 200, result)
    } catch (error) {
        return respon(res, 404, error)
    }
}

module.exports = history