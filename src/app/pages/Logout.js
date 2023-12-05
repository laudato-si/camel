import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Logout(props) {
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  const handleCancel = () => {
    console.log('cancel')
    navigate("/people")
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    console.log('logout')
    navigate("/");
    window.location.reload();
  };

    return (
      <Container>

      <Row className="justify-content-between" style={{marginTop: '15px'}}>
          <h1 className="d-flex justify-content-center">Are you sure you want to log out?</h1>
          <div className="d-flex justify-content-center" style={{marginTop: '15px'}}>
            <Button variant="secondary" onClick={handleCancel} style={{marginRight: '15px'}}>
              Close
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Yes
            </Button>
          </div>
      </Row>

      {/* <Row>
        <Col>
          <Button variant="secondary" onClick={() => setShowLogout(true)}>
            Logout
          </Button>        
        </Col>
      </Row> */}

      {/* {showLogout && (
        <Modal show={showLogout} onHide={handleCloseModal}>
          <LogoutModal setShowLogout={setShowLogout} />
        </Modal>
      )} */}

    </Container> 
     );
}

export default Logout;
