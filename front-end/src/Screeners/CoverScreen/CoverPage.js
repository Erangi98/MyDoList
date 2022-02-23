
import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './CoverPage.css';

const CoverPage = ({ history }) => {
  const navigate = useNavigate();
  useEffect(() => {

    const userInfo = localStorage.getItem("userInfo");
    
    if(userInfo) {
      navigate("/mytasklist");
    }


}, [history]);

  return (
    <div className='main'>
    <Container>
        <Row>
          <div className='intro-text'>
          <h1 className="title">Welcome To My Task List App</h1>
          <p className='subtitle'>All your tasks in a one place..</p>
          </div>
          
          <div className='buttonContainer'>

            <a href='/signIn'>
              <Button size="lg"
                  className="landingbutton" variant="outline-primary">Login</Button>
            </a>

            <a href='/signUp'>
              <Button size="lg" className="landingbutton">Register</Button>
            </a>
          </div>
        </Row>
    </Container>
    
    </div>
  )
}

export default CoverPage