import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import api from "services/Api";

//redux
const AppointmentReport = (props) => {
  const [formData, setformData] = useState({
    timeDuration: "",
    shift: "",
    priority: "",
    source: "",
    toDate: "",
    fromDate: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [toAge, setToAge] = useState("");
  const [finding, setFinding] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [data, setData] = useState([]);
  const [shift, setShift] = useState([]);
  const [appointment_priority, setAppointment_priority] = useState([]);
  const [showDates, setShowDates] = useState(false);

  const columnDefs = [
    { headerName: "Patient Nmae", field: "name" },
    { headerName: "Date", field: "date",flex: '2' },
    { headerName: "Phone", field: "mobileno" },
    // { headerName: "Patient Name", field: "patient_name" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Doctor", field: "doctor" },
    {headerName: "Source", field: "source"},
    {headerName: "Fees", field: "paid_amount"},
    {headerName: "Status", field: "appointment_status"}
  ];
  useEffect(() => {
    getDoctor();
  }, []);

  const getDoctor = async () => {
    const response = await api.getDoctor();
    const { data } = response;
    console.log(data, "datgg");
    setDoctors(data);
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    let updatedFormData = { ...formData };

    if (name === "fromDate" || name === "toDate") {
      updatedFormData = {
        ...updatedFormData,
        fromDate: name === "fromDate" ? value : updatedFormData.fromDate,
        toDate: name === "toDate" ? value : updatedFormData.toDate,
      };
    } else {
      updatedFormData = { ...updatedFormData, [name]: value };
    }

    setformData(updatedFormData);

    if (updatedFormData.timeDuration === "Period") {
      setShowDates(true);
    } else {
      setShowDates(false);
    }
  };

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  //   const [searchText, setSearchText] = useState("")

  //   const [gridApi, setGridApi] = useState(null);
  //   const onGridReady = params => {
  //       setGridApi(params.api);
  //   };

  const handleShifts = async () => {
    const response = await api.getApptShift(formData.doctor);
    const { data } = response;
    console.log(data, "ll");
    setShift(data);
  };
  const AppointmentPriority = async () => {
    const response = await api.getPriorityAppointment_Mainmodule();
    const { data } = response;
    setAppointment_priority(data);
    console.log(data, "fkkk");
  };

  const handleSearch = async () => {
    const response = await api.getAppointmentReport(formData);
    const { data } = response;
    const modifiedData = data.map((patient) => {
      const trimmedDate = patient.date.split("T");
      const combinedDateTime = `${trimmedDate[0]}`;

      console.log(combinedDateTime,'combined date');

      const formattedDateTime = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date(combinedDateTime));

      const modifiedName = patient.name.replace(/\//g, " ");
      return {
        ...patient,
        name: modifiedName,
        date: formattedDateTime,
      };
    });

    console.log(modifiedData, "opdr");
    setData(modifiedData);
};

console.log(formData,'formData');

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Appointment Report</h4>
          <Card>
            <CardBody>
              <Row>
                <Col lg="3" sm="12">
                  <label>Time Duration</label>
                  <br />
                  <select
                    name="timeDuration"
                    onChange={handleChange}
                    value={formData.timeDuration}
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "5px",
                    }}
                  >
                    <option>select</option>
                    <option value="today">Today</option>
                    <option value="ThisWeek">This week</option>
                    <option value="LastWeek">Last week</option>
                    <option value="ThisMonth">This Month</option>
                    <option value="LastMonth">Last Month</option>
                    <option value="Last3Months">Last 3 Months</option>
                    <option value="Last6Months">Last 6 Months</option>
                    <option value="Last9Months">Last 9 Months</option>
                    <option value="Last12Months">Last 12 Months</option>
                    <option value="ThisYear">This Year</option>
                    <option value="LastYear">Last Year</option>
                    <option value="Period">Period</option>
                  </select>
                </Col>
                <Col lg="3" sm="12">
                  <label>Doctor</label>
                  <br />
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "5px",
                    }}
                  >
                    <option>select</option>
                    {doctors.map((val) => (
                      <option key={val.id} value={val.id}>
                        {val.doctor}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col lg="3" sm="12">
                  <label>Shift</label>
                  <br />
                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                    onClick={() => handleShifts()}
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "5px",
                    }}
                  >
                    <option>select</option>
                    {shift.map((val) => (
                      <option key={val.global_shift_id} value={val.global_shift_id}>
                        {val.shift_name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col lg="3" sm="12">
                  <label>Appointment Priority</label>
                  <br />
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    onClick={() => AppointmentPriority()}
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "5px",
                    }}
                  >
                    <option>select</option>
                    {appointment_priority.map((val) => (
                      <option key={val.id} value={val.id}>
                        {val.priority_status}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="3" sm="12">
                  <label>Source</label>
                  <br />
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "5px",
                    }}
                  >
                    <option>select</option>
                    <option key="Online" value="Online">
                      Online
                    </option>
                    <option key="Offline" value="Offline">
                      Offline
                    </option>
                  </select>
                </Col>
                {showDates && (
                  <>
                    <Col lg="3" sm="12">
                      <label>From Date</label>
                      <br />
                      <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "5px",
                        }}
                      />
                    </Col>
                    <Col lg="3" sm="12">
                      <label>To Date</label>
                      <br />
                      <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "5px",
                        }}
                      />
                    </Col>
                  </>
                )}
              </Row>
              <br />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={handleSearch} className="btn-mod">
                  <i className="fas fa-search"></i>&nbsp;Search
                </button>
              </div>

              <br />

              <div className="ag-theme-alpine mt-2" style={{ height: 700 }}>
                <AgGridReact
                  rowData={data}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  paginationPageSize={10}
                  domLayout="autoHeight"
                />
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(AppointmentReport);
