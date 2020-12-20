/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const respon = require("../Helpers/respon")
const jwt = require("jsonwebtoken")

const checkToken = (role) => {
    return function(req, res, next) {
        const {authtoken} = req.headers
        let isAccess = false

        if (!authtoken) {
            return respon(res, 401, {message: "Please login"})
        }

        jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode) => {
            if (err) {
                return respon(res, 401, err)
            }
            role.map(value => {
                if (value == decode.role) {
                    isAccess = true
                }
            })
            
            if(isAccess) {
                next()
            }
            else {
                respon(res, 401, {message: "You are not permitted"})
            }
        })
    }
}

module.exports = checkToken