const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const express = require("express");
const nodemailer =require('nodemailer');
// var app =express();
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// r

exports.otpGeneration =(req, res)=>{

    const min = 1000;
    const max = 9999;
    const generatedOTP= Math.floor(Math.random() * (max-min + 1)) + min;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'livemart17@gmail.com',
        pass: 'dopaminers'
        }
    });
    var mailOptions = {
    
        from: 'livemart17@gmail.com',
        to: req.body.email,
        subject: 'OTP for LiveMart SignIn',
        text: `Your OTP for LiveMart Sign In is ${generatedOTP}`
    };
    transporter.sendMail(mailOptions, function(error){
    // if (error) {
    // console.log(error);
    // } else 
    // {
    //console.log('Email sent' );
    
});
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            //console.log(user);
        //genOTP(user.email,generatedOTP);
        user.otp = generatedOTP;
    }
    user.save((error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
        //res.status(201).json({ message: 'OTP sent to the user', });
        res.redirect('/api/otpsuccess');
        }
    });
    })
}
