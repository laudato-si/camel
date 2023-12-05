import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import Url from "../api/url";
import { PencilSquare } from 'react-bootstrap-icons';

function TestList(props) {
    const [childrenList, setChildrenList] = useState([]);
    const headers = {
        Authorization: `Token ${localStorage.getItem("token")}`,
      }; 

    const getChildren = async() => {
        axios.get(Url.baseUrl + `children/`, {headers: headers,})
            .then((response) => {
                let res = response.data.results    
                console.log(res)
                setChildrenList(res)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    useEffect(() => {     
        getChildren()
    }, []);

    return (
        <Container>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{width: '10%'}}>Image</th>
                            <th>Name</th>
                            <th style={{width: '5%'}}>Amount</th>
                            <th>Birth</th>
                            <th>Parent</th>
                            <th style={{width: '5%'}}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {childrenList.map((child, index)=>{
                            return(
                                <tr key={index}>
                                    <td>
                                    <Image
                                        className='img-border'
                                        src={child.image}
                                        fluid
                                        width={"100%"} />
                                    </td>
                                    <td className='align-middle'>{child.child_name}</td>
                                    <td className='align-middle'>{child.amount}</td>
                                    <td className='align-middle' style={{textAlign: 'center'}}>{child.birth}</td>
                                    <td>{child.parent}</td>
                                    <td><Link to={`/test/${child.id}`} className='link'><PencilSquare color="royalblue" size={28} /></Link></td>
                                </tr>
                            )
                        })}
                    </tbody>    
                </Table>
            </Row>
        </Container>
    );
}

export default TestList;