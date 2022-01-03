const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
var nodemailer =require('nodemailer');
var OTP_generated;

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Merchant already registered",
      });

    User.estimatedDocumentCount(async (err, count) => {
      if (err) return res.status(400).json({ error });
      let role = "admin";
      if (count === 0) {
        role = "super-admin";
      }

      const { firstName, lastName, email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username: shortid.generate(),
        role,
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Admin created Successfully..!",
          });
        }
      });
    });
  });
};

exports.genOTP =(req,res) =>{

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'livemart17@gmail.com',
    pass: 'dopaminers'
    }
});
// var a =Math.random();
// a=a*10000;
// a=Math.floor(a) ;
var min = 1000;
var max = 9999;
OTP_generated= Math.floor(Math.random() * (max-min + 1)) + min;
//console.log("Your OTP is "+OTP_generated);

var mailOptions = {
    
    from: 'livemart17@gmail.com',
    to:   'aruanant1999@gmail.com',
    subject: 'OTP for LiveMart SignIn',
    text: `Your OTP for LiveMart Sign In is ${OTP_generated}`
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else 
    {
    //console.log('Email sent: ' + info.response);

    }
});
}


exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    //genOTP(req.body.email);



    if (user) {
      // const entered_OTP =req.body.OTP;
      //console.log(entered_OTP)
      // const isPassword = await user.authenticate(req.body.password);
      var isPassword =0;
      if(req.body.password==user.otp)
        {isPassword=1;}
        else  isPassword = await user.authenticate(req.body.password);
      if (
        (isPassword) &&
        (user.role === "admin" || user.role === "super-admin")
      ) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName},
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
