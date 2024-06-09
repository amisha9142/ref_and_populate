// const Author = require("../models/author");
const BookModel = require("../models/book");

exports.createBook = async (req, res) => {
  try {
    const { title, genre, author } = req.body;
    const book = await BookModel.create({
      title,
      genre,
      author,
    });
    return res.status(201).json({
      success: true,
      message: "book created successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};



exports.getBooks = async (req, res) => {
    try {
      const books = await BookModel.find().populate('author');  // author model ka 12 no line -> schema ka key name hai jiske andr hm id pass krte h 
      return res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: books,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };