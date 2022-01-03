const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const nodemailer =require('nodemailer');
var OTP;
const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (user) {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        return res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      }
    });
  });
};




exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {   //find the user first
    if (error) return res.status(400).json({ error });
    if (user) {
      //genOTP();
      var isPassword =0;
      if(req.body.password==user.otp)
        {isPassword=1;}
        else  isPassword = await user.authenticate(req.body.password);  //checking for authentication

      if ((isPassword)&& user.role === "user") {
        // const token = jwt.sign(
        //   { _id: user._id, role: user.role },
        //   process.env.JWT_SECRET,
        //   { expiresIn: "1d" }
        // );
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
// var genOTP =(OTP, email) =>{

// // var transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     auth: {
// //     user: 'livemart17@gmail.com',
// //     pass: 'dopaminers'
// //     }
// // });
// // var a =Math.random();
// // a=a*10000;
// // a=Math.floor(a) ;
// // var min = 1000;
// // var max = 9999;
// // OTP= Math.floor(Math.random() * (max-min + 1)) + min;
// // //console.log("Your OTP is "+OTP);

// var mailOptions = {
    
//     from: 'livemart17@gmail.com',
//     to: email,
//     subject: 'OTP for LiveMart SignIn',
//     text: `Your OTP for LiveMart Sign In is ${OTP}`
// };

// transporter.sendMail(mailOptions, function(){
//     if (error) {
//     console.log(error);
//     } else 
//     {
//     //console.log('Email sent: ' + info.response);
//     }
// });

// }

// exports.otpGeneration =(req, res)=>{
  
//   const min = 1000;
//   const max = 9999;
//   const generatedOTP= Math.floor(Math.random() * (max-min + 1)) + min;
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//     user: 'livemart17@gmail.com',
//     pass: 'dopaminers'
//     }
// });
//     var mailOptions = {
    
//       from: 'livemart17@gmail.com',
//       to: req.body.email,
//       subject: 'OTP for LiveMart SignIn',
//       text: `Your OTP for LiveMart Sign In is ${OTP}`
//   };
//     transporter.sendMail(mailOptions, function(){
//     if (error) {
//     console.log(error);
//     } else 
//     {
//     //console.log('Email sent: ' + info.response);
//     }
// });
//     User.findOne({ email: req.body.email }).exec(async (error, user) => {
//       if (error) return res.status(400).json({ error });
//       if (user) {
//         //genOTP(user.email,generatedOTP);
//         user.OTP.push(generatedOTP)
          
//       }
//       user.save((error, user) => {
//         if (error) return res.status(400).json({ error });
//         if (product) {
//           res.status(201).json({ message: 'OTP sent to the user', });
//         }
//       });
//     })
// }
