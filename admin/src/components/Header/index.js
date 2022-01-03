import React from "react";
import { Button,Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './index.css';
import { signout } from "../../actions";
import LiveMartLogo from "../../images/logo/LiveMart.png"
/**
 * @author
 * @function Header
 **/

const Header = (props) => {
   
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            <Button variant ="danger"><b>Logout</b></Button>
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="signin" className="nav-link"><Button variant ="outline-warning"><b>Sign In</b></Button>
            
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="signup" className="nav-link">
            <Button variant="outline-warning"><b>Sign Up</b></Button>
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <div>
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="md"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <div className="logo">
          <a href="http://localhost:4000">
            <img src={LiveMartLogo} className="logoimage" alt="" />
          </a></div>
        <Link  style={{color:"#9AE19D"}} to="/" className="navbar-brand"><b><b>Merchant Dashboard</b>
          </b>
        </Link>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar> <br/>
    </div>
  );
};

export default Header;
