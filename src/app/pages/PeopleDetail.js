import React, {useState, useEffect} from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import Url from "../api/url";

function PeopleDetail(props) {
    const [ledperson, setLedperson] = useState({});
    const [products, setProducts] = useState([]);
    const [payments, setPayments] = useState([]);
    const [totals, setTotals] = useState([]);
    const [totalPayment, setTotalPayment] = useState([]);
    const [superTotal, setSuperTotal] = useState(0)
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [errorFree, setErrorFree] = useState(true)
    const [errorFreePay, setErrorFreePay] = useState(true)
    const params = useParams();
    const id = params.id;

  const getledgerperson = async() => {
      // axios.get(Url.baseUrl + `/people/${id}`, {
      axios.get(Url.baseUrl + `/ledger/?person=${id}`)
      .then((response) => {
          setLedperson(response.data.results)
          // console.log(response.data.results)
          const res = response.data.results
          if (Array.isArray(response.data.results) && response.data.results.length === 0) {
            setError('No data found')
            setErrorFree(false)
          } else {
            setName(response.data.results[0].person)
          }
          let pro = []
          res.map((item)=>{
            pro.push(item.product.name)
          })
          let uniqueNames = Array.from(new Set(pro)); //remove duplicates
          // console.log(uniqueNames)
          setProducts(uniqueNames)

          // get totals
          let totalSum = []
          uniqueNames.map((pro)=>{
            // console.log('res:', res)
            // console.log('item:', pro)
            const tot = res.filter(
              (item) => item.product.name === pro
            );
            // console.log('tot: ', tot)
            let subtot = 0
            tot.map((it)=>{
              subtot += it.quantity * it.product.cost
            })
            totalSum.push(subtot)
            setTotals(totalSum)
            console.log('totals:', totalSum)      
          })
          let sum = totalSum.reduce(function (a, b) {
            return a + b;
          }, 0);
          setSuperTotal(sum)
      })
      .catch((error) => {
          console.log(error);
      })
  }

const getPayments = async() => {
    axios.get(Url.baseUrl + `/payments/?person=${id}`)
    .then((response) => {
        console.log(response.data.results)
        setPayments(response.data.results)
        if (Array.isArray(response.data.results) && response.data.results.length === 0) {
          setErrorFreePay(false)
        } else {
          setPayments(response.data.results)
        }        
        let totpay = 0
        response.data.results.map((item)=>{
          totpay += Number(item.amount)
        })
        setTotalPayment(totpay.toFixed(2))
    })
    .catch((error) => {
        console.log(error);
    })  
}

  // const getProducts = async() => {
  //   axios.get(Url.baseUrl + `/products`)
  //   .then((response) => {
  //       console.log(response.data.results)
  //       const res = response.data.results
  //       setProducts(response.data.results)
  //   })
  //   .catch((error) => {
  //       console.log(error);
  //   })
  // }

useEffect(() => {     
  getledgerperson();
  // getProducts();
  getPayments();
}, []);

    return (
      <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col xs={12} md={8} lg={4}>
          <h1>{name}{error}</h1>
        </Col>
        <Col style={{'text-align':'right'}}>
          <h5>Diff: {(superTotal-totalPayment).toFixed(2)}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
      {products.map((item, index)=>{
        return(
          <Row>
            <h3>{item}</h3>
           <Table striped bordered hover>
            <thead>
              <tr key={index}>
                <th>Quantity</th>
                <th>Cost</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
            {ledperson.filter(function(item2){
              return item2.product.name == item;
            }).map((item3, index2)=>{
                return(
                <tr key={index2}>
                  <td style={{'text-align':'right'}}>{item3.quantity}</td>
                  <td style={{'text-align':'right'}}>{item3.product.cost}</td>
                  <td style={{'text-align':'right'}}>{(item3.quantity * item3.product.cost).toFixed(2)}</td>
                </tr>
              )
            })}
            <tr style={{'font-weight':'bold'}}>
              <td>Total</td>
              <td></td>
              <td style={{'text-align':'right'}}>{totals[index].toFixed(2)}</td>
            </tr>
            </tbody>
            </Table>
      </Row>
        )
      })}
      <Row>
      {errorFree && (      
      <Table striped bordered hover>
      <tbody>
        <tr style={{'font-weight':'bold'}}>
          <td>Total</td>
          <td style={{'text-align':'right'}}>{superTotal.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table> 
      )}
      </Row>
      </Col>
      {errorFreePay && (
        <Col>
        <h3>Payments</h3>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item) => {
              return(
                <tr>
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                  <td style={{'text-align':'right'}}>{item.amount}</td>
                </tr>            
              )
            })}
            <tr style={{'font-weight':'bold'}}>
              <td>Total</td>
              <td></td>
              <td style={{'text-align':'right'}}>{totalPayment}</td>
            </tr>
          </tbody>
        </Table>
        </Col>
        )}




      </Row>
    </Container> 
     );
}

export default PeopleDetail;
