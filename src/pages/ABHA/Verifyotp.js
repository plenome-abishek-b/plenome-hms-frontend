import PropTypes from "prop-types";
import React, { useState } from "react";
import api from "services/Api";
import { useParams,useHistory } from "react-router-dom";
import { Row, Col, CardBody, Card, Container, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import key from "./images/key.png";

const Verifyotp = () => {
  const [otp, setOtp] = useState("");
  const { txnId } = useParams();
  const [txnID, setTxnId] = useState(null); 
  const [token, setToken] = useState(null);
  console.log(token,'token here');

  const history = useHistory();


  const handleFormSubmit = () => {
    api.verifyAbhaOtp({ otp, txnId }).then(resp => {
      console.log(resp);
        const {data} = resp;
          console.log(`Transaction ID: ${data.txnId}`);

          setTxnId(data.txnId); 
    if (data.healthIdNumber === null && data.jwtResponse === null) {
      history.push(`/account/abha/checkmobile/${data.txnId}`); 
    } else {
      setTxnId(data.txnId); 
      console.log(data.jwtResponse.token, 'jwt')
      setToken(data.jwtResponse.token)

      localStorage.setItem('token', data.jwtResponse.token);
      localStorage.setItem('txnID', data.txnId);
      history.push(`/account/abha/checkmobile/${data.txnId}`);
    }
    });
  };

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5 bg-primary bg-soft">
        <Container style={{ height: "600px" }}>
          <Row className="justify-content-center" style={{ marginTop: "150px" }}>
            <Col lg="8" md="12" sm="12">
              <Card>
                <CardBody>
                  <div className="bg-primary">
                    <Row>
                      <Col xs={7}>
                        <div className="p-5">
                          <h2 className="text-white">OTP Verification</h2>
                        </div>
                      </Col>
                      <Col className="col-4 align-self-end" style={{ width: "90px", height: "50px", marginLeft: "140px", marginBottom: "60px" }}>
                        <img src={key} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-3 p-4 text-center">
                    <label className="fs-4">Enter OTP</label>
                    <br />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      style={{
                        width: "30%",
                        borderRadius: "5px",
                        border: "1px solid gray",
                        height: "40px",
                        textAlign: "center",
                      }}
                      maxLength={6}
                    />
                  </div>
                  <div className="mt-4 d-flex justify-content-center">
                    
                      <button className="btn-mod" onClick={handleFormSubmit}>
                        Verify
                      </button>
                   
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

export default Verifyotp;
