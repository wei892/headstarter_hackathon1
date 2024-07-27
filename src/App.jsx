// import { Button, Container, Row, Col } from 'react-bootstrap';
import './App.css';

import Header from '../Components/Header';
import Homepage from '../Pages/Homepage';
import LandingPage from '../Pages/LandingPage';
import { useRoutes } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';


function App() {

  let linkElements = useRoutes([
    {path: "/", element: <LandingPage />}, //landing page
    {path: "home_page/*", element: <Homepage />}, //user home page
    {path: "login/", element: <Login />},
    {path: "register/", element: <Register />},
  ])

  return (
    <div>
      <Header />
      {/* routers */}
      {/* everything below this should be based on routes */}
      {linkElements}
      
    </div>
  );
}

export default App;
