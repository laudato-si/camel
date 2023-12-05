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

function Test(props) {

    const params = useParams();
    const navigate = useNavigate();
    const headers = {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
    };   

    const [editing, setEditing] = useState(false);   
    const [id, setId] = useState();
    const [child, setChild] = useState({})

    const [parent, setParent] = useState("");
    const [parentList, setParentList] = useState([]);
    const [selectedOptionParent, setSelectedOptionParent] = useState("");

    const [childName, setChildName] = useState('');

    const [birth, setBirth] = useState(Moment(new Date()).format("YYYY-MM-DD"));
    const [birthSent, setBirthSent] = useState(new Date());
    
    const [tags, setTags] = useState([]);
    const [activeTags, setActiveTags] = useState([]);
    const [tagsId, setTagsId] = useState([]);   //[3,5,7]
    const [tagList, setTagList] = useState([]);
    
    const [amount, setAmount] = useState();

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileNameUpdate, setFileNameUpdate] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    const [validated, setValidated] = useState(false);
    const [selectError, setSelectError] = useState(false);
    // const childData = { child_name: 'Julia', parent: 1 };
    
    useEffect(() => {     
        getParents()
        getTags()
        if(Object.keys(params).length===0){
            console.log('useEffect: not editing')
            setEditing(false);
        }else{
            console.log('useEffect: editing')
            setEditing(true)
            setId(params.id)
            // getChild()       
        }
    }, []);
    
useEffect(() => {
    async function getChild() {
      try {
        const response = await axios.get(Url.baseUrl + `children/${params.id}/`, {headers:headers})
        setChild(response.data);
        console.log('UE child: ', response.data) 
        setChildName(response.data.child_name)
        setParent(response.data.parent)
        setBirth(response.data.birth)
        setAmount(response.data.amount)
        setSelectedFile(response.data.image)
        setOldImage(response.data.image)
        let tgarr=[]
        response.data.tags.map((tg, index)=>{
            tgarr.push({
                value: tg.pk,
                label: tg.name
            })
        })
        setActiveTags(tgarr)
        // Your code to execute when the async function is completed
        console.log('Async function completed');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getChild();
  }, []);
    
    const listIcecream = [
        { value: '1', label: 'Chocolate' },
        { value: '2', label: 'Strawberry' },
        { value: '3', label: 'Vanilla' },
        { value: '4', label: 'Coffee' },
    ]    
     
    const getParents = async() =>{
        axios.get(Url.baseUrl + `parents/`, {headers: headers})
        .then((response) => {
            let res = response.data.results
            var optparentslist = []
            res.map((item, index)=>{
                optparentslist.push({
                    value: item.id,
                    label: item.name
                })
            })
            console.log('parents: ', optparentslist)
            setParentList(optparentslist)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    const getTags = async() =>{
        axios.get(Url.baseUrl + `tagsapi/`, {headers: headers})
        .then((response) => {
            let res = response.data.results
            var opttaglist = []
            res.map((item, index)=>{
                opttaglist.push({
                    value: item.pk,
                    label: item.name
                })
            })
            setTagList(opttaglist)
        })
        .catch((error) => {    const fillForm = () => {
            console.log('fill form')
            if (params.id){
                console.log('do this')
                console.log(params.id)
                axios.get(Url.baseUrl + `children/${params.id}/`, {headers:headers})
                .then((response)=>{
                    let res = response.data
                    console.log('child: ', res)
                    setChildName(res.child_name)
                })
            }else{
                console.log('what about me?')
                console.log(params.id)
            }
        }
            console.log(error)
        })
    }


    const handleChildChangeName = (e) => {
        setChildName(e.target.value)
    };

    const handleParentChange = (e) => {
        if(e != null) {
            setParent(e.value)
            setSelectError(false)
        }else{
            console.log('changed')
            setParent("")
            setSelectError(false)
        }
    };

    const handleBirthChange = (e) => {
        if (e == null) {
            console.log('date is null')
            setBirthSent(null)
            setBirth("")
        }else{
            console.log(Moment(e).format("YYYY-MM-DD"))
            setBirth(Moment(e).format("YYYY-MM-DD"))
            setBirthSent(Moment(e).format("YYYY-MM-DD"))
        }
    };

    const handleTagChange = (e) => {
        console.log('tags dic: ', e)
        var idonly = []
        e.map((item)=>{
            idonly.push(item.value)
        })
        console.log('tagsid: ', idonly)
        setTagsId(idonly)
        setActiveTags(e)
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
        console.log("amount:", e.target.value)
    };

    const handleFileChange = (event) => {
        console.log(event)
        setSelectedFile(event.target.files[0]);
      };

    const handleSave = async (event) => {
        let FormData = require("form-data");
        let childData = new FormData();
        childData.append("child_name", childName);
        childData.append("parent", parent);
        if(amount){childData.append("amount", amount)}
        if(tagsId.length>0){childData.append("tags", tagsId)}
        childData.append("birth", birth);
        if(selectedFile){childData.append("image", selectedFile)}

        console.log('childdata: ', childData)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (parent === "") {
            setSelectError(true);
            event.preventDefault();
            event.stopPropagation();
            console.log('select empty')   
        }
        setValidated(true);
        console.log('tagsid:', tagsId)
        console.log(tagsId.length)
        console.log('request:', childData)
        try {
        //const parentResponse = await axios.post('/api/parents/', parentData);
          const childResponse = await axios
            .post(
                Url.baseUrl + `children/`, 
                childData, 
                {headers:headers}
            );
          console.log('Data posted successfully', childResponse.data);
        } catch (error) {
          console.error('Error posting data', error);
        }
      };

    const handleUpdate = async (event) => {
        console.log('updating')
        let formField = new FormData();
        formField.append("child_name", childName);
        formField.append("parent", parent);
        formField.append("birth", birth);
        if(amount){formField.append("amount", amount)}
        if(tagsId.length>0){formField.append("tags", tagsId)}
        console.log(formField)
        if(fileNameUpdate !== null){
            formField.append("image", fileNameUpdate);
        }else{
            formField.append("image", "");
          }
        if(selectedFile !== null){
            formField.append("oldimage", oldImage);
        }else{
            formField.append("oldimage", "");
        }

        try {
              const childResponse = await axios
              .put(Url.baseUrl + `childapi/${params.id}/`, formField, {
                headers: headers,
              })
              console.log('Data put successfully', childResponse.data);
            } catch (error) {
              console.error('Error posting data', error);
            }
    };

    const handleBack = () => {
        navigate("/testlist");
    };

    return (
    <Container>
        <h1>{id}</h1>
        <Button variant="success" onClick={handleBack} style={{marginTop: "20px"}}>
            Back
        </Button> 
        <Row className="justify-content-md-center">
            <Col lg="4">
            <Form noValidate validated={validated}>

                <Form.Group className="mb-3">
                    <Form.Label>Child name</Form.Label>
                    <Form.Control 
                        placeholder="Child name" 
                        type="text"
                        id="childName"
                        name="child_name"
                        value={childName}
                        required
                        onChange={handleChildChangeName}
                        />
                    <Form.Text className="text-muted">
                    Secondary text
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="f1">
                    <Form.Label>Parent</Form.Label>
                    <Select
                    //   defaultValue={listIcecream[0]}
                      options={parentList}
                      onChange={handleParentChange}       
                      isClearable      
                      value={parentList.filter(function(option) {
                        return option.value === parent;
                      })}              
                    />  
                    {selectError && 
                        <div className="select-empty">Please provide a type.</div>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="f1">
                  <Form.Label>Birth</Form.Label>
                  <br />
                  <DatePicker
                    onChange={handleBirthChange}
                    // onChange={setBirth}
                    value={birth}
                    format="dd-MM-y"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tags1">
                    <Form.Label>Tags</Form.Label>
                    <Select
                        // value={[tagList[0], tagList[1]]}
                        value={activeTags}
                        isMulti
                        name="colors"
                        options={tagList}
                        isClearable
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleTagChange} 
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                        placeholder="Amount 4.50" 
                        type="number"
                        step=".01"
                        id="idamount"
                        name="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>

                    {editing ? (
                        <Form.Control
                          type="file"
                          name="image"
                          onChange={(e) => setFileNameUpdate(e.target.files[0])}
                        />
                      ):(
                        <Form.Control 
                        type="file" 
                        name='image'
                        // accept='image/*'
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                      )}

                </Form.Group>

                {editing ? (
                    <>
                    <Image
                        className='img-border'
                        src={selectedFile}
                        fluid
                        width={"100%"} />

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
    </Container>
    );
}

export default Test;