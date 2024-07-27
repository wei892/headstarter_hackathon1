import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    const [profile, setProfile] = useState(null);
    const [userExists, setUserExists] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
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
                    checkUserExists(data.sub); // Call checkUserExists with the user's sub
                } else {
                    console.error('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const checkUserExists = async (userId) => {
            try {
                const response = await fetch(`http://localhost:8000/check-user/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log('Check User Exists Response:', data);
                setUserExists(data.exists);
            } catch (error) {
                console.error('Error checking user existence:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Landing Page</h1>
            <p>Welcome to the Fasting App!</p>
            {profile ? (
                <div>
                    <p>Welcome back, {profile.nickname}!</p>
                    <p>{profile.sub} alt="Profile" </p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default LandingPage;
