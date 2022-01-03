const mongoose = require('mongoose');
// const reviewSchema = new mongoose.Schema(
//     {
//       //name: { type: String, required: true },
//       comment: { type: String, required: true },
//       rating: { type: Number, required: true },
//     },
//     {
//       timestamps: true,
//     }
//   );
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: { type: Number },
    productPictures: [
        { img: { type: String } }
    ],
    reviews: [
        {
        userName: { type: String },
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
        },
      {
        timestamps: true,
      }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,

}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);