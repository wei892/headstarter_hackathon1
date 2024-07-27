
import { Link, useSearchParams } from "react-router-dom";
import "./Styling/Register.css"

import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { useState } from "react";


const Register = () =>{
    //useStates for userData
    const [gender, setGender] = useState('');
    const [initialWeight, setInitialWeight] = useState(0);
    const [goalWeight, setGoalWeight] = useState(0);
    const [activityLevel, setActivityLevel] = useState('');
    const [birthDate, setBirthDate] = useState(new Date())
    const [foodPreferences, setFoodPrerences] = useState([]);

    const handleGenderSelect = (eventKey) => {
        setGender(eventKey)
    };

    const handleInitialWeightSelect = (e) => {
        setInitialWeight(e.target.value)
    };
    const handleGoalWeightSelect = (e) => {
        setGoalWeight(e.target.value)
    };
    const handleActivityLevelSelect = (eventKey) => {
        setActivityLevel(eventKey)
    };
    const handleBirthDateSelect = (e) => {
        setBirthDate(e.target.value)
        console.log(birthDate)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
          gender,
          initialWeight,
          goalWeight,
          activityLevel,
        };
        console.log(formData); // Process form data here (e.g., send to backend)
        //refresh page
        
    };

    return(
        <div>
            <div className="registerCont">
                <h2> Register </h2>
                {/* name, age, gender, height, activity, inital weight, goal weight */}
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formGender">
                        <Form.Label column sm={3}>Gender</Form.Label>
                        <Col sm={3}>
                            <DropdownButton id="formGender" title={gender != '' ? gender : "Select"} onSelect={handleGenderSelect} aria-required required>
                            <Dropdown.Item eventKey={"Female"}>Female</Dropdown.Item>
                            <Dropdown.Item eventKey={"Male"}>Male</Dropdown.Item>
                            <Dropdown.Item eventKey={"Other"}>Other</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formDate">
                        <Form.Label column sm={3}> Date of Birth </Form.Label>
                        <Col sm={5}>
                            <Form.Control id="formDate" type="date" value={birthDate} onChange={handleBirthDateSelect} required aria-required/> 
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formInitialWeight">
                        <Form.Label column sm={3}>Initial Weight</Form.Label>
                        <Col sm={3} required aria-required>
                            <Form.Control id="formInitialWeight" type="number" placeholder="0" value={initialWeight} onChange={handleInitialWeightSelect}/>
                        </Col>
                    </Form.Group> 


                    <Form.Group as={Row} className="mb-3" controlId="formGoalWeight">
                        <Form.Label column sm={3}>Goal Weight</Form.Label>
                        <Col sm={3} required aria-required>
                            <Form.Control id="formGoalWeight" type="number" placeholder={0} value={goalWeight} onChange={handleGoalWeightSelect}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formActLevel">
                        <Form.Label column sm={2}>Activity Level</Form.Label>
                        <Col sm={10}>
                            <DropdownButton id="formActLevel" 
                                title={activityLevel != '' ? activityLevel : "Select Activity Level"} onSelect={handleActivityLevelSelect} required aria-required
                            >
                            <Dropdown.Item eventKey={"Sedetary"}>Sedetary</Dropdown.Item>
                            <Dropdown.Item eventKey={"Medium"}>Medium</Dropdown.Item>
                            <Dropdown.Item eventKey={"Active"}>Active</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Form.Group>
                

                </Form>


                <Link to="../">
                    <Button onClick={handleSubmit}> Create Account </Button>
                </Link>
            </div>
        </div>
    )
}

export default Register;