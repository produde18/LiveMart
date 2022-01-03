import React from 'react';
import Layout from '../../components/Layout';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import LiveMartLogo from "../../images/logo/LiveMart.png"

/**
* @author
* @function Home
**/

const Home = (props) => {
  var styles ={
      "background-color":"#D3D3D3"
    }
const auth = useSelector(state => state.auth);
  return (
    <Layout sidebar>
      <Jumbotron 
        style={styles} 
        className="text-center">
            <img src={LiveMartLogo}  alt="" />
            <h1 >Welcome to the Merchant Dashboard, <b>{auth.user.fullName}</b> </h1> <br/>
            <p>Here, you can add products that you want to sell, in an easy and convenient way. All you have to do is list your product's category, price, description and some images. Rest all, you leave on us. <br/> <br/> <h4><b> Happy Selling!</b></h4> </p>
            <br/>
        </Jumbotron>
    </Layout>
  )

}

export default Home