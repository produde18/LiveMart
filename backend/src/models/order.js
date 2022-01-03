const mongoose = require("mongoose");
// A
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAddress.address",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        payablePrice: {
          type: Number,
          required: true,
        },
        purchasedQty: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled", "Refund"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["COD", "Card"],
      required: true,
    },
    orderStatus: [
      {
        type: {
          type: String,
          enum: ["Ordered", "Packed", "Shipped", "Delivered"],
          default: "Ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    Delivery:{
      type:String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
