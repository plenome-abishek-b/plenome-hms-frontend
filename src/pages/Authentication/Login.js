// import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "services/Api";
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";


function Login() {

  const initialLoginValues = {
    email: '',
    password: ''
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function handleFormSubmit() {
    console.log("kkkk")
      //for posting and getting data at a sametime
      api.postAuthUsers(email,password).then(resp => {
        console.log(resp)
      })
  }


  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="p-5">
                        <h2 className="text-white">BlockTrack</h2>
                        <p className="text-white">Sign in to continue</p>
                      </div>
                    </Col>
                    <Col className="col-4 align-self-end">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4807/4807695.png"
                        alt=""
                        className="img-fluid"
                      />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div></div>
                  <div className="p-3">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        handleFormSubmit()
                        return false
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Username / Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter Username or email"
                          type="email"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={e => setPassword(e.target.value)}
                          value={password}
                        />
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-outline-primary btn-block"
                          type="submit"
                          onClick={()=>handleFormSubmit()}
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <Link
                              to="#"
                              className="social-list-item bg-primary text-white border-primary"
                            >
                              <i className="mdi mdi-facebook" />
                            </Link>
                          </li>

                          <li className="list-inline-item">
                            <Link
                              to="#"
                              className="social-list-item bg-danger text-white border-danger"
                            >
                              <i className="mdi mdi-google" />
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/account/registerstaff" className="fw-medium text-primary">
                    Signup now
                  </Link>
                </p>
                <p>
                  {new Date().getFullYear()} © BlockTrack{" "}
                  
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Login;
