/* eslint-disable no-undef */
const hashPassword = require("../Helpers/hash")
const respon = require("../Helpers/respon")
const model = require("../Models/users")

class Users {
    async add(req, res) {
        try {
            const check = await model.getByEmail(req.body.email)
            if(check.length > 0) {
                return respon(res, 401, {message: "Email is already registered."})
            }
            else if (req.body.name == undefined || req.body.email == undefined
                || req.body.password == undefined || req.body.role == undefined) {
                return respon(res, 401, {message: "Make sure all data is filled."})
            }
            else if (req.body.role != "admin" && req.body.role != "customer") {
                return respon(res, 401, {message: "Filled between admin or customer."})
            }
            else {
                const newPassword = await hashPassword(req.body.password)
                const users = {
                    name : req.body.name,
                    email : req.body.email,
                    password : newPassword,
                    role : req.body.role
                }
                const result = await model.add(users)
                return respon(res, 200, result)
            }
            
        } catch (error) {
            return respon(res, 500, error)
        }
    }

    async getAll(req, res) {
        try {
            const result = await model.getAll()
            return respon(res, 200, result)
        } catch (error) {
            return respon(res, 500, error)
        }
    }

    async update(req, res) {
        try {
            const check = await model.getByEmail(req.body.email)
            if (req.body.name == undefined || req.body.email == undefined
                || req.body.password == undefined || req.body.role == undefined
                || req.body.id == undefined) {
                return respon(res, 401, {message: "Make sure all data is filled."})
            }
            else if (req.body.role != "admin" && req.body.role != "customer") {
                return respon(res, 401, {message: "Filled between admin or customer."})
            }
            else {
                const newPassword = await hashPassword(req.body.password)
                const users = {
                    id : req.body.id,
                    name : req.body.name,
                    email : req.body.email,
                    password : newPassword,
                    role : req.body.role
                }
                const result = await model.update(users)
                return respon(res, 200, result)
            }
            
        } catch (error) {
            return respon(res, 500, error)
        }
    }

    async del(req, res) {
        try {
            const result = await model.del(req.query.id)
            return respon(res, 200, result)
        } catch (error) {
            return respon(res, 500, error)
        }
    }
}

module.exports = new Users()