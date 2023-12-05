import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import Url from "../api/url";   //npm i --save react-select
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Moment from "moment";
import Image from 'react-bootstrap/Image';

function Input(props) {

    const headers = {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
    };   

    const params = useParams();
    const id = params.id;
    
    useEffect(() => {     

    }, []);
     
    return (
    <Container>
        <h1>{id}</h1>
        <h1>hola</h1>

    </Container>
    );
}

export default Input;