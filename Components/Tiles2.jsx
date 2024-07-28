import React, { useEffect, useState } from "react";
import "./Tiles.css"

const TileCard2 = ({title, items}) => {

    //call recipes data
    const [arrItems, setArrItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setArrItems([
            {
                title: "Low Calories Chicken Burger",
                description: "1. Prepare the Chicken Patties: In a large mixing bowl, combine ground chicken breast, chopped onion, chopped red bell pepper, minced garlic, whole wheat breadcrumbs, egg white, chopped parsley, paprika, salt, and black pepper. Mix all ingredients thoroughly until well combined. Form the mixture into 4 equal-sized patties. 2. Cook the Chicken Patties: Heat a non-stick skillet or grill pan over medium-high heat. Cook the chicken patties for about 5-6 minutes on each side, or until fully cooked through and golden brown on the outside. 3. Prepare the Sauce: In a small bowl, mix plain Greek yogurt, lemon juice, Dijon mustard, salt, and pepper. Stir until well combined. 4. Assemble the Burgers: Lightly toast the whole wheat burger buns. Spread a tablespoon of the yogurt sauce on the bottom half of each bun. Place a lettuce leaf on each bun, followed by a chicken patty. Top the chicken patty with slices of tomato and cucumber. Add another tablespoon of the yogurt sauce on top of the vegetables. Cover with the top half of the bun. 5. Serve: Serve the chicken burgers immediately, optionally with a side salad or baked sweet potato fries for a complete meal."
            },
            {
                title: "Full Body Workout Regimen",
                description: "1. Warm-Up: 5-10 minutes of light cardio (jogging, jumping jacks, etc.)\n2. Squats: 3 sets of 12-15 reps\n3. Push-Ups: 3 sets of 10-12 reps\n4. Lunges: 3 sets of 12 reps per leg\n5. Plank: 3 sets of 30-60 seconds\n6. Dumbbell Rows: 3 sets of 12 reps per arm\n7. Cool Down: 5-10 minutes of stretching"
            }
        ]);
    }, []);

    const handleClickItem = (item) => {
        console.log(item);
        setSelectedItem(item);
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
                    arrItems.map((item, index) => (
                        <div key={index} onClick={() => handleClickItem(item)}>
                            <h5>{item.title}</h5>
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

export default TileCard2;
