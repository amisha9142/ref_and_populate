const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
} = require("../utilis/validation");
// create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // validation
    if (!email) {
      return res
        .status(422)
        .json({ status: false, message: "email is required" });
    }
    if (!password) {
      return res
        .status(422)
        .json({ status: false, message: "password is required" });
    }
    if (!phone) {
      return res
        .status(422)
        .json({ status: false, message: "phone no is required" });
    }

    if (!name) {
      return res
        .status(422)
        .json({ status: false, message: "name is required" });
    }

    // email validation
    const existingEmail = await User.findOne({  // if condition doesn't match then findone return null otherwise object.
// find->  if condition doesn't match it reutrn empty array otherwise array . 
      email: email,  // first email is database email & second email is our postman email
    });
    // console.log(existingEmail,"sdfghj,")
    if (existingEmail) {
      return res
        .status(400)
        .json({ status: false, message: "email already exist" });
    }

    // phone validation
    const existingPhone = await User.findOne({
      phone: phone,
    });
    console.log(existingPhone,"fghjk")
    if (existingPhone) {
      return res
        .status(400)
        .json({ status: false, message: "phone no already exist" });
    }

    // validate email
    if (!validateEmail(email)) {
      return res.status(400).json({
        status: false,
        message: "email must contain character,digit and special character.",
      });
    }

  
    if (!validateName(name)) {
      return res.status(400).json({
        status: false,
        message: "name is invalid",
      });
    }

    // validate password
    if (!validatePassword(password)) {
      return res.status(400).json({
        staus: false,
        message:
          "password must contain uppercase and lowercase , digit and a special character ",
      });
    }

    //validate phone
    if (!validatePhone(phone)) {
      return res
        .status(400)
        .json({ status: false, message: "phone no is not valid" });
    }

    const bcryptPassword = await bcrypt.hash(password, 10);  // read yourself

    // Create a new user object
    const newUser = await User.create({
      name,
      email,
      phone,
      password: bcryptPassword,
    });

    return res.status(201).send({
      status: true,
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};


// // login api
exports.login = async(req,res)=>{
    try{
        const{email,password} = req.body
        if(!email){
            return res.status(422).json({status:false,message:"email is required"})
        }
        if(!password){
            return res.status(422).json({status:false,message:"password is required"})
        }

        // email validation
        const existingEmail = await User.findOne({
            email:email
        })
        console.log(existingEmail,"fghj")
        if(!existingEmail){
            return res.status(400).json({status:false,message:"invalid email id or password"})
        }
const hashedPassword = existingEmail.password
console.log(hashedPassword)
        // password validation
        const validatePassword = await bcrypt.compare(password,hashedPassword)
        if(!validatePassword){
            return res.status(400).json({status:false,message:"invalid email id or password"})
        }

        // token generator
        const token = jwt.sign({userId:existingEmail._id},process.env.JWT_SECRET,{
            expiresIn : "5d"  // 5 days
        })
        return res.status(200).json({status:true,message:"user login successfully",token,data:existingEmail})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal servor error"})
    }
}
