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

function LedgerForm({
    showModalLedger,
    handleCloseModalLedger,
    id,
    leditem,
    editLedger,
}) {

  const [editing, setEditing] = useState(false);   

  const [date, setDate] = useState(Moment(new Date()).format("YYYY-MM-DD"));
  const [dateSent, setDateSent] = useState(new Date());
 
  const [person, setPerson] = useState("");
  const [personList, setPersonList] = useState([]);
  const [selectedOptionPerson, setSelectedOptionPerson] = useState("");

  const [product, setProduct] = useState("");
  const [productList, setProductList] = useState([]);
  const [selectedOptionProduct, setSelectedOptionProduct] = useState("");

  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [amount, setAmount] = useState();
  const [value, setValue] = useState();

  const [validated, setValidated] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const params = useParams();
  const headers = {
    Authorization: `Token ${localStorage.getItem("token")}`,
  };

  useEffect(() => {     
    getPersons()
    getProducts()
    if(editLedger){
      console.log('leditem:', leditem)
      setDescription(leditem.description)
      setDate(leditem.date)
      setProduct(leditem.product.pk)
      setQuantity(leditem.quantity)
      setValue(leditem.value) //Cost per unit
      setAmount(leditem.amount)
    }
}, []);

const getPersons = async() =>{
  axios.get(Url.baseUrl + `people/`, {headers: headers})
  .then((response) => {
      let res = response.data.results
      var optparentslist = []
      res.map((item, index)=>{
          optparentslist.push({
              value: item.pk,
              label: item.name
          })
      })
      console.log('parents: ', optparentslist)
      setPersonList(optparentslist)
  })
  .catch((error) => {
      console.log(error)
  })
}

const getProducts = async() =>{
  axios.get(Url.baseUrl + `products/`, {headers: headers})
  .then((response) => {
      let res = response.data.results
      var optparentslist = []
      res.map((item, index)=>{
          optparentslist.push({
              value: item.pk,
              label: item.name
          })
      })
      console.log('products: ', optparentslist)
      setProductList(optparentslist)
  })
  .catch((error) => {
      console.log(error)
  })
}


const handleDateChange = (e) => {
      if (e == null) {
        console.log('date is null')
        setDateSent(null)
        setDate("")
      }else{
        console.log(Moment(e).format("YYYY-MM-DD"))
        setDate(Moment(e).format("YYYY-MM-DD"))
        setDateSent(Moment(e).format("YYYY-MM-DD"))
      }
    };
    
    const handlePersonChange = (e) => {
      if(e != null) {
        console.log('person', e)
        setPerson(e.value)
        setSelectError(false)
      }else{
        console.log('changed', e)
        setPerson("")
        setSelectError(false)
      }
    };  
    
const handleProductChange = (e) => {
  if(e != null) {
    setProduct(e.value)
    setSelectError(false)
  }else{
      console.log('changed')
      setProduct("")
      setSelectError(false)
    }
  };  
 
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
    console.log("description:", e.target.value)
  };    

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
    console.log("amount:", e.target.value)
  };
  
  const handleValueChange = (e) => {
    setValue(e.target.value)
    console.log("value:", e.target.value)
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
    console.log("quantity:", e.target.value)
  };  

  const handleUpdate = async (event) => {
    console.log(person)
    let FormData = require("form-data");
    let dataform = new FormData();
    // dataform.append("parent", 1);
    dataform.append("date", date);
    dataform.append("person", id);
    dataform.append("product", product);
    dataform.append("quantity", quantity);
    dataform.append("description", description);
    dataform.append("amount", amount);
    dataform.append("value", value);
    console.log('dateform: ', dataform)

  try {
  //const parentResponse = await axios.post('/api/parents/', parentData);
    const response = await axios
      .put(
          Url.baseUrl + `received/${leditem.pk}/`, 
          dataform, 
          {headers:headers}
      );
    console.log('Data posted successfully', response.data);
  } catch (error) {
    console.error('Error posting data', error);
  }
  handleCloseModalLedger()
  }

  const handleSave = async (event) => {
    console.log(person)
    let FormData = require("form-data");
    let dataform = new FormData();
    // dataform.append("parent", 1);
    dataform.append("date", date);
    dataform.append("person", id);
    dataform.append("product", product);
    dataform.append("quantity", quantity);
    dataform.append("description", description);
    dataform.append("amount", amount);
    dataform.append("value", value);
    console.log('dateform: ', dataform)

  try {
  //const parentResponse = await axios.post('/api/parents/', parentData);
    const response = await axios
      .post(
          Url.baseUrl + `received/`, 
          dataform, 
          {headers:headers}
      );
    console.log('Data posted successfully', response.data);
  } catch (error) {
    console.error('Error posting data', error);
  }
  handleCloseModalLedger()
};

  
    return (
    <>
      <Modal 
        show={showModalLedger} 
        onHide={handleCloseModalLedger}
        size="xl"
        >
        <Modal.Header closeButton>
        {editLedger ? (
            <Modal.Title>Edit Ledger</Modal.Title>
          ):(
          <Modal.Title>Ledger input</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-md-center">
            <Col lg="4">
            <Form noValidate validated={validated}>

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

                {/* <Form.Group className="mb-3" controlId="f1">
                    <Form.Label>Person</Form.Label>
                    <Select
                      options={personList}
                      onChange={handlePersonChange}       
                      isClearable      
                      value={personList.filter(function(option) {
                        return option.value === person;
                      })}              
                    />  
                    {selectError && 
                        <div className="select-empty">Please provide a type.</div>
                    }
                </Form.Group> */}

                <Form.Group className="mb-3" controlId="f1">
                    <Form.Label>Product</Form.Label>
                    <Select
                      options={productList}
                      onChange={handleProductChange}       
                      isClearable      
                      value={productList.filter(function(option) {
                        return option.value === product;
                      })}              
                    />  
                    {selectError && 
                        <div className="select-empty">Please provide a type.</div>
                    }
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control 
                        placeholder="4" 
                        type="number"
                        step="1"
                        id="idquantity"
                        name="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Cost Unit</Form.Label>
                    <Form.Control 
                        placeholder="4.45" 
                        type="number"
                        step=".01"
                        id="idvalue"
                        name="value"
                        value={value}
                        onChange={handleValueChange}
                        />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Total Paid</Form.Label>
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

                {editLedger ? (
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalLedger}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModalLedger}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LedgerForm;