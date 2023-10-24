import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function Dashboard(props) {

  const navigate = useNavigate();

  useEffect(() => {     
    console.log(localStorage.getItem("name"))
    if (localStorage.getItem("name") === null){
      console.log('in')
      navigate('/login', { replace: true });
    }else{
      navigate('/', { replace: true });
    }
  }, []);


    return (
      <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col xs={12} md={8} lg={4} style={{backgroundColor: 'red'}}>
          <h1>Dashboard</h1>
        </Col>
      </Row>
    </Container> 
     );
}

export default Dashboard;
