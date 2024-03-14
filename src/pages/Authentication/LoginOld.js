import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
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

import { withRouter, Link, useHistory } from "react-router-dom";
// import { toast, Toaster } from "react-hot-toast";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// actions
import { loginUser } from "store/actions";

//Import config
import { facebook, google } from "../../config";
import fakeBackend from "helpers/AuthType/fakeBackend";
import Sidebar from "components/VerticalLayout/Sidebar";
import { setRoleName } from "store_1/authslice";
import { ToastContainer, toast,Slide, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { loginSuccess } from "store/login/actions";
// import api from "services/Api"

const Login = (props) => {
  //meta title
  document.title = "Login | BlockTrack";

  const dispatch = useDispatch();
  const [creds, setCreds] = useState(null);
  const [userData, setUserData] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  console.log(userData, "ussserr");

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: false,

    initialValues: {
      Username: "",
      Password: "",
    },
    validationSchema: Yup.object({
      Username: Yup.string().required("Please Enter Your Username / Email"),
      Password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.history));
      // console.log(values,'values')
      // onLoginUser(values);
      setCreds(values);
    },
  });

  const history = useHistory();
  const onLoginUser = async (values) => {
    // try {
    //   console.log("onLoginUser called");
    //   const response = await api.getRoleBased(values.email);
    //   const data = response.data[0].role_name;
    //   const updatedData = data; // Store the data in a separate variable
    //   console.log(updatedData, 'updateddata');
    //   setUserData(updatedData);
    //   console.log(userData, 'userdataaaa');
    //   await handleVerify(values);
    //   if (updatedData === "Doctor") {
    //     dispatch({ type: LOGIN_SUCCESS, payload: { userRole: "Doctor" } });
    //     toast.success("Logged in as a Doctor", {
    //       duration: 3000,
    //       style: {
    //         width: "300px",
    //         backgroundColor: "lightblue",
    //         fontSize: "15px",
    //       },
    //     });
    //   } else if (updatedData === "Super Admin") {
    //     dispatch({ type: LOGIN_SUCCESS, payload: { userRole: "Super Admin" } });
    //     toast.success("Logged in as a Super Admin", {
    //       duration: 1000,
    //       style: {
    //         width: "300px",
    //         backgroundColor: "lightblue",
    //         fontSize: "15px",
    //       },
    //     });
    //   }
    //   // Introduce a delay of 3 seconds before calling handleVerify
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    if (userData !== null) {
      console.log(userData, "data here new");
    }
  }, [userData]);

  const handleVerify = async (values) => {
    try {
      console.log("handleVerify called with values:", values);

      const response = await api.postAuthUsers(values);
      console.log("API response:", response);


      const [{ details }] = response.data;
      const { resetStatus, username,role_name,Staff_id } = details;
      console.log(resetStatus, username,role_name,Staff_id, "datasss");
      if(Staff_id && role_name === 'Doctor'){
        console.log(Staff_id,"both")
        localStorage.setItem('existingDocotr_id',Staff_id)
      }
      // dispatch(loginSuccess(role_name));
      localStorage.setItem("newRole",role_name)
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('loginTime', Date.now().toString());


      fakeBackend(values.email, values.password);
      if (response.status === 201) {
        toast.success(`Logged in as ${role_name}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 200, 
          transition: Flip
        });
        dispatch(setRoleName(userData));
        setTimeout(() => {
          history.push("/dashboard");
        }, 1000);

        if (resetStatus === 1) {
          setTimeout(async () => {
            const newPassword = prompt(
              "Your password has been reset. Please enter your new password:"
            );
            if (newPassword) {
              const newPasswordResponse = await api.postResetPassword({
                Username: username,
                Password: newPassword,
              });
              console.log("New password API response:", newPasswordResponse);
              if (newPasswordResponse.status === 201) {
                window.alert("Password reset successful");
              } else {
                window.alert("Password reset failed");
              }
            } else {
              console.log("New password not provided");
            }
          }, 1200);
        }
      } else {
        console.log("Other response status:", response.status);
      }
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        toast.error("Invalid email or password", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 250,
        });
      }
      console.error("Error in handleVerify:", error);
    }
  };

  const { error } = useSelector((state) => ({
    error: state.Login.error,
  }));

  const googleResponse = (response) => {
    signIn(response, "google");
  };

  const facebookResponse = (response) => {
    signIn(response, "facebook");
  };

  const handleFormSubmit = async (values) => {
    try {
      const Hospital_id = validation.handleSubmit();
      await onLoginUser(values);
      await handleVerify(values, Hospital_id);
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <React.Fragment>
      {/* <Sidebar props={userData}/> */}
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <ToastContainer transition={Flip}/>
      <div className="account-pages my-5 pt-sm-5 bg-primary bg-soft">
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
                      onSubmit={validation.handleSubmit}
                    >
                      {/* {error ? <Alert color="danger">{error}</Alert> : null} */}

                      <div className="mb-3">
                        <Label className="form-label">Username / Email</Label>
                        <Input
                          name="Username"
                          className="form-control"
                          placeholder="Enter Username or email"
                          type="email"
                          onChange={validation.handleChange}
                          // onChange={e => setEmail(e.target.value)}
                          // value={email}
                          onBlur={validation.handleBlur}
                          value={validation.values.Username || ""}
                          invalid={
                            validation.touched.Username &&
                            validation.errors.Username
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
                          name="Password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.Password &&
                            validation.errors.Password
                              ? true
                              : false
                          }
                        />
                        <button
                          type="button"
                          style={{
                            position: "absolute",
                            right: "30px",
                            top: "295px",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            color: "grey",
                          }}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <i className="fas fa-eye-slash"></i>
                          ) : (
                            <i className="fas fa-eye"></i>
                          )}
                        </button>

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
                              render={(renderProps) => (
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
                              render={(renderProps) => (
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
                        <Link
                          to="/account/forgotpassword"
                          className="text-muted"
                        >
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
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
