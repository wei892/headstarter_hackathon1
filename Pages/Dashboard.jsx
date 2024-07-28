import React, { useState } from "react";
import InfoCard from "../Components/InfoCard";
import GraphCard from "../Components/Graph";
import "./Styling/Dashboard.css"
import { Row , Col} from "react-bootstrap";
import TileCard from "../Components/Tiles";
import TilesCard2 from "../Components/Tiles2.jsx";
const Dashboard = () => {

    const [currentWeight, setCurrentWeight] = useState(200);
    const [weightGoal, setWeightGoal] = useState(180);
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
                        value = {20}
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

                </Col>
            </Row>

        <br/>
        </div>
    )

}

export default Dashboard;
