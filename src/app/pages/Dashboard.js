import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard(props) {
    return (
      <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col xs={12} md={8} lg={4} style={{backgroundColor: 'red'}}>
          <h1>Dashboard</h1>
        </Col>
      </Row>
    </Container> 
     );
}

export default Dashboard;
