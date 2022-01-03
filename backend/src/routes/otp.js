const express = require('express');
const router = express.Router();
const path = require('path');

const {otpGeneration} = require('../controller/otp');
router.get("/otpgeneration", function(req,res) {
res.sendFile(path.join(__dirname+'/otp.html'));
});
router.post('/otpgeneration',otpGeneration);
router.get("/otpsuccess", function(req,res) {
res.sendFile(path.join(__dirname+'/message.html'));
});
module.exports = router;