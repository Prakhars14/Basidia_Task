import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container,Col, Row } from "reactstrap";
class Landing extends Component {
  render() {
    return (
      <div className="">
      <Container >
      <div style={{ height: "75vh", borderRadius:'5px', marginTop:'100px' }} className=" p-5 bg-light cardhover">
        <Row className="d-flex justify-content-center mt-5">
        <h4>Register if you are new to Basidia Task</h4>
        </Row>
        <Row>
            <br />
            <Col className="d-flex justify-content-center pt-5 mt-5">
              <Link
                to="/signup"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-primary"
              >
                Register
              </Link>
            </Col>
            <Col className="d-flex justify-content-center pt-5 mt-5">
              <Link
                to="/signin"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-success"
              >
                Log In
              </Link>
            </Col>
          </Row>
      </div>
      </Container>
      </div>
    );
  }
}export default Landing;