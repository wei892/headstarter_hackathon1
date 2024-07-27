import React, { useState } from "react";
import InfoCard from "../Components/InfoCard";
import GraphCard from "../Components/Graph";
import "./Styling/Dashboard.css"
import { Row , Col} from "react-bootstrap";
import TileCard from "../Components/Tiles";

const Dashboard = () => {

    const [currentWeight, setCurrentWeight] = useState(120);
    const [weightGoal, setWeightGoal] = useState(150);
    const [currentFastingPeriod, setFastingPeriod] = useState(0);

    return(
        <div className="dashBoardbk_ground">
            <Row style={{ marginTop: '50px' }}>
                <Col>
                    <InfoCard className="card"
                        title = {"Current Weight"}
                        value = {currentWeight}
                    />
                </Col>

                <Col>
                    <InfoCard className="card"
                        title={"Weight Goal"}
                        value={weightGoal}
                    />
                </Col>

                <Col>
                    <InfoCard className="card"
                        title={"Current Fasting Period"}
                        value={currentFastingPeriod}
                    />
                </Col>

                <Col>
                    <InfoCard className="card"
                        title={"Hours Left Fasting"}
                        value = {"20hs"}
                    />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col lg={6}>
                    <GraphCard 
                        title={"Progress"}
                    />
                </Col>

                <Col lg={6}>
                <TileCard 
                    title={"Recipes"}
                />
                <br/>
                <TileCard 
                    title={"Workouts"}
                />
                </Col>
            </Row>

        </div>
    )

}

export default Dashboard;