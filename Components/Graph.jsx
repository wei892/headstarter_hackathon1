import React from "react";
import "./Graph.css"

const GraphCard = ({title}) =>{
    return(
        <div className="graphCard">
            <div className="title">
                <h3> {title} </h3>
            </div>

            <div className="graphCont">
                <img src="https://www.economist.com/sites/default/files/images/print-edition/20220122_CUD001_0.jpg"
                     className="scaled-image"/>
            </div>
        </div>
    )
}

export default GraphCard;
