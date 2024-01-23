// PrintableDetails.jsx

import React from "react";
import { Row, Col } from "reactstrap";

function PrintableDetails({ data }) {
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
    <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <Row className="mb-2">
        <Col>
          <label>
            Patient Name: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].patient_name : "patient"}
          </label>
        </Col>
        <Col>
          <label>
            Appointment No: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].appointment_no : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>Mobile No: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].mobileno : "patient"}</label>
        </Col>
        <Col>
          <label>Doctor Name: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].doctor_name : "patient"}</label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>
            Appointment Date: &nbsp;&nbsp;&nbsp;&nbsp;{data ? formatDateTime(data[0].date) : "patient"}
          </label>
        </Col>
        <Col>
          <label>
            Appointment Priority: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].priority_status : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>Gender: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].gender : "patient"}</label>
        </Col>
        <Col>
          <label>
            Status: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].appointment_status : "patient"}
          </label>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label>Source: &nbsp;&nbsp;&nbsp;&nbsp;{data ? data[0].source : "patient"}</label>
        </Col>
      </Row>
    </div>
  );
}

export default PrintableDetails;
