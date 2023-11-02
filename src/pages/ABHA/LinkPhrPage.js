import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import storage from "services/Storage"
import api from "services/Api"
import { Toast } from "react-hot-toast"

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
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link, useHistory, useParams } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"
import aadhar from "./images/shield.png"

console.log(aadhar)

const Linkphrpage = props => {
  const history = useHistory()

    const [formData, setFormData] = useState({
        phrAddress: '', // Initialize with empty values
        password: ''
      });

    const onChange = e => {
        console.log(e.target.value, "lllll")
        const { value, id } = e.target
        setFormData({ ...formData, [id]: value })
      }
    

    const SuggestedNamesString = localStorage.getItem("suggestions");
    const SuggestedNames = SuggestedNamesString ? SuggestedNamesString.split(',') : [];
    const handleFormSubmit = async () => {
      const transactionId = localStorage.getItem("txnID");
      console.log(transactionId,'tid');
      
      try {
          const phrAddress = formData.phrAddress;
          const password = formData.password;
          const alreadyExistedPHR = false;
          const response = await api.createPhrAddress(transactionId,phrAddress,password,alreadyExistedPHR);
          const { data } = response;
          console.log(data, "response here");
          const newphrAddress = data.phrAdress;
          console.log(newphrAddress,'newadd');
          if (response.status === 201) {
              toast.success("Created Successfully", {
                  duration: 1000,
                  style: {
                      width: "500px",
                      backgroundColor: "lightblue",
                      fontSize: "15px",
                      height: '100px'
                  },
              });
              setFormData({
                  phrAddress: '', // Clear the fields after success
                  password: ''
              });
  
              // Delay the page push for 3 seconds
              setTimeout(() => {
                  history.push('/account/abhaverifyotp');
              }, 3000);
          }
      } catch (error) {
          console.error("Error:", error);
          // Handle errors here
      }
  }
  

  return (
    <React.Fragment>
      {/* <Sidebar props={userData}/> */}
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5 bg-primary bg-soft">
        <Container style={{ height: "600px" }}>
          <Row
            className="justify-content-center"
            style={{ marginTop: "150px" }}
          >
            <Col lg="8" md="12" sm="12">
              <Card>
                <CardBody>
                    <Toaster />
                  <div className="bg-primary p-3 text-white">
                    <h5>Create Address</h5>
                  </div>
                  <div className="mt-3 p-4">
                  <label>PHR Name</label>
                  <br />
                  <input
                 id="phrAddress"
                 onChange={e => onChange(e)}
                 value={formData?.phrAddress || ""}
                    style={{
                      border: "1px solid grey",
                      borderRadius: "5px",
                      height: "30px",
                      width: '100%'
                    }}
                    placeholder="e.g. xxxxxx@sbx"
                  ></input>
                  <br />
                  <br />
                  <label>Password</label>
                  <br />
                  <input
                  id="password"
                  onChange={e => onChange(e)}
                  value={formData?.password || ""}
                    type="password"
                    style={{
                      border: "1px solid grey",
                      borderRadius: "5px",
                      height: "30px",
                      width: '100%'
                    }}
                  ></input>
                  
                  </div>
                  <br />
                  <p className="text-danger fw-bold">Suggested Names :</p>
                  <div className="">
                    {SuggestedNames.map((name, index) => (
                      <p key={index}>{name}</p>
                    ))}
                  </div>
                  <br />
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={handleFormSubmit}>submit</button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Linkphrpage)
