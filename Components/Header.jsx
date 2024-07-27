import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./Header.css";
import { Link } from 'react-router-dom';
import LoginLogic from "../Pages/LoginLogic.jsx";

const Header = () => {
    return (
        <div className="header-container">
            <Container fluid className="header_bgcolor">
                <Row>
                    <Col xs={2} md={1} lg={1} className="logo">
                        <Link to="/" className='linkToLanding'>
                            <div className='circle_logo'></div>
                        </Link>
                    </Col>
                    <Col xs={10} md={11} lg={11} className="app-name">
                        <h2> Fasting App Name </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LoginLogic />
                    </Col>
                </Row>
            </Container>
            <div className='btm_border'>

            </div>
        </div>
    );
}

export default Header;
