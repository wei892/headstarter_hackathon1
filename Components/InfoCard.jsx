import React from "react";

import "./InfoCard.css"
import { Col } from "react-bootstrap";

const InfoCard = ({title, value, className}) => {
    return(
        <div className="infoCard">
            <div className="cardTitle">
                {title}
            </div>
            <div className="cardValue">
                <h2> {value} </h2>
            </div>
        </div>
    )
}

export default InfoCard;