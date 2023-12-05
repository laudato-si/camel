import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Url from "../api/url";

function Product(props) {
    const params = useParams();
    const [id, setId] = useState();
    const [productList, setProductList] = useState([]);
    const headers = {
        Authorization: `Token ${localStorage.getItem("token")}`,
      };  

      const getProducts = async() => {
        // axios.get(Url.baseUrl + `products/`, {headers: headers,})
        axios.get(Url.baseUrl + `products/?group=${params.id}`, 
            {headers: headers,})
            .then((response) => {     
                let res = response.data.results
                console.log(res)
                setProductList(res)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {     
        getProducts()
        setId(params.id)
        console.log(params.id)
  }, []);

    return (
        <Container>
            <Row>
                <h1 className="d-flex justify-content-center">Products</h1>
            </Row>

                    <Row>
                        <h1 className="d-flex justify-content-center dark-row">Item</h1>
                    </Row>   
                    {productList.map((item, index)=>{
                    return(
                    <Row className='row-separator'>
                        <Col md={4} className='column-separator'>
                        <Image
                            className='img-border'
                            src={item.image}
                            fluid
                            width={"100%"} />
                        </Col>
                        <Col>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <hr />
                            <h5>Cost: {item.cost}&nbsp;&nbsp;|&nbsp;&nbsp;Price: {item.price}</h5>
                        </Col>
                    </Row>
                    )
                    })}

        </Container>
    );
}

export default Product;