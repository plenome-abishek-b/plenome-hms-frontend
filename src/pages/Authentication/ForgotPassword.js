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
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import api from "services/Api"

const Forgotpassword = (props) => {
    const [data, setData] = useState([]);
    
    const history = useHistory()

    const onChange = e => {
        //catch the parameters when changed.
        const { value, name } = e.target
        console.log(value, name,'selectttttt');
        setData({ ...data, [name]: value })
        
      }

      const handleFormSubmit = async () => {
        console.log("hi");
        const response = await api.postForgotPassword(data);
        const { datas } = response;
        console.log(datas, 'forgot data');
    
        if (response.status === 201) {
          toast.success("Password Reset Mail sent Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 300,
          });
          setTimeout(()=>{
            history.push('/account/login')
          },1200)
           
          
        }
    };
    

  return (
    <React.Fragment>
      {/* <Sidebar props={userData}/> */}
      <div className="d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <ToastContainer />
      <div className="account-pages my-5 pt-sm-5 bg-primary bg-soft p-5" style={{position: 'relative',top: '30px'}}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden" style={{height: '500px'}}>
                <div className="bg-primary bg-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="p-5">
                        <h2 className="text-white">Forgot Password</h2>
                        {/* <p className="text-white">Enter Your Mail</p> */}
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
                    <Row className="mt-5">
                    <Col>
                        <label>Enter Mail</label>
                        <br />
                        <Input className="mt-2" style={{width: '100%', height: '35px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px'}} name="Username" onChange={onChange} value={data.Username}></Input>
                    </Col>
                    </Row>
                    <div className="mt-5 d-flex justify-content-center">
                        <button className="btn btn-primary" onClick={handleFormSubmit}>Reset Password</button>
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
