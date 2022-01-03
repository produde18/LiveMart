import React, { useState, useEffect } from 'react';
import axios from "../../helpers/axios";
import Layout from '../../components/Layout';
import { Container, Form, Row, Col, Button,Alert, Jumbotron } from 'react-bootstrap';
import Input from '../../components/UI/Input';

import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect} from 'react-router-dom';
import { ReactDOM } from 'react-dom' ;
import './index.css';
//var nodemailer = require('nodemailer');
var http = require('http');
//var OTP_generated;
/**
* @author
* @function Signin
**/

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [OTP, setOTP] =useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    

    const dispatch = useDispatch();  
    


    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email, password,OTP
        }

        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={`/`} />
    }

    const submitRequest = async (e) => {
        e.preventDefault();
        //console.log({ email, message });
        const response = await axios.post("/access", { 
          method: 'POST', 
          headers: { 
              'Content-type': 'application/json'
          }, 
          body: JSON.stringify({email}) 
      }); 
        const resData = await response.json(); 
        if (resData.status === 'success'){
          alert("OTP Sent."); 
          this.resetForm()
      }else if(resData.status === 'fail'){
          alert("OTP failed to send.")
      }
      };



    return (
        <div >
        <Layout> 
            <Container>
                <Row style={{ marginTop: '100px' }}>
                    <Col md={{span: 6, offset: 3}}>
                    <Alert  variant="danger">
                        Please  Sign in  to  continue!
                    </Alert>
                    <Jumbotron>
                        <Form onSubmit={userLogin}>
                            <Input required ="true"
                                label="Email"
                                placeholder="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input 
                                required ="true"
                                label="OTP/Password"
                                placeholder="OTP/Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                            {/* <Input 
                                id ="OTP" value ={OTP}
                                placeholder="Enter your OTP Here"
                                onChange={(e) => setOTP(e.target.value)}
                            /> */}
                            <Row> <Col><Button variant="success" type="submit">
                            <b> Sign In</b>
                            </Button>
                            </Col>
                            <Col></Col>
                            <Col>
                            <Button 
                            variant = "danger"><a style={{color:"inherit"}} href="http://localhost:2000/api/otpgeneration">Request OTP</a></Button>
                            </Col>
                            </Row> <br/> <br/>   
                        </Form>
                                {/* <Form>
                                    <Input
                                        id="OTP" value={OTP}
                                        placeholder="Enter your OTP Here"
                                        onChange={(e) => setOTP(e.target.value)}
                                    />
                                    <Col>
                                        <Button
                                            onClick={submitRequest}
                                            id="show" variant="danger">Request OTP</Button>
                                    </Col>

                                </Form> */}
                        </Jumbotron>
                    </Col>
                </Row>
                
            </Container>    
        </Layout>
        </div>
    )

}

export default Signin