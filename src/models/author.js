const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  } ,
  bio: {
    type : String,
    required:true
  }
});

const Author = mongoose.model('AuthorC', authorSchema);
module.exports = Author;
