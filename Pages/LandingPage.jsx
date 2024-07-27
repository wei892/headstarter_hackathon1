import React, { useEffect } from 'react';

const LandingPage = () => {
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
                    console.log('Profile data:', data);
                } else {
                    console.error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Landing Page</h1>
            <p>Welcome to the Fasting App!</p>
        </div>
    );
};

export default LandingPage;
