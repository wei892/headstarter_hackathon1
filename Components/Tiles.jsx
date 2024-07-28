import React, { useEffect, useState } from "react";
import "./Tiles.css"

const TileCard = ({title, items}) => {

    //call recipies data
    const [arrRecipes, setArrRecipies] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setArrRecipies([
            {
                title: "rep1"
            },
            {
                title: "rep2"
            }
        ]);
    }, []);

    const handleClickItem = (recipe) => {
        console.log(recipe);
        setSelectedItem(recipe);
    }

    const handleClosePopup = () => {
        setSelectedItem(null);
    }

    return(
        <div className="tileCard">
            <div className="title">
                <h5> {title} </h5>
            </div>
            <div className="tileCont">
                {
                    arrRecipes.map((recipe, index) => (
                        <div key={index} onClick={(e) => handleClickItem(recipe)}> <h5>{recipe.title} </h5> 
                            <div className="divider"> </div>
                        </div>
                    ))
                }
            </div>

            {selectedItem && (
                <div className="popup">
                <div className="popupContent">
                    <h2>{selectedItem.title}</h2>
                    <p>{selectedItem.description}</p>
                    <button className="btn btn-primary" onClick={handleClosePopup}>Close</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default TileCard;