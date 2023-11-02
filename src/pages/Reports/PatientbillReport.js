import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";

import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import api from "services/Api";
//redux

const Patientbillreport = props => {
    const [tableData,setTableData] = useState(null)

    const columnDefs = [
        {headerName: 'Module', field: 'section'},
        {headerName: 'OPD No', field: 'opdNo'},
        {headerName: 'IPD No', field: 'ipdNo'},
        {headerName: 'Bill No', field: 'billno'},
        {headerName: 'Payment Mode', field: 'mode'},
        {headerName: 'Payment Date', field: 'payment_date'},
        {headerName: 'Payment Amount', field: 'paymentamount'},
    ];
    const defaultColDef = useMemo(
        () => ({
            sortable: true,
            filter: true,
            flex: 1,
        }),
        []
    );

    const getPatientBills = async () => {
        const case_ID = document.getElementById("case_ID").value
        const response = await api.getPatientBillReport(case_ID)
        const { data } = response
        console.log(data, "patient bill report")
        setTableData(data)
      }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Card>
                        <CardBody>
                            <h4>Patient Bill Report</h4>
                            <Row>
                                <Col>
                                    <label>Case ID</label>
                                    <br />
                                    <div>
                                        <input id="case_ID"></input>
                                        <button className="btn btn-primary btn-sm ms-2" onClick={getPatientBills}>Search</button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
                <AgGridReact
                rowData={tableData[0]}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
              </div>
                </Container>
            </div>
        </React.Fragment>
    );
};


export default withTranslation()(Patientbillreport);