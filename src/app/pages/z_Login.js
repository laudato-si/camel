import React, { useState, useEffect } from 'react';
import { Redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Url from "../api/url";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            console.log(localStorage.getItem("token"));
            console.log('there is login')
        } else {
            console.log('no login')
        }
      }, []);

      const isEditor = (name) => {
        axios    
          .get(Url.baseUrl + `/user/?search=${name}`, {
            headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          })
          .then((res) => {
            const groups = res.data.results[0].groups
            groups.map((group) => {
              if(group.name == 'editorwomen'){
                localStorage.setItem("editorwomen", true);
              }
            })
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const onSubmit = (e) => {
        e.preventDefault();
    
        const user = {
          username: username,
          password: password,
        };
    
        console.log(JSON.stringify(user))
    
        fetch(Url.baseUrl + "/api/authentication/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.key) {
              localStorage.clear();
              localStorage.setItem("token", data.key);
              localStorage.setItem("rana", 'frog');
              console.log("dataKey: ", data.key);
              console.log("data back: ", data);
              localStorage.setItem("username", username);
              // setLoginas(username);
              isEditor(username);
              // setShowLogin(false);
              // setResetAddImageShow(new Date().getTime());
              navigate('/')

            } else {
              setUsername("");
              setPassword("");
              localStorage.clear();
              setErrors(true);
            }
          });
      };

    return (
        <>
          <div className="login_container">
            <img
              className="login_img"
              src={require("../static/img/back.jpg")}
            />
          </div>
          <Row className="align-items-center login_container_form">
            <Form>
              {errors === true && (
                <Row className="justify-content-center">
                  <Col sm={6}>
                    <Alert variant="danger">
                      Cannot log in with provided credentials
                    </Alert>
                  </Col>
                </Row>
              )}
              <Row className="justify-content-center">
                <Col sm={6}>
                  <Row className="justify-content-center">
                    <Col sm={6}>
                      <Form.Group className="mb-3" controlId="f1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          name="username"
                          type="text"
                          value={username}
                          required
                          placeholder="username"
                          onChange={(e) => setUsername(e.target.value)}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col sm={6}>
                      <Form.Group className="mb-3" controlId="f1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          value={password}
                          required
                          placeholder="password"
                          onChange={(e) => setPassword(e.target.value)}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col sm={6}>
                      <Button variant="success" onClick={onSubmit}>
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Row>
        </>
    );
}

export default Login;
