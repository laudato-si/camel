import React, { Component, useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Dashboard from "../pages/Dashboard"
import People from "../pages/People";
import PeopleDetail from "../pages/PeopleDetail";
import Trigo from "../pages/Trigo"

function MyRouter() {

  return (  
    <HashRouter basename="/">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href=".">
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link className="mynav" to="/">Dashboard</Link>
          <Link className="mynav" to="/people">People</Link>  
          {/* <Link className="mynav" to="/trigo">trigo</Link>               */}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/people" element={<People />} />    
          <Route path="/people/:id" element={<PeopleDetail />} />  
          <Route path="/trigo" element={<Trigo />} />      
        </Routes>
    </HashRouter>
  );
}

export default MyRouter;
