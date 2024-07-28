import { Link } from "react-router-dom";
import "./Styling/Register.css"
import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios


const Register = () => {
    // useStates for userData
    const [showPersonalizedInfo, setShowPersonalizedInfo] = useState(true);
    const [showLikeFoodInfo, setShowLikedFoodInfo] = useState(false);
    const [showDislikeFoodInfo, setShowDislikeFoodInfo] = useState(false);
    const [authId, setAuthId] = useState(null);
    const [userName, setUserName] = useState(null);
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

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/profile', { withCredentials: true });
                setIsLoggedIn(response.data && Object.keys(response.data).length > 0);
                setAuthId(response.data.sub);
                setUserName(response.data.name);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setIsLoggedIn(false);
            }
        };


        fetchUserProfile();
    }, []);


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

    const handleSubmitDislikedFood = async (e) => {
        try {
            e.preventDefault();

            // Trim the disliked foods array
            const trimmedDislikedFoods = dislikedFoods.map(food => food.trim());
            setDislikedFoodsString(trimmedDislikedFoods.join(', '));
            console.log('Disliked foods:', trimmedDislikedFoods);

            // Ensure authId and userName are available
            if (!authId) {
                throw new Error("authId is not available");
            }

            // Ensure birthDate is in the correct format (YYYY-MM-DD)
            const formattedBirthDate = birthDate instanceof Date
                ? birthDate.toISOString().split('T')[0]
                : birthDate;


            const user = {
                "auth_id": `${authId}`, // Ensuring this is a string
                "user_name": `${userName}`, // Ensuring this is a string
                "age": `${23}`, // Converting the number to a string
                "initial_weight": `${initialWeight}`, // Converting the number to a string
                "goal_weight": `${goalWeight}`, // Converting the number to a string
                "height": `${height}`, // Converting the number to a string
                "gender": `${gender}`, // Ensuring this is a string
                "activity_level": `${activityLevel}` // Ensuring this is a string
            };

            // Send user data to add-user endpoint
            try {
                const addUserResponse = await axios.post('http://localhost:8000/add-user', user);
                console.log('User added:', addUserResponse.data);
            } catch (error) {
                console.error('Error adding user:', error);
                return; // Exit if unable to add user
            }

            // Construct the message to send to OpenAI
            const message = `Personal data: ${JSON.stringify(personalFormData)}, Liked foods: ${likedFoodString}, Disliked foods: ${trimmedDislikedFoods.join(', ')}, That is the data I have provided, with this information, I want 3 recipes and make the data as easy to parse, I will be feeding this into an array, so have recipe_name, and then recipe, I will parse this data later,`;

            // Make the API call to OpenAI
            const response = await axios.post('http://localhost:8000/api/openai', { message: message });

            // Handle the response from OpenAI
            console.log('OpenAI Response:', response.data);

            // Extract and parse the JSON from the OpenAI response
            const responseData = response.data.content;
            const match = responseData.match(/```json\n([\s\S]*?)\n```/);
            if (!match) {
                throw new Error("Invalid JSON format in the OpenAI response");
            }
            console.log('Matched JSON:', match[1]);

            const recipes = JSON.parse(match[1]);
            console.log('Parsed recipes:', recipes);

            // Send each recipe to the /add-user-recipe endpoint
            for (const recipe of recipes) {
                const userRecipe = {
                    auth_id: authId,
                    recipe_name: recipe.recipe_name,
                    recipe: `Ingredients: ${recipe.recipe.ingredients.join(', ')}. Instructions: ${recipe.recipe.instructions.join(' ')}`
                };
                console.log('User Recipe:', userRecipe);

                try {
                    const addRecipeResponse = await axios.post('http://localhost:8000/add-user-recipe', userRecipe);
                    console.log('Recipe added:', addRecipeResponse.data);
                } catch (error) {
                    console.error('Error adding recipe:', error);
                }
            }

            // Reload the website after all operations are complete
        } catch (error) {
            console.log("Unable to submit foods", error);
        }
    };

    return (
        <div>
            {isLoggedIn ? (
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
                                    <Form.Label column sm={3}>Height</Form.Label>
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
            ) : (
                <div className="login-message">
                    <h1>Please Login</h1>
                    <p>You need to be logged in to access this page.</p>
                </div>
            )}
        </div>
    );
};

export default Register;
