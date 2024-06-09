const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./src/routes/user");
const authorRoute = require("./src/routes/author");
const bookRoute = require("./src/routes/book")

const dotenv = require("dotenv");
dotenv.config({path:"./.env"})


const app = express();
app.use(express.json()); 

app.use("/api/user", userRoute);
app.use("/api/author",authorRoute);
app.use("/api/book",bookRoute);


mongoose.connect(process.env.DB).then(()=>{
    console.log("monogdb is connected.")
}).catch((error)=>{
    console.log(error)
})

port = process.env.PORT

app.listen(port, function () {
  console.log("express app is running on port ", 3000);
});

