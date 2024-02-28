// PrintableDetails.jsx

import React from "react";
import { Row, Col } from "reactstrap";

function PrintableDetails({ data, handleDeleteClick }) {
  console.log(data, "aaaaaa");

  function removeSlash(inputString) {
    return inputString ? inputString.replace("/", "") : inputString;
  }

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

  return (
    <div
      style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: 'rgba(0,0,0,0.1)' }}
    >
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-danger"
          style={{
            border: "1px solid #FF6868",
            backgroundColor: "#FF6868",
          }}
          onClick={handleDeleteClick}
        >
          {" "}
          <i className="fas fa-trash"></i>
        </button>
      </div>
      <Row className="mb-2">
        <Col>
          <label>
            Patient Name: &nbsp;&nbsp;&nbsp;&nbsp;
            {data ? removeSlash(data[0].patient_name) : "patient"}
          </label>
        </Col>
        <Col>
          <label>
            Appointment No: &nbsp;&nbsp;&nbsp;&nbsp;
            {data ? data[0].appointment_no : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>
            Email: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].Email : "patient"}
          </label>
        </Col>
        <Col>
          <label>
            Status: &nbsp;&nbsp;&nbsp;&nbsp;
            {data ? data[0].appointment_status : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>
            Mobile No: &nbsp;&nbsp;&nbsp;&nbsp;
            {data ? data[0].phone : "patient"}
          </label>
        </Col>
        <Col>
          <label>
            Doctor Name: &nbsp;&nbsp;&nbsp;&nbsp;
            {data ? data[0].doctor : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>
            Appointment Date: &nbsp;&nbsp;&nbsp;&nbsp;
            {data ? formatDateTime(data[0].appointment_date) : "patient"}
          </label>
        </Col>
        <Col>
          <label>
            Appointment Priority: &nbsp;&nbsp;&nbsp;&nbsp;
            {data ? data[0].priority_status : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>
            Gender: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].gender : "patient"}
          </label>
        </Col>
        <Col>
          <label>
            Status: &nbsp;&nbsp;&nbsp;&nbsp;
            {data ? data[0].appointment_status : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>
            Source: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].source : "patient"}
          </label>
        </Col>
        <Col>
          <label>
            Amount: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].amount : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>
            Transaction ID: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].Transaction_id : "patient"}
          </label>
        </Col>
        <Col>
          <label>
            Payment Mode: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].payment_mode : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>
            Department Name: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].department_name : "patient"}
          </label>
        </Col>
        <Col>
          <label>
            Live Consultation: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].live_consult : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>
            Message: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].message : "patient"}
          </label>
        </Col>
        <Col>
        <label>
            Shift: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].shift : "patient"}
          </label>
        </Col>
        </Row>
    </div>
  );
}

export default PrintableDetails;
