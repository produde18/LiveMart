import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Table, Jumbotron , Alert, Form, ListGroup} from 'react-bootstrap'
import { createReview, getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { addToCart } from "../../actions";
import { PRODUCT_REVIEW_CREATE_REQUEST } from "../../actions/constants";
import MessageBox from "../../components/MessageBox";
import LoadingBox from "../../components/LoadingBox";

/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
   //const productId = props.match.params.id;
  // //const productDetails = useSelector((state) => state.product);
  // const { loading, error, productDetail } = product;
  // const productReviewCreate = useSelector((state) => state.productReviewCreate);
  // const {
  //   loading: loadingReviewCreate,
  //   error: errorReviewCreate,
  //   success: successReviewCreate,
  // } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] =useState('');
  // useEffect(() => {
  //   if (successReviewCreate) {
  //     window.alert('Review Submitted Successfully');
  //     setRating('');
  //     setComment('');
  //     dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
  //   }
  //   dispatch( getProductDetailsById(productId));
  // }, [dispatch, productId, successReviewCreate]);
  // // // const addToCartHandler = () => {
  // // //   props.history.push(`/cart/${productId}?qty=${qty}`);
  // // // };
  const submitHandler = (e) => {
    e.preventDefault();
    const { productId } = props.match.params;
    console.log(props);
    const payload = {
      params: {
        productId,
      },
    };
    if (userName && comment && rating) {
      dispatch(
        createReview(productId, { userName, rating, comment  })
      );
    } else {
      alert('Please fill out the Product Review Fields');
    }
  };

  useEffect(() => {
    const { productId } = props.match.params;
    console.log(props);
    console.log(productId);
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetails.productPictures.map((thumb, index) => (
              <div className="thumbnail">
                <img src={thumb.img} alt={thumb.img} />
              </div>
            ))}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                src={product.productDetails.productPictures[0].img}
                alt={`${product.productDetails.productPictures[0].img}`}
              />
            </div>
              <br/>
            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  props.history.push(`/cart`);
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  props.history.push(`/cart`);
                }}
              />
             
            </div> <br/>
          </div> 
        </div> 
        <div> 
          {/* home > category > subCategory > productName */}
          
          <div className="breed">
            
            <ul>
              <li>
                <a href="#">Home</a>
                <IoIosArrowForward />
              </li>
              {/* <li>
                <a href="#">{product.productDetails.category.name}</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#"></a>
                <IoIosArrowForward />
              </li> */}
              <li>
                <a href="#">{product.productDetails.name}</a>
              </li>
            </ul>
            
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">
                4.2 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                1,284 Ratings & 287 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <BiRupee />
              4500 off{" "}
            </div>
            <div className="flexRow priceContainer">
              <span className="price">
                <BiRupee />
                {product.productDetails.price}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                25% off
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
          </div>
          <br/><br/>
            <h5 className="reviewHead" id="reviews">Customer Reviews</h5>
            {product.reviews === null && (
              <><MessageBox className="reviewHead">No reviews for the Product <br/></MessageBox><br/> <br/></>
            )}
            <Table  className ="reviewHead1">
              <thead> 
              <tr>
                <th>Customer Name</th>
                <th>Review</th>
                <th>Ratings</th>
              </tr>
              </thead>
              <tbody>
              
              {product.productDetails.reviews.map((review) => (
                <><tr><td  key={review._id}>
                  {review.userName}
                  
                </td>
                <td><p>{review.comment}</p></td>
                <td>{review.rating}</td>
                </tr></>
              ))}
              
              </tbody>
              </Table> <br/> 
                  {/* <  method = "post" onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                      <h2>Please submit the Product Review Below</h2>
                      <Form.Label>Customer Name</Form.Label>
                    </Form.Group>
                    <div>
                      <label htmlFor="userName">Your Name</label>
                      <textarea
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      ></textarea>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excellent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Add Your Review Here</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    {/* <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div> */}
                  <Form style={{marginLeft:"20px"}} method="post" onSubmit={submitHandler}>
                    <Form.Group>
                      <Form.Text style={{color :"#388e3c"}}><h5>Submit A Review</h5></Form.Text>
                    <Form.Label htmlFor="userName">Your Name</Form.Label>
                    <Form.Control  id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)} placeholder="Enter your Name" />
                    
                    </Form.Group>

                      <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label htmlFor="rating">Rating</Form.Label>
                      <Form.Control as="select" id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      </Form.Control>
                      </Form.Group>


                    <Form.Group >
                    <Form.Label htmlFor="comment">Review</Form.Label>
                    <Form.Control id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}  placeholder="Your Review Here " />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Display your review on LiveMart" />
                    </Form.Group>
                    <Form.Text className="text-muted">
                      Your reviews are taken for enhancement of our services
                    </Form.Text> <br/>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                    </Form>
              
            
          
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
