// import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import "./Header.css"

const Header = () => {
  return (
    <div className="header_bgcolor">
         <Container>
            <Row >
                <Col xs={1} md={1} lg={1}>
                Logo
                </Col>
                <Col xs={1} md={1} lg={2}>
                App Name
                </Col>
            </Row>
        </Container>

    </div>
  );
}

export default Header;
