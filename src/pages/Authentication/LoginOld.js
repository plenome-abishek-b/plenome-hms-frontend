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
import { ToastContainer, toast, Slide, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { loginSuccess } from "store/login/actions";
// import {Plenome} from '../Authentication/Profile/plenome.svg';
import './Login.css';
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

      const { details } = response.data;
      console.log(details, 'detailsss');
      const { resetStatus, username, role_name, Staff_id,staffName } = details;
      console.log(resetStatus, username, role_name, Staff_id, "datasss");
      if (Staff_id && role_name === "Doctor") {
        console.log(Staff_id, "both");
        localStorage.setItem("existingDocotr_id", Staff_id);
      }
      // dispatch(loginSuccess(role_name));
      localStorage.setItem("Staff_id", Staff_id);
      localStorage.setItem("newRole", role_name);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loginTime", Date.now().toString());
      localStorage.setItem("staffname",staffName);

      fakeBackend(values.email, values.password);
      if (response.status === 201) {
        toast.success(`Logged in as ${role_name}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 200,
          transition: Flip,
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
      {/* <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div> */}
      <ToastContainer transition={Flip} />
      <div className="account-pages  pt-sm-5 ">
        <Container className="">
          <Row className=" justify-content-end">
            <Col md={8} lg={6} xl={5} className="">
              <Card className="">
                <div className="">
                  <Row>
                    <Col className="pt-5 pb-3">
                      <div className="p-5  text-center">
                        <span className="plenome-hospital-text">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="37"
                              height="37"
                              viewBox="0 0 37 37"
                              fill="none"
                            >
                              <g clip-path="url(#clip0_54_7738)">
                                <g filter="url(#filter0_d_54_7738)">
                                  <path
                                    d="M18.7316 2.27599C9.9951 2.29615 2.92844 9.38866 2.94859 18.1167C2.96873 26.8447 10.0681 33.9046 18.8045 33.8844C27.541 33.8642 34.6076 26.7717 34.5875 18.0437C34.5674 9.31564 27.468 2.25582 18.7316 2.27599ZM18.8007 32.2094C10.9894 32.2274 4.64323 25.9166 4.62522 18.1128C4.60721 10.3091 10.9242 3.96759 18.7354 3.94956C26.5467 3.93153 32.8929 10.2424 32.9109 18.0461C32.9289 25.8498 26.6119 32.1899 18.8006 32.2079L18.8007 32.2094Z"
                                    fill="url(#paint0_linear_54_7738)"
                                  />
                                </g>
                                <path
                                  d="M20.401 32.1132C28.1596 31.2119 33.7179 24.1978 32.8158 16.4466C31.9137 8.69551 24.8928 3.14261 17.1342 4.04388C9.37554 4.94515 3.81724 11.9593 4.71935 19.7104C5.62146 27.4616 12.6424 33.0145 20.401 32.1132Z"
                                  fill="url(#paint1_linear_54_7738)"
                                />
                                <path
                                  d="M13.6411 21.6953C14.9843 20.8764 15.733 19.7131 15.8293 18.1319C15.851 18.1319 15.8901 18.1318 15.9306 18.1317C17.3134 18.1285 18.6961 18.1166 20.0788 18.1264C20.6145 18.131 21.1109 18.0069 21.5794 17.7642C22.2389 17.4228 22.7517 16.9298 23.0629 16.2464C23.3553 15.602 23.3871 14.938 23.219 14.2542C22.9983 13.355 22.4481 12.727 21.6219 12.3456C21.1886 12.1456 20.7192 12.0439 20.2371 12.0364C19.6955 12.0289 19.154 12.0099 18.614 12.0257C18.2173 12.0367 17.8147 12.0261 17.4284 12.1398C16.3244 12.4678 15.6152 13.1739 15.4122 14.3243C15.3422 14.7193 15.3344 15.1301 15.3296 15.5323C15.3222 16.0993 15.3539 16.6677 15.3509 17.2362C15.349 17.6846 15.353 18.1373 15.299 18.5815C15.208 19.318 14.8561 19.935 14.3361 20.4627C13.8045 21.0021 13.1916 21.3998 12.4478 21.578C12.0903 21.6627 11.7284 21.6838 11.3621 21.6745C11.2955 21.6732 11.2766 21.6487 11.2808 21.5807C11.2961 21.3131 11.3099 21.044 11.3166 20.7764C11.327 20.2802 11.3302 19.7826 11.3392 19.2864C11.3549 18.5458 11.3647 17.8037 11.3934 17.0631C11.418 16.4106 11.4527 15.7582 11.5033 15.1072C11.5497 14.5285 11.6107 13.9497 11.6904 13.3738C11.8072 12.5361 12.1356 11.7773 12.635 11.0992C13.5299 9.88502 14.7211 9.08815 16.1593 8.65233C16.8263 8.44973 17.5109 8.38017 18.2044 8.36555C18.7662 8.35413 19.3279 8.33692 19.8897 8.34719C20.5963 8.36003 21.3058 8.37575 21.9997 8.53904C23.2355 8.83128 24.2909 9.43492 25.2022 10.321C26.0584 11.155 26.634 12.1431 26.9581 13.2851C27.1362 13.9153 27.197 14.5603 27.1768 15.2142C27.1471 16.1487 26.9509 17.0503 26.5561 17.8974C26.0072 19.0776 25.2059 20.05 24.0897 20.7397C23.2323 21.2696 22.2947 21.5524 21.2857 21.614C20.2593 21.6757 19.2329 21.7186 18.2034 21.718C17.2058 21.7175 16.2097 21.7226 15.2121 21.7235C14.7053 21.7247 14.1971 21.7143 13.6903 21.7097C13.6846 21.7097 13.6773 21.7053 13.644 21.6939L13.6411 21.6953ZM11.2197 22.0726C11.2315 22.1666 11.2418 22.2621 11.258 22.3546C11.3329 22.813 11.8817 23.4829 12.5288 23.4337C12.9573 23.4008 13.3931 23.4215 13.8232 23.448C14.2779 23.4773 14.6537 23.7947 14.7459 24.2299C14.8337 24.6434 14.8376 25.0657 14.785 25.4882C14.7068 26.1133 14.0708 26.582 13.4509 26.4735C12.8613 26.3692 12.4286 25.8264 12.4461 25.2608C12.4609 24.7819 12.4468 24.3017 12.4486 23.8215C12.4484 23.7347 12.4252 23.7 12.3296 23.6887C11.9414 23.6404 11.6123 23.4647 11.3395 23.1847C11.3047 23.1486 11.2742 23.1067 11.2292 23.0533C11.2182 23.3181 11.1985 23.5582 11.2019 23.7983C11.2105 24.3827 11.2292 24.9685 11.2451 25.5528C11.2609 26.1213 11.4387 26.63 11.8421 27.0399C12.5097 27.7167 13.324 27.9738 14.24 27.7388C15.2037 27.4921 15.8103 26.834 16.0064 25.863C16.1353 25.2291 16.1222 24.5724 15.9904 23.9363C15.8528 23.2784 15.4751 22.7701 14.8981 22.4128C14.5515 22.198 14.1619 22.1454 13.7738 22.1246C12.9282 22.0774 12.0825 22.0547 11.2369 22.022C11.2283 22.048 11.2182 22.0611 11.2197 22.0726Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_54_7738"
                                  x="-0.911785"
                                  y="0.474565"
                                  width="36.7867"
                                  height="36.7564"
                                  filterUnits="userSpaceOnUse"
                                  color-interpolation-filters="sRGB"
                                >
                                  <feFlood
                                    flood-opacity="0"
                                    result="BackgroundImageFix"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dx="-1.287" dy="0.772201" />
                                  <feGaussianBlur stdDeviation="1.287" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0.294118 0 0 0 0 0.556863 0 0 0 0.12 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_54_7738"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_54_7738"
                                    result="shape"
                                  />
                                </filter>
                                <linearGradient
                                  id="paint0_linear_54_7738"
                                  x1="18.8031"
                                  y1="33.8829"
                                  x2="18.7301"
                                  y2="2.27455"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#070735" />
                                  <stop offset="1" stop-color="#6ABAFF" />
                                </linearGradient>
                                <linearGradient
                                  id="paint1_linear_54_7738"
                                  x1="-4.6371"
                                  y1="-0.901456"
                                  x2="45.9556"
                                  y2="40.2095"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#070735" />
                                  <stop offset="1" stop-color="#6ABAFF" />
                                </linearGradient>
                                <clipPath id="clip0_54_7738">
                                  <rect
                                    width="36"
                                    height="36"
                                    fill="white"
                                    transform="translate(0 0.560547) rotate(-0.132238)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>{" "}
                          Plenome Hospitals
                        </span>
                      </div>
                      <div className="welcome-text text-center">
                        <span>Welcome!</span>
                      </div>
                    </Col>
                    {/* <Col className="col-4 align-self-end">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4807/4807695.png"
                        alt=""
                        className="img-fluid"
                      />
                    </Col> */}
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
                        <Label className="form-label user-name-text">
                          Username / Email
                        </Label>
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
                        <Label className="form-label user-name-text">
                          Password
                        </Label>
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
                            <i className="fas fa-eye eye"></i>
                          ) : (
                            <i className="fas fa-eye-slash eye"></i>
                          )}
                        </button>

                        {/* {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null} */}
                      </div>

                      <div className="form-check d-flex justify-content-between">
                        <div>
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
                        <div>
                          <Link
                            to="/account/forgotpassword"
                            className="forget-text"
                          >
                            {/* <i className="mdi mdi-lock me-1" /> */}
                            Forgot password?
                          </Link>
                        </div>
                      </div>

                      <div className="mt-3 d-grid pb-5">
                        <button
                          className="btn btn-outline-primary bg-primary btn-block text-white"
                          // type="submit"
                          onClick={() => handleFormSubmit(validation.values)}
                        >
                          Sign In
                        </button>
                      </div>
                      {/* {userData === "Doctor" && <Sidebar role="Doctor" />}
            {userData === "Super Admin" && <Sidebar role="Super Admin" />} */}

                      {/* <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <FacebookLogin
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
                            <GoogleLogin 
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
                      </div> */}

                      {/* <div className="mt-4 text-center">
                        <Link
                          to="/account/forgotpassword"
                          className="text-muted"
                        >
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div> */}
                    </Form>
                  </div>
                </CardBody>
              </Card>
              {/* <div className="mt-5 text-center">
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
              </div> */}
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
