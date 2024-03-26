import React from "react";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import './appointmentDetails.css';

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

  const status_check = () => {
    if (data[0].appointment_status === "pending") {
      return <button className="btn btn-success">Pending</button>;
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#F0F3FF",
      }}
      className="p-4"
    >
      {/* border radius : 8px, title - #737791, size - 16px, inner color : #F0F3FF */}
      {/* <div className="d-flex justify-content-end">
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
      </div> */}
      <div className="whole-det">
        <span className=" fs-4 fw-bold" style={{color: '#8F98B3'}}>General Information</span>
        <Card className="no-box-shadow  mt-2">
          <CardBody>
            <Row>
              <Col>
                <span className="cust-span1">Patient Name</span> <br></br>
                <span className="cust-span2">
                  {data ? removeSlash(data[0].patient_name) : "patient"}
                </span>
              </Col>

              <Col>
                <span className="cust-span1">Gender</span> <br />
                <span className="cust-span2">
                  {data ? data[0].gender : "patient"}
                </span>
              </Col>
              <Col>
                <span className="cust-span1">Age</span> <br />
                <span className="cust-span2">
                  {data ? data[0].appointment_no : "patient"}
                </span>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <span className="cust-span1">Phone</span> <br />
                <span className="cust-span2">
                  {data ? data[0].phone : "patient"}
                </span>
              </Col>{" "}
              <Col>
                <span className="cust-span1">Email:</span> <br />
                <span className="cust-span2">
                  {data ? data[0].Email : "patient"}
                </span>
              </Col>{" "}
              <Col>
                <span className="cust-span1">ABHA ID</span> <br />
                <span className="cust-span2">
                  {data ? data[0].appointment_no : "patient"}
                </span>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <span className=" fs-4 fw-bold" style={{color: '#8F98B3'}}>Appointment Details</span>
        <Card className="no-box-shadow mt-2">
          <CardBody>
            <Row>
              <Col>
                <span className="cust-span1">Consulting Doctor</span> <br />
                <span className="cust-span2">
                  {data ? data[0].doctor : "patient"}
                </span>
              </Col>{" "}
              <Col>
                <span className="cust-span1">Consulting Type</span> <br />
                <span className="cust-span2">
                  {data ? data[0].source : "patient"}
                </span>
              </Col>{" "}
              <Col>
                <span className="cust-span1">Appointment No</span> <br />
                <span className="cust-span2">
                  {data ? data[0].appointment_no : "patient"}
                </span>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <span className="cust-span1">Appointment Date</span> <br />
                <span className="cust-span2 text-primary">
                  {data ? formatDateTime(data[0].appointment_date) : "patient"}
                </span>
              </Col>{" "}
              <Col>
                <span className="cust-span1">Shift</span> <br />
                <span className="cust-span2">
                  {data ? data[0].shift : "patient"}
                </span>
              </Col>{" "}
              <Col>
                <span className="cust-span1">Slot Time</span> <br />
                <span className="cust-span2 text-primary">
                  {data ? formatDateTime(data[0].appointment_date) : "patient"}
                </span>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <span className="cust-span1">Token Number</span> <br />
                <span className="cust-span2">
                  {data ? data[0].appointment_date : "patient"}
                </span>
              </Col>{" "}
              <Col>
                <span className="cust-span1">Source</span> <br />
                <span className="cust-span2">
                  {data ? data[0].shift : "patient"}
                </span>
              </Col>{" "}
              <Col>
                <span className="cust-span1">Message</span> <br />
                <span className="cust-span2">
                  {data ? data[0].shift : "patient"}
                </span>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <span className=" fs-4 fw-bold" style={{color: '#8F98B3'}}>Payment Details</span>
        <Card className="no-box-shadow mt-2">
          <CardBody>
            <Row>
              <Col>
                <span className="cust-span1">Amount</span> <br />
                <span className="cust-span2">
                  {data ? data[0].amount : "patient"}
                </span>
              </Col>{" "}
              <Col>
                <span className="cust-span1">Payment Mode</span> <br />
                <span className="cust-span2">
                  {data ? data[0].payment_mode : "patient"}
                </span>
              </Col>{" "}
              <Col>
                <span className="cust-span1">Payment ID</span> <br />
                <span className="cust-span2">
                  {data ? data[0].Transaction_id : "patient"}
                </span>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
      <Row className="mb-2">
        {/* <table className="table-responsive">
          <tbody>
            <tr>
              <td>
                <span className="cust-span2">Patient Name:</span>
              </td>
              <td>
                <span className="cust-span2">
                  {data ? removeSlash(data[0].patient_name) : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="cust-span2">Appointment No:</span>
              </td>
              <td>
                <span className="cust-span2">
                  {data ? data[0].appointment_no : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="cust-span2">Email:</span>
              </td>
              <td>
                <span className="cust-span2">
                  {data ? data[0].Email : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="cust-span2">Status:</span>
              </td>
              <td>
                <span className="cust-span2">
                  {data ? data[0].appointment_status : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="cust-span2">Mobile No:</span>
              </td>
              <td>
                <span className="cust-span2">
                  {data ? data[0].phone : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td>Doctor Name: </td>
              <td>
                <span className="cust-span2">
                  {data ? data[0].doctor : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td>Appointment Date: </td>
              <td>
                <span className="cust-span2">
                  {data ? formatDateTime(data[0].appointment_date) : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td>Appointment Priority: </td>
              <td>
                <span className="cust-span2">
                  {data ? data[0].priority_status : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td>Gender: </td>
              <td>
                <span className="cust-span2">
                  {data ? data[0].gender : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Status:{" "}
                <span className="cust-span2">
                  {data ? data[0].appointment_status : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Source:{" "}
                <span className="cust-span2">
                  {data ? data[0].source : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Amount:{" "}
                <span className="cust-span2">
                  {data ? data[0].amount : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Transaction ID:{" "}
                <span className="cust-span2">
                  {data ? data[0].Transaction_id : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Payment Mode:{" "}
                <span className="cust-span2">
                  {data ? data[0].payment_mode : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Department Name:{" "}
                <span className="cust-span2">
                  {data ? data[0].department_name : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Live Consultation:{" "}
                <span className="cust-span2">
                  {data ? data[0].live_consult : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Message:{" "}
                <span className="cust-span2">
                  {data ? data[0].message : "patient"}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Shift:{" "}
                <span className="cust-span2">
                  {data ? data[0].shift : "patient"}
                </span>
              </td>
            </tr>
          </tbody>
        </table> */}
      </Row>
    </div>
  );
}

export default PrintableDetails;