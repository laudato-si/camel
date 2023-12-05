import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Url from "../api/url";

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(Url.baseUrl + `api/login/`, {
        username,
        password,
      });
      console.log('Login successful', response.data);
      // Assuming the API sends back a token upon successful login
      const token = response.data.token;
      // Store the token securely (e.g., in local storage)
      localStorage.setItem('token', token);
      localStorage.setItem('name', username);

      // Redirect to a protected route or user dashboard
      // You can use React Router for navigation
      navigate('/people', { replace: true });
      window.location.reload();

    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
      setErrors(true);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center" style={{ marginTop: '20px'}}>
        <Col xs lg="6">
          <Form>
          {errors === true && (
                <Row className="justify-content-center">
                  <Col>
                    <Alert variant="danger">
                      Cannot log in with provided credentials
                    </Alert>
                  </Col>
                </Row>
          )}
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;