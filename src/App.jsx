import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Components/Header.jsx';
import Home from '../Components/home.jsx';  // You'll need to create this component

const AppContent = () => {
    const location = useLocation();
    const hideHeaderPaths = ['/login', '/logout', '/auth/login', '/auth/logout'];
    const showHeader = !hideHeaderPaths.includes(location.pathname);

    return (
        <div>
            {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />

                {/* Add more routes as needed */}
            </Routes>
        </div>
    );
};

function App() {
    return (

            <AppContent />

    );
}

export default App;
