import React from "react";
import { Row, Col, Table } from "reactstrap";

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
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
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
      <Row className="mb-2 p-4">
        <table className="table-responsive" style={{border: 'none'}}>
          <tbody>
            <tr>
              <td style={{border: 'none'}}>
                <span className="fw-bold">Patient Name:</span>
              </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? removeSlash(data[0].patient_name) : "patient"}
                </span>
              </td>
              <td style={{border: 'none'}}>
                <span className="fw-bold">Appointment No:</span>
              </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].appointment_no : "patient"}
                </span>
              </td>
            </tr>
            <tr>
            <td style={{border: 'none'}}>
                <span className="fw-bold">Status:</span>
              </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].appointment_status : "patient"}
                </span>
              </td>
              <td style={{border: 'none'}}>
                <span className="fw-bold">Mobile No:</span>
              </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].phone : "patient"}
                </span>
              </td>
            </tr>
            <tr>
            <td style={{border: 'none'}} className="fw-bold">Doctor Name: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].doctor : "patient"}
                </span>
              </td>
              <td style={{border: 'none'}} className="fw-bold">Appointment Date: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? formatDateTime(data[0].appointment_date) : "patient"}
                </span>
              </td>
            </tr>
            <tr>
            <td style={{border: 'none'}} className="fw-bold">Appointment Priority: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].priority_status : "patient"}
                </span>
              </td>
              <td style={{border: 'none'}} className="fw-bold">Gender: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].gender : "patient"}
                </span>
              </td>
            </tr>
            <tr>
            <td style={{border: 'none'}} className="fw-bold">Status: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].appointment_status : "patient"}
                </span>
              </td>
              <td style={{border: 'none'}} className="fw-bold">Source: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].source : "patient"}
                </span>
              </td>
            </tr>
            <tr>
            <td style={{border: 'none'}} className="fw-bold">Amount: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].amount : "patient"}
                </span>
              </td>
              <td style={{border: 'none'}} className="fw-bold">Transaction ID: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].Transaction_id : "patient"}
                </span>
              </td>
            </tr>
            <tr>
            <td style={{border: 'none'}} className="fw-bold">Payment Mode: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].payment_mode : "patient"}
                </span>
              </td>
              <td style={{border: 'none'}} className="fw-bold">Department Name: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].department_name : "patient"}
                </span>
              </td>
            </tr>
            <tr>
            <td style={{border: 'none'}} className="fw-bold">Live Consultation: </td>
              <td style={{border: 'none'}}>
              <span className="cust-span">
                  {data ? data[0].live_consult : "patient"}
                </span>
              </td>
              <td style={{border: 'none'}} className="fw-bold">
                Message:{" "}
                <span className="cust-span">
                  {data ? data[0].message : "patient"}
                </span>
              </td>
            </tr>
            <tr>
            <td style={{border: 'none'}} className="fw-bold">Shift: </td>
              <td style={{border: 'none'}}>
                <span className="cust-span">
                  {data ? data[0].shift : "patient"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </Row>
    </div>
  );
}

export default PrintableDetails;
