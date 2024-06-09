const express = require("express")
const { createBook, getBooks } = require("../controllers/book")
const router = express.Router()

router.post("/create-book",createBook)
router.get("/get-books",getBooks)

module.exports = router