// import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import "./Header.css"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header-container">
    <Container fluid className="header_bgcolor">
      <Row>
        <Link to="../" className='linkToLanding'>
            <Col xs={2} md={1} lg={1} className="logo">
                <div className='.circle_logo'>
                    
                </div>
            </Col>
            <Col xs={10} md={11} lg={11} className="app-name">
                <h2> Fasting App Name </h2>
            </Col>
        </Link>
      </Row>
    </Container>
  </div>
  );
}

export default Header;
