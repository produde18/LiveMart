import React from 'react';
import Header from '../Header';
import { Container, Row, Col } from 'react-bootstrap'; 
import { NavLink } from 'react-router-dom';
import './style.css';
import Footer from '../Footer'
/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <>
       <Header /> 
       {
         props.sidebar ?
         <Container fluid>  
          <Row>  
            <Col md={2} className="sidebar" style={{marginTop:'10px'}}>
              <ul>
                <li><NavLink   exact to={`/`}>Home</NavLink></li>
                <li><NavLink style={{ backgroundColor: "#5cb85c " }} to={`/page`}>Page</NavLink></li>
                <li><NavLink style={{ backgroundColor: "#f0ad4e " }} to={`/category`}>Category</NavLink></li>
                <li><NavLink style={{ backgroundColor: "#d9534f " }} to={`/products`}>Products</NavLink></li>
                <li><NavLink style={{ backgroundColor: "#0275d8" }} to={`/orders`}>Orders</NavLink></li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
              
              {props.children}
              
            </Col>
          </Row>
        </Container>
        :
        props.children
        
       }
        
    </>
   )

 }

export default Layout;