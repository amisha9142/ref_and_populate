const express = require("express")
const { createUser, login } = require("../controllers/user")
const router = express.Router()

router.post("/create-user",createUser)
router.post("/login-user",login)
module.exports = router