import { useState, useEffect } from "react";
import { Button, Col, Dropdown, DropdownButton, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making API calls

import "./Styling/Homepage.css";
import Register from "./Register";
import Dashboard from "./Dashboard";

const Homepage = () => {
    const [initialInfoFilled, setInitialInfoFilled] = useState(false); // Default to false
    const [userProfile, setUserProfile] = useState(null); // State to store user profile

    useEffect(() => {
        // Fetch user profile
        const fetchUserProfile = async () => {
            try {
                const profileResponse = await axios.get('http://localhost:8000/profile', { withCredentials: true });
                setUserProfile(profileResponse.data);

                // Make API call to check if initial info is filled
                const response = await axios.get(`http://localhost:8000/check-user/${profileResponse.data.sub}`);
                setInitialInfoFilled(response.data.exists);
            } catch (error) {
                console.error('Error fetching user profile or checking initial info:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            {initialInfoFilled ? (
                <div>
                    <Dashboard userProfile={userProfile} />
                </div>
            ) : (
                <div className="registerCont">
                    <Register userProfile={userProfile} />
                </div>
            )}
        </div>
    );
};

export default Homepage;
