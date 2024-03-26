import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { Input, Select } from "@material-ui/core";
import { Row, Col, Container } from "reactstrap";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";
// import { Formik } from "formik"
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "./printstyles.css";
// import PrintableDetails from "./PrintableDetails";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
function Filter({ open, handleClose, data }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "1200px", // Set your width here
          },
        },
      }}
      // style={{ zIndex: 9999, backgroundColor: "white" }}
    >
      <DialogTitle
        id="alert-dialog-title"
        className="text-white fw-bold"
        style={{
          backgroundColor: "#6070FF",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Filter
        <div className=" ">
          <button
            className="btn-sm text-white fw-bold ms-2"
            style={{
              backgroundColor: "#D04848",
              border: "1px solid #D04848",
            }}
            onClick={handleClose}
          >
            {" "}
            X
          </button>
        </div>
      </DialogTitle>
      <DialogContent id="alert-dialog-content" className="mt-3 ms-2 p-3">
        <div>
          <form>
            <Container className="filter-dialog-text">
              <Row className="mb-3">
                <Col lg="4" md="4" sm="12">
                  {" "}
                  <label>From date</label> <br />
                  <input
                    type="date"
                    name=""
                    value=""
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #8F98B3",
                    }}
                  />
                </Col>{" "}
                <Col lg="4" md="4" sm="12">
                  {" "}
                  <label>To date</label> <br />
                  <input
                    type="date"
                    name=""
                    value=""
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #8F98B3",
                    }}
                  />
                </Col>{" "}
                <Col lg="4" md="4" sm="12">
                  {" "}
                  <label>Doctor</label> <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #8F98B3",
                    }}
                  >
                    <option value=""> </option>
                    <option value="value1">doctor 1</option>
                    <option value="value2">doctor 2</option>
                    <option value="value3">doctor 3</option>
                  </select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg="4" md="4" sm="12">
                  <label for="">Consultation type</label> <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #8F98B3",
                    }}
                  >
                    <option value=""> </option>
                    <option value="value1">online</option>
                    <option value="value2">offline </option>
                  </select>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label for="">Shift wise</label> <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #8F98B3",
                    }}
                  >
                    <option value=""> </option>
                    <option value="value1">morning</option>
                    <option value="value2">night </option>
                  </select>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label for="">Slot wise</label> <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #8F98B3",
                    }}
                  >
                    <option value=""> </option>
                    <option value="value1">slot 1</option>
                    <option value="value2">slot 2 </option>
                  </select>
                </Col>
              </Row>
              <Row>
                <Col lg="4" md="4" sm="12" className="mb-3">
                  <label for="">Status</label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #8F98B3",
                    }}
                  >
                    <option value=""> </option>
                    <option value="value1">pending</option>
                    <option value="value2">completed </option>
                  </select>
                </Col>
                <Col lg="4" md="4" sm="12">
                  <label for="">Gender</label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #8F98B3",
                    }}
                  >
                    <option value=""> </option>
                    <option value="value1">male</option>
                    <option value="value2">female </option>
                    <option value="value3">transgender</option>
                  </select>
                </Col>
              </Row>
            </Container>
          </form>
        </div>
      </DialogContent>
      <DialogActions
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: "20px",
          position: "absolute",
          top: "80%",
          right: "0px",
          borderRadius: "8px",
        }}
      >
        <Button
          onClick={handleClose}
          className="text-white  bg-primary"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500",paddingInline:'40px' }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Filter;

