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

const Forgotpassword = (props) => {
    const [data, setData] = useState([]);

    const onChange = e => {
        //catch the parameters when changed.
        const { value, name } = e.target
        console.log(value, name,'selectttttt');
        setData({ ...data, [name]: value })
        
      }

    const handleFormSubmit = async() => {
        console.log("hi");
        const response = await api.postForgotPassword(data)
        const {datas } = response;
        console.log(datas,'forgot data');
    }

  return (
    <React.Fragment>
      {/* <Sidebar props={userData}/> */}
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5 bg-primary bg-soft p-3" style={{position: 'relative',top: '100px'}}>
        <Container>
          <Row className="justify-content-center mt-5 p-4">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="p-5">
                        <h2 className="text-white">Forgot Password</h2>
                        <p className="text-white">Enter Your Mail</p>
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

                <CardBody className="p-4">
                    <Row>
                    <Col>
                        <label>Enter Mail</label>
                        <br />
                        <input style={{width: '100%', height: '35px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}} name="Username" onChange={onChange} value={data.Username}></input>
                    </Col>
                    </Row>
                    <div className="mt-5 d-flex justify-content-center">
                        <button className="btn btn-primary" onClick={handleFormSubmit}>Send Mail</button>
                    </div>
                 </CardBody>
                 </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Forgotpassword);
