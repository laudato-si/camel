import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import Modal from "react-bootstrap/Modal";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import Url from "../api/url";
import Moment from "moment";

import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function PaymentForm({
    showModalPayment,
    handleCloseModalPayment,
    id, //id of the person
    editPayment,
    payment,
}) {

  const [date, setDate] = useState(Moment(new Date()).format("YYYY-MM-DD"));
  const [dateSent, setDateSent] = useState(new Date());
 
  const [description, setDescription] = useState();

  const [amount, setAmount] = useState();

  const [validated, setValidated] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const params = useParams();
  const headers = {
    Authorization: `Token ${localStorage.getItem("token")}`,
  };

  useEffect(() => {     
    if(editPayment){
      console.log('payment', payment)
      setDate(payment.date)
      setDescription(payment.description)
      setAmount(payment.amount)
    }
}, []);

const handleDateChange = (e) => {
      if (e == null) {
        console.log('date is null')
        setDateSent(null)
        setDate("")
      }else{
        setDate(Moment(e).format("YYYY-MM-DD"))
        setDateSent(Moment(e).format("YYYY-MM-DD"))
      }
    };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  };    

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  };
  
  const handleUpdate = async (event) => {
    console.log('amount: ', amount)
    let FormData = require("form-data");
    let dataform = new FormData();
    dataform.append("date", date);
    dataform.append("person", id);
    dataform.append("description", description);
    dataform.append("amount", amount);
  try {
  //const parentResponse = await axios.post('/api/parents/', parentData);
    const resup = await axios
      .put(
          Url.baseUrl + `paymentpost/${payment.pk}/`, 
          dataform, 
          {headers:headers}
      );
    console.log('Data updated successfully', resup.data);
  } catch (error) {
    console.error('Error posting data', error);
  }
  handleCloseModalPayment()
  }

  const handleSave = async (event) => {
    let FormData = require("form-data");
    let dataform = new FormData();
    // dataform.append("parent", 1);
    dataform.append("date", date);
    dataform.append("person", id);
    dataform.append("description", description);
    dataform.append("amount", amount);
    console.log('dateform: ', dataform)

  try {
  //const parentResponse = await axios.post('/api/parents/', parentData);
    const response = await axios
      .post(
          Url.baseUrl + `paymentpost/`, 
          dataform, 
          {headers:headers}
      );
    console.log('Data posted successfully', response.data);
  } catch (error) {
    console.error('Error posting data', error);
  }
  handleCloseModalPayment()

};

  
    return (
    <>
      <Modal 
        show={showModalPayment} 
        onHide={handleCloseModalPayment}
        size="xl"
        >
        <Modal.Header closeButton>
          {editPayment ? (
            <Modal.Title>Edit Payment</Modal.Title>
          ):(
          <Modal.Title>Payment input</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-md-center">
            <Col lg="4">
            <Form noValidate validated={validated}>

                <Form.Group className="mb-3" controlId="f1">
                  <Form.Label>Date</Form.Label>
                  <br />
                  <DatePicker
                    onChange={handleDateChange}
                    // onChange={setBirth}
                    value={date}
                    format="dd-MM-y"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        placeholder="Description" 
                        type="text"
                        id="iddescription"
                        name="descriptioin"
                        value={description}
                        required
                        onChange={handleDescriptionChange}
                        />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Paid</Form.Label>
                    <Form.Control 
                        placeholder="4.50" 
                        type="number"
                        step=".01"
                        id="idamount"
                        name="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        />
                </Form.Group>

                {editPayment ? (
                    <>

                    <Button variant="primary" onClick={handleUpdate} style={{marginTop: "20px"}}>
                        Update
                    </Button> 
                    </>
                ):(
                    <Button variant="success" onClick={handleSave} style={{marginTop: "20px"}}>
                        Save
                    </Button> 
                )}    

            </Form>            
            </Col>
        </Row>               
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PaymentForm;