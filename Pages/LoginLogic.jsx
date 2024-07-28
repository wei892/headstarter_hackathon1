import "./Styling/LoginLogic.css";
// import Footer from "../Components/Footer";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const LoginLogic = () => {
    const [profile, setProfile] = useState(null);

    const handleLogin = () => {
        const returnTo = encodeURIComponent('http://localhost:5173');
        window.location.href = `http://localhost:8000/login?returnTo=${returnTo}`;
    };

    const handleLogout = () => {
        window.location.href = 'http://localhost:8000/logout';
    };

    const handleProfileInfo = async () => {
        try {
            const response = await fetch('http://localhost:8000/profile', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            } else {
                console.error('Failed to fetch profile info');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        handleProfileInfo();
    }, []);

    return (
        <div>
            <div className="defaultPageColor">
                {profile ? (
                    <div className="profileContainer">
                        <div className="profileWrapper">
                            <img src={profile.picture} alt="Profile" className="profilePicture"/>
                            <p className="nick">{profile.nickname}</p>
                            <Button className="logout_btn button" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="profileContainer">
                        <div className="profileWrapper">
                            <Button className="login_btn button" onClick={handleLogin}>
                                Login
                            </Button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default LoginLogic;
