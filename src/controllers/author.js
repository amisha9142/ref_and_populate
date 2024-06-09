const AuthorModel = require("../models/author");
// const Book = require("../models/book");

exports.createAuthor = async (req, res) => {
  try {
    const { name,age,bio } = req.body;
    const author = await AuthorModel.create({
        name,age,bio
    });
    return res.status(201).json({
      success: true,
      message: "author created successfully",
      data: author,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};



