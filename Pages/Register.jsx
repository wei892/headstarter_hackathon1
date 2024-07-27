
import { Link, useSearchParams } from "react-router-dom";
import "./Styling/Register.css"

import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { useState } from "react";


const Register = () =>{

    // const [email, setEmail] = useSearchParams('');
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [gender, setGender] = useState('');
    // const [initialWeight, setInitialWeight] = useState('');
    // const [goalWeight, setGoalWeight] = useState('');
    // const [activityLevel, setActivityLevel] = useState('');
    // //gotta find the correct bootstrap design and add in correct data
    // const [birthDate, setBirthDate] = useState('');
    // const [birthMonth, setBirthMonth] = useState(0);
    // const [birthDay, setBirthDay] = useState(0);
    // const [birthYear, setBirthYear] = useState(0);


    // const handleEmailChange = (e) => setEmail(e.target.value);
    // const handleUsernameChange = (e) => setUsername(e.target.value);
    // const handlePasswordChange = (e) => setPassword(e.target.value);
    // const handleGenderSelect = (gender) => setGender(gender);
    // const handleInitialWeightChange = (e) => setInitialWeight(e.target.value);
    // const handleGoalWeightChange = (e) => setGoalWeight(e.target.value);
    // const handleActivityLevelSelect = (level) => setActivityLevel(level);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const formData = {
    //       email,
    //       username,
    //       gender,
    //       initialWeight,
    //       goalWeight,
    //       activityLevel,
    //       //add birthdate 
    //     };
    //     console.log(formData); // Process form data here (e.g., send to backend)
    // };

    //format weight and and set birthday value
    // const formatBirthDate = () =>{
    //     // enteredWeight 
    // }

    //need to do tmr: handle input changes and form submission
    // fix date formating

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

                    <Form.Group as={Row} className="mb-3" controlId="formEmail">
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="password" />
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
                            <DropdownButton id="dropdown-basic-button" title="Day">
                            </DropdownButton>
                        </Col>

                        <Col sm={10}>
                            <DropdownButton id="dropdown-basic-button" title="Year">
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