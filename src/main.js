/* eslint-disable no-undef */
const express = require("express")
const router = express.Router()
const product = require("./Routers/product")
const users = require("./Routers/users")
const auth = require("./Routers/auth")
const {cloudinaryConfig} = require("./Configs/cloudinary")

router.use("*", cloudinaryConfig)
router.use("/product", product)
router.use("/users", users)
router.use("/auth", auth)

module.exports = router