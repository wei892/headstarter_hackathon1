
import "./Styling/LandingPage.css"

import Footer from "../Components/Footer";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPage = () =>{
    return(
        <div>
            <div className="defaultPageColor">
                <Link to="register">
                    <Button className="signup_btn button" > Sign Up </Button> 
                </Link>
                <Link to="login">
                    <Button className="login_btn button"> Login </Button>
                </Link>

                LANDING PAGE
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage;