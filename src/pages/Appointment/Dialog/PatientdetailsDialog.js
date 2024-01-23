import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { Input, Select } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";
// import { Formik } from "formik"
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "../printstyles.css";
import PrintableDetails from "./PrintableDetails";

export default function Patientdetails({ open, handleClose, data }) {
  // Inside your component
  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  console.log(data, "dataaaa");

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDateTime = new Date(dateTimeString).toLocaleString(
      "en-US",
      options
    );
    return formattedDateTime;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <form>
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
          Appointment Details
            <div>
              <button
                className="btn-sm "
                style={{
                  backgroundColor: "#7070FF",
                  border: "1px solid white",
                }}
                onClick={handlePrint}
              >
                {" "}
                <i className="fas fa-print text-white"></i>
              </button>
              <button
                className="btn-sm text-white fw-bold ms-2"
                style={{
                  backgroundColor: "#D04848",
                  border: "1px solid white",
                }}
                onClick={handleClose}
              >
                {" "}
                X
              </button>
            </div>
          </DialogTitle>

          <DialogContent className="mt-4 ms-2" id="alert-dialog-content">
            {/* <Row>
              <Col>
                <label>
                  Patient Name : {data ? data[0].patient_name : "patient"}
                </label>
              </Col>
              <Col>
                <label>
                  Appointment No : {data ? data[0].appointment_no : "patient"}
                </label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <label>Mobile No : {data ? data[0].mobileno : "patient"}</label>
              </Col>
              <Col>
                <label>
                  Doctor Name: {data ? data[0].doctor_name : "patient"}
                </label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <label>
                  Appointment Date :{" "}
                  {data ? formatDateTime(data[0].date) : "patient"}
                </label>
              </Col>
              <Col>
                <label>
                  Appointment Priority:{" "}
                  {data ? data[0].priority_status : "patient"}
                </label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <label>Gender : {data ? data[0].gender : "patient"}</label>
              </Col>
              <Col>
                <label>
                  Status : {data ? data[0].appointment_status : "patient"}
                </label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <label>Source : {data ? data[0].source : "patient"}</label>
              </Col>
            </Row> */}
            <PrintableDetails data={data} />
          </DialogContent>

          <DialogActions
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <button
              onClick={() => handleSubmit(handleClose())}
              // onClick={handleClose}
              className="btn-mod bg-soft fw-bold"
              type="submit"
            >
              Save
            </button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
