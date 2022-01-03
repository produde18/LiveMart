import React from 'react'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import MenuHeader from '../../components/MenuHeader'
import {Carousel, Alert} from 'react-bootstrap'
import '../HomePage/index.css'
//import'../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import "bootstrap/dist/css/bootstrap.css";
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
/**
* @author
* @function HomePage
**/
import LiveMartLogo from '../../images/logo/LiveMart.png'
const HomePage = (props) => {
  return(
    <Layout> 
      {/* <Alert className="covid" variant = "danger">
      <img className="center" src={LiveMartLogo} alt=""/>
      <a className="anc" href="https://ncdc.gov.in/index1.php?lang=1&level=1&sublinkid=703&lid=550">COVID-19 GuideLines (India)</a>
      </Alert> */}
      
      <Carousel className ="carf">
  <Carousel.Item>
    <Carousel.Caption>
      <h3>The Exclusive Apple Store</h3>
      <p>Apple Products at Best Prices</p>
    </Carousel.Caption>
    <a href="http://localhost:3000/Apple-nh8UOBSzUi?cid=607eb6a88425e33f2cc30ca9&type=product">
    <img
      className="d-block w-100"
      src="https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      //src ="https://images.pexels.com/photos/1069798/pexels-photo-1069798.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
      alt="First slide"
    /></a>
    
  </Carousel.Item>

  <Carousel.Item>
    <a href="http://localhost:3000/Novels-sjo5mdgF92?cid=60802546df1dfe2fbda05b66&type=undefined"><img
      className="d-block w-100"
      src="https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      alt="Second Slide"
    /></a>

    <Carousel.Caption>
      <h3>Books at LiveMart </h3>
      <p>Today a Reader, Tomorrow a Leader.Shop Now at LiveMart</p>
    </Carousel.Caption>
  </Carousel.Item>


    <Carousel.Item>
    <a href="http://localhost:3000/Rings-D8JVOlzyxk?cid=607eccfa7b61bc31908190d2&type=undefined"><img
      className="d-block w-100"
      src="https://images.pexels.com/photos/5737292/pexels-photo-5737292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      alt="Second Slide"
    /></a>

    <Carousel.Caption>
      <h3>Certified Jewelry on LiveMart </h3>
      <p>Authenticity Guaranteed. Shop Now!</p>
    </Carousel.Caption>
  </Carousel.Item>

  
  <Carousel.Item>
    <a href="http://localhost:3000/Polos--xlWm2l_L?cid=607ec80d7b61bc31908190cc&type=undefined"><img
      className="d-block w-100"
      src="https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      alt="Second Slide"
    /></a>



    <Carousel.Caption>
      <h3>Polos for Men</h3>
      <p>Polos at best prices on LiveMart. Shop Now!</p>
    </Carousel.Caption>
  </Carousel.Item>

</Carousel>
</Layout>

   )

 }

export default HomePage