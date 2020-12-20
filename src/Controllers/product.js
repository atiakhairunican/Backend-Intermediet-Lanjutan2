/* eslint-disable no-undef */
const product = {}
const respon = require("../Helpers/respon")
const model = require("../Models/product")
const cloudUpload = require("../Helpers/cloudUpload")
const {redisdb} = require("../Configs/redis")

product.get = async (req, res) => {
    try {
        const result = await model.getProd()
        const saveRedis = JSON.stringify(result)
        redisdb.setex("products", 60, saveRedis)
        console.log("Data from postgres");
        return respon(res, 200, result)
    } catch (error) {
        return respon(res, 400, error)
    }
}

product.orderedAll = async (req, res) => {
    try {
        const {name, price, category, orderBy, order} = req.query
        const result = await model.orderedAllProd(name, price, category, orderBy, order)
        return respon(res, 200, result)
    } catch (error) {
        return respon(res, 400, error)
    }
}

product.ordered = async (req, res) => {
    try {
        const result = await model.orderedProd(req.query.orderBy, req.query.order)
        return respon(res, 200, result)
    } catch (error) {
        return respon(res, 400, error)
    }
}

product.add = async (req, res) => {
    try {
        if (req.file === undefined) {
            return respon(res, 500, {message: "Image must be filled"})
        }
        req.body.image = await cloudUpload(req.file.path)
        const result = await model.addProd(req.body)
        redisdb.del("product")
        return respon(res, 200, result)
    } catch (error) {
        console.log(error);
        return respon(res, 500, error)
    }
}

product.update = async (req, res) => {
    try {
        if (req.file === undefined) {
            return respon(res, 500, {message: "Image must be filled"})
        }
        const check = await model.getProd()
        check.find((res) => { req.body.id == res.id })
        if (check.length == 0) {
            return respon(res, 200, {message: `Data with ID = ${req.body.id} doesn't exist`})
        }
        req.body.image = await cloudUpload(req.file.path)
        const result = await model.updateProd(req.body)
        redisdb.del("product")
        return respon(res, 200, result)
    } catch (error) {
        return respon(res, 502, error)
    }
}

product.del = async (req, res) => {
    try {
        const result = await model.delProd(req.query.id)
        redisdb.del("product")
        return respon(res, 200, result)
    } catch (error) {
        return respon(res, 404, error)
    }
}

module.exports = product