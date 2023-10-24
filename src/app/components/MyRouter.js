import React, { Component, useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link, Navigate, Router } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Dashboard from "../pages/Dashboard"
import People from "../pages/People";
import Groups from "../pages/Groups";
import Group from "../pages/Group";
import PeopleDetail from "../pages/PeopleDetail";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Product from "../pages/Product";
import ProductCat from "../pages/ProductCat";
import Input from "../pages/Input";
import Test from "../pages/Test"
import TestList from "../pages/TestList";


function MyRouter() {

  const [name, setName] = useState("")
  const [auth, setAuth] = useState(false)

 
  useEffect(() => {     
    setName(localStorage.getItem("name"));
    console.log(localStorage.getItem("name"))
    if (localStorage.getItem("name") !== null){
      setAuth(true);
    }else{
      console.log('hola')
    }
  }, []);

  return (  
    <HashRouter basename="/">

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">Camel</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link className="mynav" to="/">Dashboard</Link>
              {/* <Link className="mynav" to="/test">Test</Link>
              <Link className="mynav" to="/testlist">TestList</Link> */}
              {auth &&
              <>
                <Link className="mynav" to="/people">People</Link>  
                <Link className="mynav" to="/groups">Groups</Link>  
                <Link className="mynav" to="/productcat">Categories</Link>  
              </>
              }
              {!auth &&
              <Link className="mynav" to="/login">Login</Link>  
            }
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {auth &&
            <>
            <Navbar.Text>
              Signed in as: {name}
            </Navbar.Text>
            <Link className="mynav" to="/logout">Logout</Link>         
            </>
            }
          </Navbar.Collapse>
      </Container>
    </Navbar>

      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />}/>
        <Route path="/people" element={<People />}/>
        <Route path="/groups" element={<Groups />}/>
        <Route path="/group/:id" element={<Group />}/>
        <Route path="/people/:id" element={<PeopleDetail />} />  
        <Route path="/productcat" element={<ProductCat />} />  
        <Route path="/product/:id" element={<Product />} />  
        <Route path="/input/:id" element={<Input />} />  
        <Route path="/test" element={<Test />} />  
        <Route path="/test/:id" element={<Test />} />  
        <Route path="/testlist" element={<TestList />} />  
      </Routes>

    </HashRouter>
  );
}

export default MyRouter;
