const bcr = require("bcrypt")
const model = require("../Models/users")
const respon = require("../Helpers/respon")
const jwt = require("jsonwebtoken")

class Auth {
    login = async (req, res) => {
        try {
            const passDB = await model.getByEmail(req.body.email)
            const passUsers = req.body.password
            
            if (req.body.email == undefined || req.body.password == undefined) {
                return respon(res, 200, {message: "Make sure all data is filled"})
            }
            else if (passDB.length == 0) {
                return respon(res, 200, {message: "Email has not been registered."})
            }
            const check = await bcr.compare(passUsers, passDB[0].password)

            if (check) {
                const result = await this.setToken(req.body.email, passDB[0].role)
                return respon(res, 200, result)
            }
            else {
                return respon(res, 200, {message: "Check your password!"})
            }
        } catch (error) {
            return respon(res, 500, error)
        }
    }

    setToken = async (email, role) => {
        try {
            const payload = {
                email : email,
                role : role,
            }
            const token = jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: 600})
            const result = {
                message : "Token created",
                token : token
            }
            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = new Auth()