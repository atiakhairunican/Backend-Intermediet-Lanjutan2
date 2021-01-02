/* eslint-disable no-undef */
const express = require("express")
const router = express.Router()
const control = require("../Controllers/history")

router.get("/", control.get)
router.post("/", control.add)
router.put("/", control.update)
router.delete("/del", control.del)

module.exports = router