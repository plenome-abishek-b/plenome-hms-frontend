import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Input } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import { TextField } from "@mui/material";
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"

//redux

const BillGeneration = props => {

    const [openDialog, setOpenDialog] = React.useState(false)

    const handleClickOpen = () => {
      //dialog open
      setOpenDialog(true)
    }
  
    const handleDialogClose = () => {
      //dialog close
      setOpenDialog(false)
    }
  
  var [date, setDate] = useState(new Date())

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <input placeholder="search.." style={{width: '60%', height: '30px'}}></input>
          <div>
          <h4 className="mt-3">Bill No</h4>
          <button className="btn btn-primary bg-soft" onClick={handleClickOpen}>+ Add Patient</button>
          <PatientDialog 
              open={openDialog}
              handleClose={handleDialogClose}
            />
          </div>
          
          <p
            className="text-dark fw-bold fs-5"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            Purchase Date & Time&nbsp;
            {date.toLocaleTimeString()}
            {date.toLocaleDateString()}
          </p>
          <div className="card p-3">
            <Row>
              <Col lg="12">
                <Row>
                  <Col lg="2" md="4">
                    <label>Medicine Category</label>
                    <br />
                    <select style={{ width: "90%", height: "25px" }}>
                      <option>Select</option>
                    </select>
                  </Col>
                  <Col lg="2" md="4">
                    <label>Medicine Name</label>
                    <br />
                    <select style={{ width: "90%", height: "25px" }}>
                      <option>Select</option>
                    </select>
                  </Col>
                  <Col lg="2" md="4">
                    <label>Batch No</label>
                    <br />
                    <input
                      placeholder=""
                      style={{ width: "90%", height: "25px" }}
                      type="number"
                    ></input>
                  </Col>
                  <Col lg="2" md="4">
                    <label>Expiry Date</label>
                    <br />
                    <input
                      placeholder=""
                      style={{ width: "90%", height: "25px" }}
                      type="date"
                    ></input>
                  </Col>
                  <Col lg="2" md="4">
                    <label>Sales Price(₹)</label>
                    <br />
                    <input
                      placeholder=""
                      style={{ width: "90%", height: "25px" }}
                      type="number"
                    ></input>
                  </Col>
                  <Col lg="2" md="4">
                    <label>Quantity</label>
                    <br />
                    <input
                      placeholder=""
                      style={{ width: "90%", height: "25px" }}
                      type="number"
                    ></input>
                  </Col>
                  <Col lg="2" md="4">
                  <br />
                    <label>Tax Amount(₹)</label>
                    <br />
                    <input
                      placeholder="%"
                      style={{ width: "90%", height: "25px" }}
                      type="number"
                    ></input>
                  </Col>
                  </Row>
                  <br />
                  
                
                <Row>
                  <Col lg="5">
                  <Row>
                    <Col>
                        <label>Hospital Doctor</label>
                        <br />
                        <select>
                            <option>Select</option>
                        </select>
                    </Col>
                    <Col>
                        <label>Doctor Name</label>
                        <br />
                        <input placeholder=""></input>
                    </Col>
                  </Row>
                  <br />
                    <label>Note</label>
                    <br />
                    <textarea
                      maxLength="infinity"
                      style={{ width: "82%", height: "55px" }}
                    ></textarea>
                    <br />
                    <br />
                  </Col>
                 
                  <Col style={{backgroundColor: 'rgba(0,0,0,0.1)'}} className="p-4" lg='6'>
                  <br />
                    <Row className="ms-2">
                        <Col lg='3'>
                            <label>Total(₹)</label>
                        </Col>
                        <Col lg="7" >
                           <input style={{border: 'none', borderBottom: '1px solid black', width: '100%', textAlign: 'end'}} placeholder="0" type="number"></input>
                        </Col>
                    </Row>
                    <br />
                    <Row className="ms-2">
                        <Col lg='3'>
                            <label>Discount(₹)</label>
                        </Col>
                        <Col lg="7">
                           <input style={{border: 'none', borderBottom: '1px solid black', width: '100%', textAlign: 'end'}} placeholder="0" type="number"></input>
                        </Col>
                    </Row>
                    <br />
                    <Row className="ms-2">
                        <Col lg='3'>
                            <label>Tax(₹)</label>
                        </Col>
                        <Col lg="7">
                           <input style={{border: 'none', borderBottom: '1px solid black', width: '100%', textAlign: 'end'}} placeholder="0" type="number"></input>
                        </Col>
                    </Row>
                    <br />
                    <Row className="ms-2">
                        <Col lg='3'>
                            <label>Net Amount(₹)</label>
                        </Col>
                        <Col lg="7">
                           <input style={{border: 'none', borderBottom: '1px solid black', width: '100%', textAlign: 'end'}} placeholder="0" type="number"></input>
                        </Col>
                    </Row>
                    <br />
                    <Row className="ms-2">
                        <Col>
                            <label>Payment Mode</label>
                            <br />
                            <select>
                                <option>Cash</option>
                                <option>UPI</option>
                                <option>Bank Transfer</option>
                                <option>Cheque</option>
                                <option>Online</option>
                            </select>
                        </Col>
                        <Col>
                            <label>Payment Amount(₹)</label>
                            <br />
                            <input style={{width: '65%'}} type="number"></input>
                        </Col>
                    </Row>
                    <br />
                    <Row className="ms-2">
                    <Col>
                    <label>Payment Note</label>
                        <br />
                        <textarea style={{height: '35px', width: '83%'}}></textarea>
                    </Col>
                        
                    </Row>
                    <div className="mt-4" style={{marginLeft: '64%'}}>
                        <button className="btn btn-primary bg-soft">Calculate</button>
                        <button className="btn btn-primary bg-soft" style={{marginLeft: '10px'}}>Save</button>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row>
                  
                </Row>
              </Col>
            </Row>
            <br />
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(BillGeneration)
