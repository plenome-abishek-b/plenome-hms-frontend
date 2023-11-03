import PropTypes from "prop-types";
import React, { useState, useEffect} from "react";
import storage from "services/Storage";
import api from "services/Api";


import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link , useHistory} from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";


// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// actions
import { loginUser } from "store/actions";
import { LOGIN_SUCCESS } from "store/auth/login/actionTypes";

//Import config
import { facebook, google } from "../../config";
import fakeBackend from "helpers/AuthType/fakeBackend";
import Sidebar from "components/VerticalLayout/Sidebar";
import { setRoleName } from "store_1/authslice";
// import api from "services/Api"

const Login = props => {
  //meta title
  document.title = "Login | BlockTrack"

  const dispatch = useDispatch()
  const [creds, setCreds] = useState(null);
  const [userData, setUserData] = useState('');
  console.log(userData,"ussserr")

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: false,

    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Username / Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      dispatch(loginUser(values, props.history))
      // console.log(values,'values')
      onLoginUser(values)
      setCreds(values)
    },
  });


  const history = useHistory();

  const onLoginUser = async (values) => {
    try {
      console.log("onLoginUser called");
      const response = await api.getRoleBased(values.email);
      const data = response.data[0].role_name;
      const updatedData = data; // Store the data in a separate variable
      console.log(updatedData, 'updateddata');
      setUserData(updatedData);
      console.log(userData, 'userdataaaa')
      // <Sidebar userRole={updatedData} />
      // dispatch(setRoleName(updatedData))
  
      if (updatedData === "Doctor") {
        dispatch({ type: LOGIN_SUCCESS, payload: { userRole: "Doctor" } });
        toast.success("Logged in as a Doctor", {
          duration: 3000,
          style: {
            width: "300px",
            backgroundColor: "lightblue",
            fontSize: "15px",
          },
        });
      } else if (updatedData === "Super Admin") {
        dispatch({ type: LOGIN_SUCCESS, payload: { userRole: "Super Admin" } });
        toast.success("Logged in as a Super Admin", {
          duration: 3000,
          style: {
            width: "300px",
            backgroundColor: "lightblue",
            fontSize: "15px",
          },
        });
      }
  
      await handleVerify(values);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    if (userData !== null) {
      console.log(userData, "data here new");
    }
  }, [userData]);
  

const handleVerify = async(values) => {
  try {
    const response = await api.postAuthUsers(values);
    console.log(values, 'values');
    console.log(response);
    fakeBackend(values.email, values.password)
    
    
    // Check if the response status is 200
    if (response.status === 200) {
      dispatch(setRoleName(userData))       
      // Authentication successful, navigate to the dashboard page
      history.push("/dashboard");
    } else {
      // Handle other response statuses if needed
    }
  } catch (error) {
    console.error(error);
    // Handle the error and display appropriate message   
  }
}

  const { error } = useSelector(state => ({
    error: state.Login.error,
    
  }));


  const googleResponse = response => {
    signIn(response, "google")
  };

  const facebookResponse = response => {
    signIn(response, "facebook")
  };

  const handleFormSubmit = async (values) => {
    try {
      validation.handleSubmit();
      await onLoginUser(values);
      await handleVerify(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
    {/* <Sidebar props={userData}/> */}
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5 bg-primary bg-soft">
        <Container>
        <Toaster />
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
                      onSubmit={validation.handleSubmit}
                    >
                      {/* {error ? <Alert color="danger">{error}</Alert> : null} */}

                      <div className="mb-3">
                        <Label className="form-label">Username / Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter Username or email"
                          type="email"
                          onChange={validation.handleChange}
                          // onChange={e => setEmail(e.target.value)}
                          // value={email}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {/* {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null} */}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          // value={password}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          // onChange={e => setPassword(e.target.value)}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {/* {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null} */}
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
                          // type="submit"
                          onClick={() => handleFormSubmit(validation.values)} 
                        >
                          Log In
                        </button>
                        
                      </div>
                        {/* {userData === "Doctor" && <Sidebar role="Doctor" />}
            {userData === "Super Admin" && <Sidebar role="Super Admin" />} */}
                      
                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <FacebookLogin //Facebook Login
                              appId={facebook.APP_ID}
                              autoLoad={false}
                              callback={facebookResponse}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-facebook" />
                                </Link>
                              )}
                            />
                          </li>

                          <li className="list-inline-item">
                            <GoogleLogin //Google login
                              clientId={google.CLIENT_ID}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-google" />
                                </Link>
                              )}
                              onSuccess={googleResponse}
                              onFailure={() => {}}
                            />
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
                  <Link
                    to="/account/registerstaff"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                <p>
                  {new Date().getFullYear()} © BlockTrack{" "}
                  <i className="mdi text-danger" />
                </p>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
