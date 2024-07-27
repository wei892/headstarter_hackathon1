import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () =>{
    return(
        <div>
            <div className="registerCont">
                <h2> Log In </h2>
                {/* name, age, gender, height, activity, inital weight, goal weight */}
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formEmail">
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formEmail">
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="password" />
                        </Col>
                    </Form.Group>
                </Form>

                <Link to="../">
                    <Button> Create Account </Button>
                </Link>
                <br></br>
                <Link to="">
                    Forgot Password
                </Link>
            </div>
        </div>
    )
}

export default Login;