import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../Actions/userActions';
import Loading from '../../Components/Loading';
import ErrorMessage from '../../Components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import MainScreen from "../../Components/MainScreen"
import './SignUpPage.css';

const SignUpPage = () => {
  const history = useNavigate();


  const [username, setusername] = useState("");
  const [useremail, setuseremail] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [message, setmessage] = useState(null);


  const dispatch = useDispatch();

  const userSignUp = useSelector((state) => state.userSignUp);
  const { loading, error, userInfo } = userSignUp;



  useEffect(() => {
    if (userInfo) {
      history("/mytasklist");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (userpassword !== confirmpassword) {
      setmessage("Error passwords are not matching")
    } else {
      dispatch(signUp(username, useremail, userpassword));
    }
  };


  return (
    <MainScreen title='Register'>
      <div className="registerContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              required
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Enter email"
              value={useremail}
              onChange={(e) => setuseremail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Password"
              value={userpassword}
              onChange={(e) => setuserpassword(e.target.value)}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
            />
          </Form.Group>

          <div>
            <Button type="submit" variant="primary" >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </MainScreen>

  );
};

export default SignUpPage;