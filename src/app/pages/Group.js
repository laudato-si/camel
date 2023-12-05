import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Url from "../api/url";

function Group(props) {
    const params = useParams();
    const [peopleList, setPeopleList] = useState([]);
    const [id, setId] = useState();
    const headers = {
        Authorization: `Token ${localStorage.getItem("token")}`,
      };  

      const getPeople = async() => {
        // axios.get(Url.baseUrl + `products/`, {headers: headers,})
        axios.get(Url.baseUrl + `people/?group=${params.id}`, {headers: headers,})
            .then((response) => {     
                let res = response.data.results;
                console.log('res: ', res)
                setPeopleList(res)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {     
        getPeople()
        setId(params.id)
  }, []);

    return (
    <Container>
        <Row>
            <h1 className="d-flex justify-content-center">Group</h1>
        </Row>
        <Link to={`/groups/`} className='link'>
            <Button variant="success" style={{marginTop: "20px"}}>
                Back
            </Button> 
        </Link>
        <Row>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
        </tr>
      </thead>
      <tbody>        
        {peopleList.map((item, index)=>{
            return(
                <tr key={index}>
                    <td>
                        <Link to={`/people/${item.pk}`} className='link'>{item.name} {item.surname}</Link>
                    </td>
                    <td>{item.surname}</td>
                </tr>  
            )
        })}
      </tbody>
    </Table>
      </Row>
    </Container>
);
}

export default Group;
