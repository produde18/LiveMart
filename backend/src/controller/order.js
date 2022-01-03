const Order = require("../models/order");
const Cart = require("../models/cart");
const User =require('../models/user')
const Address = require("../models/address");
var nodemailer=require('nodemailer');
const ordermail =(idCheck, order) =>{
  // User.findOne(({ _id: idCheck },function(err, result){
  //   console.log(result.email)
  // }))

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
// var min = 1000;
// var max = 9999;
// OTP= Math.floor(Math.random() * (max-min + 1)) + min;
// console.log("Your OTP is "+OTP);

var mailOptions = {
    
    from: 'livemart17@gmail.com',
    to: 'manimod71@gmail.com',
    subject: 'LiveMart Order Placed ',
    text: `Dear Customer,\nThank you for Shopping with LiveMart.\nYour Order with ID ${order._id}, and Price Rs. ${order.totalAmount} has been successfully placed.\nWe hope you enjoy our services at LiveMart`
};

transporter.sendMail(mailOptions, function(){
    
  //console.log('Email sent: ');
  
});
}
exports.addOrder = (req, res) => {
  Cart.deleteOne({ user: req.user._id }).exec((error, result) => {;
    if (error) return res.status(400).json({ error });
    if (result) {
      var idCheck =req.user._id;
      req.body.user = req.user._id;
      req.body.orderStatus = [
        {
          type: "Ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "Packed",
          isCompleted: false,
        },
        {
          type: "Shipped",
          isCompleted: false,
        },
        {
          type: "Delivered",
          isCompleted: false,
        },
      ];
      const DelAgents =["Ayush Grover", "Hardik Sharma","Nitish Verma", "Kartik Deep", "Suparth Gupta",  "Abhimanyu Verma", "Harsh Srivastava", "Himanshu Modi", "Rakshit Gandhi", "Parth Bhalla", "Subhash Ahuja", "Utkarsh Sharma"];
      var random =Math.floor(Math.random() * 12);
      const order = new Order(req.body);
      
        order.Delivery =DelAgents[random];
      ordermail(idCheck, order);
      //console.log(us1+"\n"+order);
      order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
          //ordermail(order)
          res.status(201).json({ order });
          
          // ordermail(order)
        }
      });
    }
  });
};

exports.getOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .select("_id paymentStatus paymentType orderStatus items")
    .populate("items.productId", "_id name productPictures")
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};

exports.getOrder = (req, res) => {
  Order.findOne({ _id: req.body.orderId })
    .populate("items.productId", "_id name productPictures")
    .lean()
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        Address.findOne({
          user: req.user._id,
        }).exec((error, address) => {
          if (error) return res.status(400).json({ error });
          order.address = address.address.find(
            (adr) => adr._id.toString() == order.addressId.toString()
          );
          res.status(200).json({
            order,
          });
        });
      }
    });
};
