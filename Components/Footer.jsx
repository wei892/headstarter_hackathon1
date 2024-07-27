import { Container, Row } from "react-bootstrap";

import "./Footer.css"

const Footer = () =>{
    return(
        <div className="footer-container">
            <Container fluid className="footer_bgcolor">
                <Row>
                    Footer
                </Row>
            </Container>
        </div>
    )
}

export default Footer;