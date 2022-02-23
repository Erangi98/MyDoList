import React, { useEffect } from 'react'
import MainScreen from '../../Components/MainScreen';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updateProfile } from '../../Actions/userActions';
import Loading from '../../Components/Loading';
import ErrorMessage from '../../Components/ErrorMessage';
import './ProfilePage.css';

const ProfilePage = ({location, history}) => {
    const [username, setusername] = useState("");
    const [useremail, setuseremail] = useState("");
    const [userpassword, setuserpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [message, setmessage] = useState(null);

    const dispatch = useDispatch();

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    const updateUserProfile = useSelector((state) => state.updateUserProfile);
    const { loading, error, success } = updateUserProfile;

    useEffect(() => {
      if(!userInfo){
          history.push("/");
      }else{
          setusername(userInfo.username);
          setuseremail(userInfo.useremail);
      }     
    }, [history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

       if( userpassword === confirmpassword){
           dispatch(updateProfile({ username, useremail, userpassword}));
       } else{
        setmessage("Error passwords are not matching");
       }
            
    };
    
  return (
    <MainScreen title="Your Profile">
    <div>
        <Row className='profileContainer'>
            <Col md={6}>
                <Form onSubmit={submitHandler}>
                {loading && <Loading />}
                {success && (
                    <ErrorMessage variant="success">
                        Successfully Updated
                    </ErrorMessage>
                )}
                {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setusername(e.target.value)} 
                    />
                </Form.Group>


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
                    onChange={(e) => setuserpassword(e.target.value)} 
                    />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)} 
                    />
                </Form.Group>{" "}

                <div className='btns'>
                <Button type="submit">
                    Update Profile
                </Button>{" "}
                </div>
                </Form>
            </Col>
        </Row>
    </div>
</MainScreen>
  )
}

export default ProfilePage