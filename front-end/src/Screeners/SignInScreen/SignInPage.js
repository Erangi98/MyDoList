import React from 'react';
import { useState, useEffect } from 'react';
import { MainScreen } from '../../Components/MainScreen';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../Actions/userActions';
import Loading from '../../Components/Loading';
import ErrorMessage from '../../Components/ErrorMessage';
import './SignIn.css';



const SignInPage = () => {

    const history = useNavigate();
    
     const [useremail, setuseremail] = useState("");
     const [userpassword, setuserPassword] = useState("");

     const dispatch = useDispatch();

     const userSignIn = useSelector((state) => state.userSignIn);
     const {loading, error, userInfo} = userSignIn;

     useEffect(() => {
         if(userInfo) {
             history("/mytasklist");
         }
     }, [history, userInfo]);
     
     
     
     const submitHandler = async (e) => {
         e.preventDefault();

         dispatch(signIn(useremail, userpassword));

             
     };

  return (
   <MainScreen title="LOGIN">
    <div className="loginContainer">
    {error && <ErrorMessage variant="danger">{ error }</ErrorMessage>}
    {loading && <Loading />}
   <Form onSubmit={submitHandler}>
  
   <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Email address</Form.Label>
     <Form.Control 
     type="email" 
     placeholder="Enter email"
     value={useremail}
     onChange={(e) => setuseremail(e.target.value)} 
     />
   </Form.Group>
 
   <Form.Group className="mb-3" controlId="formBasicPassword">
     <Form.Label>Password</Form.Label>
     <Form.Control 
     type="password" 
     placeholder="Password"
     value={userpassword}
     onChange={(e) => setuserPassword(e.target.value)} 
     />
   </Form.Group>
   
   <div>
   <Button variant="primary" type="submit">
     Login
   </Button>
   </div>

   <Row className="py-3">
       <Col>
           Are you a new user ? {" "}
           <Link className="hlink" to="/signUp">
               Register Today
           </Link>
       </Col>
   </Row>

   <Row className="py-3">
       <Col>
           {" "}
           <Link className="hlink" to="/forgotpassword">
               Forgot Password
           </Link>
       </Col>
   </Row>
   
 </Form>
 </div>
 </MainScreen>
  )
}

export default SignInPage