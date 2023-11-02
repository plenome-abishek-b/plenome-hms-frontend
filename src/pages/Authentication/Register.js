import React, { useState } from "react";

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
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import classnames from "classnames";

import { Link } from "react-router-dom";

import { DatePicker } from "antd";

import api from "services/Api";

import Select from "react-select";

const Register = () => {
  //meta title
  document.title = "Register | BlockTrack"

  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]); //tabs management

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= 2) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  };

  const validation = useFormik({
    enableReinitialize: false,

    initialValues: {
      firstname: "",
      lastname: "",
      city: "",
      state: "",
      zip: "",
      phoneno: "",
      gender: "",
      dateofbirth: "",
      governmentidno: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your First Name"),
      lastname: Yup.string().required("Please Enter Your Last Name"),
      dateofbirth: Yup.string().required("Please Enter Your date of birth"),
      gender: Yup.string().required("Please Enter Your gender"),
      state: Yup.string().required("Please Enter Your  state"),
      city: Yup.string().required("Please Enter Your city"),
      zip: Yup.string().required("Please Enter Your Zip code"),
      phoneno: Yup.string().required("Please Enter Your phone no."),
      governmentidno: Yup.string().required(
        "Please Enter Your government ID no."
      ),
    }),
    onSubmit: values => {
      console.log("values", values)
    },
  });

  const validationType = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required("This value is required"),
      confirmpassword: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
      email: Yup.string()
        .email("Must be a valid Email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: values => {
      console.log("values", values)
    },
  });

  const rangeValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      phoneno: "",
    },
    validationSchema: Yup.object().shape({
      phoneno: Yup.string()
        .min(10, "Must be exactly 10 digits")
        .required("Min 1- chars"),
    }),
    onSubmit: values => {
      console.log("values", values)
    },
  });

  function postSignupUser() {
    api.postSignup({
      email,
      firstname,
      lastname,
      password,
      mobileno,
      governmentidno,
      dateofbirth,
      gender,
      state,
      city,
      zip,
    })
  };

  const optionGroup = [
    {
      label: "gender",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Transgender", value: "transgender" },
      ],
    },
  ];

  const optionGroupId = [
    {
      label: "Govt-id",
      options: [
        { label: "Aadhar", value: "aadhar" },
        { label: "Voter ID", value: "voter-id" },
        { label: "PAN", value: "pan" },
        { label: "Smart-card", value: "smartcard" },
        { label: "Driving Licence", value: "drivinglicence" },
      ],
    },
  ];

  const optionGroupBlood = [
    {
      label: "blood-group",
      options: [
        { label: "B +ve", value: "B +ve" },
        { label: "B -ve", value: "B -ve" },
        { label: "O +ve", value: "O +ve" },
        { label: "O -ve", value: "O -ve" },
        { label: "A +ve", value: "A +ve" },
        { label: "A -ve", value: "B -ve" },
        { label: "AB +ve", value: "AB +ve" },
        { label: "AB -ve", value: "AB -ve" },
      ],
    },
  ];

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
            <Col lg={9} md={9} xl={15}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <Row>
                    <Col className="col-9">
                      <div className="text-white p-5">
                        <h4 className="text-white">Register here</h4>
                        <p>Signup for New Account</p>
                      </div>
                    </Col>
                    <Col className="col-2 align-self-end p-3">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4228/4228730.png"
                        alt=""
                        className="img-fluid"
                      />
                    </Col>
                  </Row>
                </div>
                <CardBody className="">
                  <div className="wizard clearfix">
                    {" "}
                    <Form
                      className="p-5"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        validationType.handleSubmit()
                        rangeValidation.handleSubmit()
                        postSignupUser()

                        return false
                      }}
                    >
                      <Row>
                        <Col lg="6">
                          <div className="mb-3">
                            <Label for="firstname">First name</Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="firstname"
                              placeholder="Enter Your First Name"
                              // value={firstname}
                              onChange={validation.handleChange}
                              // onChange={e=>setFirstname(e.target.value)}
                              onBlur={validation.handleBlur}
                              value={validation.values.firstname || ""}
                              invalid={
                                validation.touched.firstname &&
                                validation.errors.firstname
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.firstname &&
                            validation.errors.firstname ? (
                              <FormFeedback type="invalid">
                                {validation.errors.firstname}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col lg="6">
                          <div className="mb-3">
                            <Label for="lastname">Last name</Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="lastname"
                              placeholder="Enter Your Last Name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.lastname || ""}
                              invalid={
                                validation.touched.lastname &&
                                validation.errors.lastname
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.lastname &&
                            validation.errors.lastname ? (
                              <FormFeedback type="invalid">
                                {validation.errors.lastname}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <div className="mb-3">
                            <Label for="phoneno">Phone</Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="phoneno"
                              placeholder="Enter Your Phone No."
                              title="Enter your number"
                              onChange={rangeValidation.handleChange}
                              onBlur={rangeValidation.handleBlur}
                              value={rangeValidation.values.phoneno || ""}
                              invalid={
                                rangeValidation.touched.phoneno &&
                                rangeValidation.errors.phoneno
                                  ? true
                                  : false
                              }
                            />
                            {rangeValidation.touched.phoneno &&
                            rangeValidation.errors.phoneno ? (
                              <FormFeedback type="invalid">
                                {rangeValidation.errors.phoneno}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col lg="6">
                          <div className="mb-3">
                            <Label for="email">Email</Label>
                            <Input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter Your Email ID"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.email || ""}
                              invalid={
                                validationType.touched.email &&
                                validationType.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.email &&
                            validationType.errors.email ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <div className="mb-3">
                            <Label for="password">Password</Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Enter Password"
                              title="Password must be 8 characters including 1 uppercase letter, 1 lowercase letter and alpha-numeric characters"
                              required
                              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.password || ""}
                              invalid={
                                validationType.touched.password &&
                                validationType.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.password &&
                            validationType.errors.password ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col lg="6">
                          <div className="mb-3">
                            <Label for="confirm-password">
                              Confirm Password
                            </Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="confirmpassword"
                              placeholder="Confirm Password"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={
                                validationType.values.confirmpassword || ""
                              }
                              invalid={
                                validationType.touched.confirmpassword &&
                                validationType.errors.confirmpassword
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.confirmpassword &&
                            validationType.errors.confirmpassword ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.confirmpassword}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <div className="mb-3">
                            <Label for="gender">Gender</Label>
                            <Select options={optionGroup} />
                          </div>
                        </Col>
                        <Col lg="6">
                          <div className="mb-3">
                            <Label for="dob">Date of Birth</Label>
                            <br />
                            <DatePicker size="large" placement="bottomLeft" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <div className="mb-3">
                            <Label for="state">State</Label>
                            <Input
                              id="state"
                              className="form-control"
                              placeholder="Enter Your state"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.state || ""}
                              invalid={
                                validation.touched.state &&
                                validation.errors.state
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.state &&
                            validation.errors.state ? (
                              <FormFeedback type="invalid">
                                {validation.errors.state}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col lg="4">
                          <div className="mb-3">
                            <Label for="city">City</Label>
                            <Input
                              id="city"
                              className="form-control"
                              placeholder="Enter Your city"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.city || ""}
                              invalid={
                                validation.touched.city &&
                                validation.errors.city
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.city &&
                            validation.errors.city ? (
                              <FormFeedback type="invalid">
                                {validation.errors.city}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col lg="4">
                          <div className="mb-3">
                            <Label for="state">Zip code</Label>
                            <Input
                              id="zip"
                              className="form-control"
                              placeholder="Enter Your zipcode"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.zip || ""}
                              invalid={
                                validation.touched.zip && validation.errors.zip
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.zip && validation.errors.zip ? (
                              <FormFeedback type="invalid">
                                {validation.errors.zip}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>{" "}
                      <Row>
                        <Col lg="6">
                          <div className="mt-3">
                            <Label for="govtid">Government ID</Label>
                            <Select options={optionGroupId} />
                          </div>
                        </Col>
                        <Col lg="6">
                          <div className="mt-3">
                            <Label for="governmentidno">
                              Government ID no.
                            </Label>
                            <Input
                              id="governmentidno"
                              type="text"
                              placeholder="Enter the Govt ID no."
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.governmentidno || ""}
                              invalid={
                                validation.touched.governmentidno &&
                                validation.errors.governmentidno
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.governmentidno &&
                            validation.errors.governmentidno ? (
                              <FormFeedback type="invalid">
                                {validation.errors.governmentidno}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <div className="mt-3">
                            <Label for="Blood group">Blood group</Label>
                            <Select options={optionGroupBlood} />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="mt-3" style={{float:"right"}}>
                            <button
                              className="btn btn-primary btn-md btn-md"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/account/login" className="font-weight-medium text-primary">
                    {" "}
                    Login /
                  </Link>{" "}
                  <Link to="/account/activation" className="font-weight-medium text-primary">
                    {" "}
                    Activate
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register;
