import { useState } from "react";
import { Button, Col, Dropdown, DropdownButton, Row, Form} from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Styling/Homepage.css"
import Register from "./Register";


const Homepage = () =>{
    const [initialInfoFilled, setInitalInfoFilled] = useState(false);
    //possibly call api to check if initial Info is filled
    
    return(
        <div>
            {
                initialInfoFilled ?
                <div> initial info filled  </div> 
                :
                <div className="registerCont">  
                {/* checks if info has been added to db, if not bring up the page for adding values */}
                    <Register />

                </div>
            }
        </div>
    )
}

export default Homepage;