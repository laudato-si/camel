import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Url from "../api/url";

function Groups(props) {
    const [catList, setCatList] = useState([]);
    const headers = {
        Authorization: `Token ${localStorage.getItem("token")}`,
      };  

      const getGroups = async() => {
        // axios.get(Url.baseUrl + `products/`, {headers: headers,})
        axios.get(Url.baseUrl + `groups/`, {headers: headers,})
            .then((response) => {     
                let res = response.data.results;
                console.log('res: ', res)
                setCatList(res)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {     
        getGroups()
  }, []);

    return (
    <Container>
        <Row>
            <h1 className="d-flex justify-content-center">Groups</h1>
        </Row>
        {catList.map((item, index)=>{
            return(
                <div className="">
                    <Link to={`/group/${item.id}/`} className="link">
                    <h1 className="d-flex justify-content-center dark-row">{item.name}</h1>
                    <div className="">{item.description}</div>
                    </Link>
                </div>
            )
        })}
    </Container>
);
}

export default Groups;
