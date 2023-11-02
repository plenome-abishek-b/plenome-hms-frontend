import PropTypes from "prop-types"
import React from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

//redux

const StaffAttendance = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Card>
            <CardBody>
              <h4>Staff Attendance</h4>
              <Row>
                <Col lg='6'>
                    <label>Role</label>
                    <br />
                    <select style={{width: '100%', height: '28px'}}>
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
                <Col lg='6'>
                    <label>Attendance Date</label>
                    <br />
                    <input type="date" style={{width: '100%', height: '28px'}}></input>
                </Col>
              </Row>
              <br />
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button className="btn btn-primary"><i className="fas fa-search"></i>&nbsp;Search</button>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(StaffAttendance)
