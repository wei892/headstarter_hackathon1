import { Link } from "react-router-dom";
import "./Styling/Register.css"
import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { useState } from "react";

const Register = () => {
    // useStates for userData
    const [showPersonalizedInfo, setShowPersonalizedInfo] = useState(true);
    const [showLikeFoodInfo, setShowLikedFoodInfo] = useState(false);
    const [showDislikeFoodInfo, setShowDislikeFoodInfo] = useState(false);

    const [personalFormData, setPersonalFormData] = useState({});
    const [gender, setGender] = useState('');
    const [initialWeight, setInitialWeight] = useState(0);
    const [goalWeight, setGoalWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [activityLevel, setActivityLevel] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());

    const [likedFoods, setLikedFoods] = useState(['']);
    const [likedFoodString, setLikedFoodString] = useState('');

    const [dislikedFoods, setDislikedFoods] = useState(['']);
    const [dislikedFoodsString, setDislikedFoodsString] = useState('');
    

    const handleGenderSelect = (eventKey) => {
        setGender(eventKey);
    };

    const handleInitialWeightSelect = (e) => {
        setInitialWeight(e.target.value);
    };
    const handleGoalWeightSelect = (e) => {
        setGoalWeight(e.target.value);
    };
    const handleHeightSelect = (e) => {
        setHeight(e.target.val)
    }
    const handleActivityLevelSelect = (eventKey) => {
        setActivityLevel(eventKey);
    };
    const handleBirthDateSelect = (e) => {
        setBirthDate(e.target.value);
        console.log(birthDate);
    };

    const handleSubmitPersonalInfo = (e) => {
        try {
            e.preventDefault();
            if (
                gender !== '' &&
                initialWeight !== 0 &&
                goalWeight !== 0 &&
                activityLevel !== '' &&
                birthDate !== new Date()
            ) {
                console.log("All data filled");
                const formData = {
                    gender,
                    initialWeight,
                    goalWeight,
                    height,
                    activityLevel,
                };

                setPersonalFormData(formData);
                console.log(formData);

                // Move to food preferences page
                setShowPersonalizedInfo(false);
                setShowLikedFoodInfo(true);
                setShowDislikeFoodInfo(false);
            } else {
                console.log("Fields not completed");
                window.alert("Please fill all the fields");
            }
        } catch (error) {
            console.log("Personal Info Not Submitted", error);
        }
    };

    const backToPersonalInfo = (e) => {
        e.preventDefault();
        setShowPersonalizedInfo(true);
        setShowLikedFoodInfo(false);
        setShowDislikeFoodInfo(false);
    };

    const handleEnterLikeFoodKeyPress = (e) => {
        if (e.key === 'ArrowDown' && likedFoods[likedFoods.length - 1] !== '') {
            e.preventDefault();
            setLikedFoods([...likedFoods, '']);
        }
    };

    const handleLikedFoodChange = (index, e) => {
        const newLikedFoods = [...likedFoods];
        newLikedFoods[index] = e.target.value;
        setLikedFoods(newLikedFoods);
    };

    const handleSubmitLikedFood = (e) => {
        try {
            e.preventDefault();
            if (likedFoods.length >= 5) {
                const trimmedLikedFoods = likedFoods.map(food => food.trim());
                setLikedFoodString(trimmedLikedFoods.join(', '));
                console.log(trimmedLikedFoods.join(', '));
                
                // Move to disliked foods page
                setShowPersonalizedInfo(false);
                setShowLikedFoodInfo(false);
                setShowDislikeFoodInfo(true);
            } else {
                console.log("Less than 5 foods added");
                window.alert("Please add more food!");
            }
        } catch (error) {
            console.log("Unable to submit foods", error);
        }
    };

    const backToLikedFoodsForm = (e) => {
        e.preventDefault();
        setShowPersonalizedInfo(false);
        setShowLikedFoodInfo(true);
        setShowDislikeFoodInfo(false);
    };

    const handleEnterDislikedFoodKeyPress = (e) => {
        if (e.key === 'ArrowDown' && dislikedFoods[dislikedFoods.length - 1] !== '') {
            e.preventDefault();
            setDislikedFoods([...dislikedFoods, '']);
        }
    };

    const handleDislikedFoodChange = (index, e) => {
        const newDislikedFoods = [...dislikedFoods];
        newDislikedFoods[index] = e.target.value;
        setDislikedFoods(newDislikedFoods);
    };

    const handleSubmitDislikedFood = (e) => {
        try {
            e.preventDefault();
                const trimmedDislikedFoods = dislikedFoods.map(food => food.trim());
                setDislikedFoodsString(trimmedDislikedFoods.join(', '));
                console.log(trimmedDislikedFoods.join(', '));

                //add api to submit everything in this file
                console.log(personalFormData, likedFoodString,dislikedFoodsString);
        } catch (error) {
            console.log("Unable to submit foods", error);
        }
    };

    return (
        <div>
            {showPersonalizedInfo && !showLikeFoodInfo && !showDislikeFoodInfo && (
                <div className="registerCont">
                    <h2> Register </h2>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formGender">
                            <Form.Label column sm={3}>Gender</Form.Label>
                            <Col sm={3}>
                                <DropdownButton id="formGender" title={gender !== '' ? gender : "Select"} onSelect={handleGenderSelect} aria-required required>
                                    <Dropdown.Item eventKey={"Female"}>Female</Dropdown.Item>
                                    <Dropdown.Item eventKey={"Male"}>Male</Dropdown.Item>
                                    <Dropdown.Item eventKey={"Other"}>Other</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formDate">
                            <Form.Label column sm={3}> Date of Birth </Form.Label>
                            <Col sm={5}>
                                <Form.Control id="formDate" type="date" value={birthDate} onChange={handleBirthDateSelect} required aria-required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formInitialWeight">
                            <Form.Label column sm={3}>Initial Weight</Form.Label>
                            <Col sm={3} required aria-required>
                                <Form.Control id="formInitialWeight" type="number" placeholder="0" value={initialWeight} onChange={handleInitialWeightSelect} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formGoalWeight">
                            <Form.Label column sm={3}>Goal Weight</Form.Label>
                            <Col sm={3} required aria-required>
                                <Form.Control id="formGoalWeight" type="number" placeholder="0" value={goalWeight} onChange={handleGoalWeightSelect} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHeight">
                            <Form.Label column sm={3}>Goal Weight</Form.Label>
                            <Col sm={3} required aria-required>
                                <Form.Control id="formHeight" type="number" placeholder="0" value={height} onChange={handleHeightSelect} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formActLevel">
                            <Form.Label column sm={2}>Activity Level</Form.Label>
                            <Col sm={10}>
                                <DropdownButton id="formActLevel"
                                    title={activityLevel !== '' ? activityLevel : "Select Activity Level"} onSelect={handleActivityLevelSelect} required aria-required
                                >
                                    <Dropdown.Item eventKey={"Sedentary"}>Sedentary</Dropdown.Item>
                                    <Dropdown.Item eventKey={"Medium"}>Medium</Dropdown.Item>
                                    <Dropdown.Item eventKey={"Active"}>Active</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Form.Group>
                    </Form>

                    <Button onClick={handleSubmitPersonalInfo}> Submit Info </Button>
                </div>
            )}
            {!showPersonalizedInfo && showDislikeFoodInfo && !showLikeFoodInfo && (
                <div>
                    <h2>Select Your Dislikes</h2>
                    <br />
                    Enter food you dislike! We'll try not to include them in your recipes!
                    Press "Down Arrow" to add more!
                    <br />
                    <form onSubmit={handleSubmitDislikedFood}>
                        {dislikedFoods.map((food, index) => (
                            <div className="form-group col-sm-5" key={index}>
                                <input className="form-control inputBox"
                                    id={`dislikeFoodPreference${index}`}
                                    type="text"
                                    value={food}
                                    onChange={(e) => handleDislikedFoodChange(index, e)}
                                    onKeyUp={(e) => handleEnterDislikedFoodKeyPress(e)}
                                    placeholder={`Enter ${index + 1}`}
                                />
                            </div>
                        ))}
                        <br />
                        <button type="button" className="btn btn-primary" onClick={backToLikedFoodsForm}> Back </button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            )}
            {!showPersonalizedInfo && showLikeFoodInfo && !showDislikeFoodInfo && (
                <div>
                    <h2>Enter Your Favorite Foods</h2>
                    <br />
                    Enter at least 5 foods you enjoy eating
                    Press "Down Arrow" to add more!
                    <br />
                    <form onSubmit={handleSubmitLikedFood}>
                        {likedFoods.map((food, index) => (
                            <div className="form-group col-sm-5" key={index}>
                                <input className="form-control inputBox"
                                    id={`likedFoodPreference${index}`}
                                    type="text"
                                    value={food}
                                    onChange={(e) => handleLikedFoodChange(index, e)}
                                    onKeyUp={(e) => handleEnterLikeFoodKeyPress(e)}
                                    placeholder={`Enter ${index + 1}`}
                                />
                            </div>
                        ))}
                        <br />
                        <button type="button" className="btn btn-primary" onClick={backToPersonalInfo}> Back </button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Register;
