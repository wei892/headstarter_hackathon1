import React from "react";
import "./Tiles.css"

const TileCard = ({title}) => {
    return(
        <div className="tileCard">
            <div className="title">
                <h5> {title} </h5>
            </div>
            <div>
                display first three recipes
            </div>
        </div>
    )
}

export default TileCard;