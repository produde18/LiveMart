const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const bodyParser =require('body-parser');
const path = require("path");
const cors = require("cors");
const nodemailer =require('nodemailer');

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");
const otpRoute = require('./routes/otp');
//const OTPRoutes = require("./routes/admin/auth");
//environment variable or you can say constants
env.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// mongodb connection
//mongodb+srv://root:<password>@cluster0.8pl1w.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://root:qwerty205@cluster0.mllx3.mongodb.net/LiveMart?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false, 
    }
  )
  .then(() => {
    console.log("Database connected");  //return a promise
  });

app.use(cors());
app.use(express.json());  //using json to pass the data
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);
app.use("/api", otpRoute);
//app.use("/api",OTPRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
