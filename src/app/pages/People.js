import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import Url from "../api/url";

function People(props) {
    const [peopleList, setPeopleList] = useState([]);
    const headers = {
        Authorization: `Token ${localStorage.getItem("token")}`,
      };    

const getPeople = async() => {
    axios.get(Url.baseUrl + `summary/`)
        .then((response) => {
            let res = response.data
            // const payLedger = 'ledger'
            // const payKey = 'pay'
            // const diffKey = 'diff'
            // res.map((item, index) => (
            //     item[payLedger] = 100,
            //     item[payKey] = 30,
            //     item[diffKey] = item[payLedger] - item[payKey]
            // ))      
            console.log(res)
            setPeopleList(res)
        })
        .catch((error) => {
            console.log(error);
        })
}

    useEffect(() => {     
        getPeople()
  }, []);


    return (
      <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col xs={12} md={8} lg={4}>
          <h1>People</h1>
        </Col>
      </Row>
      <Row>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cost</th>
          <th>Payment</th>
          <th>Diff</th>
        </tr>
      </thead>
      <tbody>
        {peopleList.map((item, index)=>{
            return(
                <tr key={index}>
                    <td>
                        <Link to={`/people/${item.id}`} className='link'>{item.name}</Link>
                    </td>
                    <td>{item.cost}</td>
                    <td>{item.payment}</td>
                    <td>{item.diff}</td>
                </tr>                
            )
        })}


      </tbody>
    </Table>
      </Row>
    </Container> 
     );
}

export default People;
