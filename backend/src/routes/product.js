const express = require("express");
//import express from 'express';
const expressAsyncHandler = require("express-async-handler")
//const {  } = require('../controller/category');
const {
  requireSignin,
  adminMiddleware,
  uploadS3,
} = require("../common-middleware");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
  saveProductReviews,
  //saveProductReviews,
} = require("../controller/product");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });  //middleware before forwarding request to create Product

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  uploadS3.array("productPicture"),
  createProduct
);
router.get("/products/:slug", getProductsBySlug);
//router.get('/category/getcategory', getCategories);
router.get("/product/:productId", getProductDetailsById);
router.delete(
  "/product/deleteProductById",
  requireSignin,
  adminMiddleware,
  deleteProductById
);
router.post(
  "/product/getProducts",
  requireSignin,
  adminMiddleware,
  //saveProductReviews,
  getProducts
);

router.post(
  "/product/:productId",
  //isAuth,
  saveProductReviews
);

module.exports = router;
