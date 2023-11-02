
import React from "react"
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  TabPane,
  TabContent,
  NavItem,
  NavLink,
} from "reactstrap"
import { Link } from "react-router-dom"

function SignupActivation() {
  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center mt-5">
          <Col lg={9} md={9} xl={8}>
            <Card className="overflow-hidden">
              <div className="bg-primary">
                <Row>
                  <Col className="col-8">
                    <div className="text-white p-5 mt-4">
                      <h4 className="text-white">Signup Activation</h4>
                      <br />
                      <p className="text-white">Activate your account</p>
                      {/* <p>Signup for New Account</p> */}
                    </div>
                  </Col>
                  <Col className="col-3 align-self-end p-5">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6360/6360268.png"
                      alt=""
                      className="img-fluid"
                    />
                  </Col>
                </Row>
              </div>
              <CardBody>
                <Form>
                  <Row style={{ justifyContent: "center" }}>
                    <Col lg="8">
                      <div className="mt-5">
                        <Label for="EmailorPhone">Email / Phone</Label>
                        <Input type="text" placeholder="Enter email or phone" />
                      </div>
                    </Col>
                    <Col lg="8">
                      <div className="mt-3 mb-5">
                        <Label for="OTP">OTP</Label>
                        <Input type="text" placeholder="Enter the otp" />
                      </div>
                    </Col>
                    <Row style={{ justifyContent: "flex-end" }}>
                      <Col lg="5">
                        {" "}
                        <div className="mt-2 mb-5">
                          <button className="btn btn-primary">
                            Resend OTP
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            style={{ marginLeft: "10px" }}
                          >
                            Activate
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="mt-2 text-center">
          <p>Registered User?</p>
          <Link to="/account/Login">Login</Link>
        </div>
      </Container>
    </div>
  )
}

export default SignupActivation
