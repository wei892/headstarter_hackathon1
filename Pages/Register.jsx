
import { Link } from "react-router-dom";
import "./Styling/Register.css"

import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";


const Register = () =>{
    return(
        <div>
            <div className="registerCont">
                <h2> Register </h2>
                {/* name, age, gender, height, activity, inital weight, goal weight */}
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formEmail">
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                        <Form.Label column sm={2}>Username</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="username" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formGender">
                        <Form.Label column sm={2}>Gender</Form.Label>
                        <Col sm={10}>
                            <DropdownButton id="dropdown-basic-button" title="Select Gender">
                            <Dropdown.Item>Female</Dropdown.Item>
                            <Dropdown.Item>Male</Dropdown.Item>
                            <Dropdown.Item>Other</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formGender">
                        <Form.Label column sm={1}> Date of Birth </Form.Label>
                        <Col sm={10}>
                            <DropdownButton id="dropdown-basic-button" title="Month">
                            <Dropdown.Item>Janurary</Dropdown.Item>
                            <Dropdown.Item>February</Dropdown.Item>
                            <Dropdown.Item>March</Dropdown.Item>
                            <Dropdown.Item>April</Dropdown.Item>
                            <Dropdown.Item>May</Dropdown.Item>
                            <Dropdown.Item>June</Dropdown.Item>
                            <Dropdown.Item>July</Dropdown.Item>
                            <Dropdown.Item>August</Dropdown.Item>
                            <Dropdown.Item>September</Dropdown.Item>
                            <Dropdown.Item>October</Dropdown.Item>
                            <Dropdown.Item>November</Dropdown.Item>
                            <Dropdown.Item>December</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col sm={10}>
                            <DropdownButton id="dropdown-basic-button" title="Date">
                            <Dropdown.Item>Janurary</Dropdown.Item>
                            <Dropdown.Item>February</Dropdown.Item>
                            <Dropdown.Item>March</Dropdown.Item>
                            <Dropdown.Item>April</Dropdown.Item>
                            <Dropdown.Item>May</Dropdown.Item>
                            <Dropdown.Item>June</Dropdown.Item>
                            <Dropdown.Item>July</Dropdown.Item>
                            <Dropdown.Item>August</Dropdown.Item>
                            <Dropdown.Item>September</Dropdown.Item>
                            <Dropdown.Item>October</Dropdown.Item>
                            <Dropdown.Item>November</Dropdown.Item>
                            <Dropdown.Item>December</Dropdown.Item>
                            </DropdownButton>
                        </Col>

                        <Col sm={10}>
                            <DropdownButton id="dropdown-basic-button" title="Year">
                            <Dropdown.Item>Janurary</Dropdown.Item>
                            <Dropdown.Item>February</Dropdown.Item>
                            <Dropdown.Item>March</Dropdown.Item>
                            <Dropdown.Item>April</Dropdown.Item>
                            <Dropdown.Item>May</Dropdown.Item>
                            <Dropdown.Item>June</Dropdown.Item>
                            <Dropdown.Item>July</Dropdown.Item>
                            <Dropdown.Item>August</Dropdown.Item>
                            <Dropdown.Item>September</Dropdown.Item>
                            <Dropdown.Item>October</Dropdown.Item>
                            <Dropdown.Item>November</Dropdown.Item>
                            <Dropdown.Item>December</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formLastName">
                        <Form.Label column sm={2}>Initial Weight</Form.Label>
                        <Col sm={2}>
                            <Form.Control type="text" placeholder="18" />
                        </Col>
                    </Form.Group> 


                    <Form.Group as={Row} className="mb-3" controlId="formLastName">
                        <Form.Label column sm={2}>Goal Weight</Form.Label>
                        <Col sm={2}>
                            <Form.Control type="text" placeholder="18" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formGender">
                        <Form.Label column sm={2}>Activity Level</Form.Label>
                        <Col sm={10}>
                            <DropdownButton id="dropdown-basic-button" title="Select Activity Level">
                            <Dropdown.Item>Sedetary</Dropdown.Item>
                            <Dropdown.Item>Medium</Dropdown.Item>
                            <Dropdown.Item>Active</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Form.Group>
                </Form>

                <Link to="../">
                    <Button> Create Account </Button>
                </Link>
            </div>
        </div>
    )
}

export default Register;