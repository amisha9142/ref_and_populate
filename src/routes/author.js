const express = require("express")
const { createAuthor } = require("../controllers/author")
const router = express.Router()

router.post("/create-author",createAuthor)

module.exports = router