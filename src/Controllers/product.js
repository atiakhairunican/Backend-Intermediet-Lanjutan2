/* eslint-disable no-undef */
const product = {}
const respon = require("../Helpers/respon")
const model = require("../Models/product")
const cloudUpload = require("../Helpers/cloudUpload")
const {redisdb} = require("../Configs/redis")
const loggers = require("../Configs/wins")

product.get = async (req, res) => {
    try {
        const result = await model.getProd()
        const saveRedis = JSON.stringify(result)
        redisdb.setex("products", 60, saveRedis)
        loggers.info("Get product from postgres", result)
        return respon(res, 200, result)
    } catch (error) {
        loggers.warn("Cannot get product", error)
        return respon(res, 400, error)
    }
}

product.search = async (req, res) => {
    try {
        const result = await model.searchProd(req.body.name)
        loggers.info("Search name product", result)
        return respon(res, 200, result)
    } catch (error) {
        loggers.warn("Cannot search name product", error)
        return respon(res, 400, error)
    }
}

product.orderedAll = async (req, res) => {
    try {
        const {name, price, category, orderBy, order} = req.query
        const result = await model.orderedAllProd(name, price, category, orderBy, order)
        loggers.info("Search product", result)
        return respon(res, 200, result)
    } catch (error) {
        loggers.warn("Cannot search product", error)
        return respon(res, 400, error)
    }
}

product.ordered = async (req, res) => {
    try {
        const result = await model.orderedProd(req.query.orderBy, req.query.order)
        loggers.info("Order product", result)
        return respon(res, 200, result)
    } catch (error) {
        loggers.warn("Cannot order product", error)
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
        loggers.info("Add product was successfull", result)
        return respon(res, 200, result)
    } catch (error) {
        loggers.warn("Cannot add product", error);
        return respon(res, 500, error)
    }
}

product.update = async (req, res) => {
    try {
        if (req.file === undefined) {
            loggers.info("Update product failed: check image product")
            return respon(res, 500, {message: "Image must be filled"})
        }
        const nameAsId = await model.searchProd(req.body.oldName)
        // const check = await model.getProd()
        // check.find((res) => { req.body.id == res.id })
        if (nameAsId.length == 0) {
            loggers.info("Update product failed: check old name product")
            return respon(res, 200, {message: `Data with old name = ${nameAsId[0].name_product} doesn't exist`})
        }
        req.body.id = nameAsId[0].id_product
        req.body.image = await cloudUpload(req.file.path)
        const result = await model.updateProd(req.body)
        redisdb.del("product")
        loggers.info("Update product was successfull", result)
        return respon(res, 200, result)
    } catch (error) {
        loggers.warn("Update product failed", error)
        return respon(res, 502, error)
    }
}

product.del = async (req, res) => {
    try {
        const result = await model.delProd(req.query.name)
        redisdb.del("product")
        loggers.info("Product was deleted", result)
        return respon(res, 200, result)
    } catch (error) {
        loggers.warn("Delete product failed", error)
        return respon(res, 404, error)
    }
}

module.exports = product