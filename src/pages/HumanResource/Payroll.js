import PropTypes from "prop-types"
import React from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

//redux

const Payroll = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Card>
            <CardBody>
              <h4>Payroll</h4>
              <Row>
                <Col lg="4">
                  <label>Role</label>
                  <br />

                  <select style={{ width: "100%", height: "28px" }}>
                    <option>Doctor</option>
                    <option>Nurse</option>
                    <option>Pharmacist</option>
                    <option>Pathologist</option>
                    <option>Radiologist</option>
                    <option>Admin</option>
                    <option>Super Admin</option>
                    <option>Accountant</option>
                    <option>Receptionist</option>
                  </select>
                </Col>
                <Col lg="4">
                  <label>Month</label>
                  <br />
                  <select style={{ width: "100%", height: "28px" }}>
                    <option>Select</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                </Col>
                <Col lg="4">
                    <label>Year</label>
                    <br />
                    <select style={{ width: "100%", height: "28px" }}>
                        <option>Select</option>
                        <option>2022</option>
                        <option>2023</option>
                    </select>
                </Col>
              </Row>
              <br />
              <div
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="mt-2"
              >
                <button className="btn btn-primary">
                  <i className="fas fa-search"></i>&nbsp;Search
                </button>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Payroll)
