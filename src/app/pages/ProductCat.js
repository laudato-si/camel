import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Url from "../api/url";

function ProductCat(props) {
    const [catList, setCatList] = useState([]);
    const headers = {
        Authorization: `Token ${localStorage.getItem("token")}`,
      };  

      const getCategories = async() => {
        // axios.get(Url.baseUrl + `products/`, {headers: headers,})
        axios.get(Url.baseUrl + `productgroup/`, {headers: headers,})
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
        getCategories()
  }, []);

    return (
    <Container>
        <Row>
            <h1 className="d-flex justify-content-center">Product Categories</h1>
        </Row>
        <div className="cat_box">
            <div className="cat_box_inner">
        {catList.map((item, index)=>{
            return(
                <div className="cat_box_el">
                    <h1 className="d-flex justify-content-center dark-row">{item.name}</h1>
                    <Link to={`/product/${item.pk}`} className="link">
                    <Image
                        className='img-border'
                        src={item.image}
                        fluid
                        width={"100%"} />
                    <div className="cat_el_description">{item.description}</div>
                    </Link>
                </div>
            )
        })}
            </div>
        </div>
    </Container>
);
}

export default ProductCat;
