import PropTypes from "prop-types"
import React from "react"
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { AgGridReact } from "ag-grid-react"
import { useMemo } from "react"

//redux

const Hr = props => {
  const rowData = [{ staffid: "101", name: "Abishek" }]

  const columnDefs = [
    { headerName: "Staff ID", field: "staffid" },
    { headerName: "Name", field: "name" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <h4>Staff Directory</h4>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/addstaff">
              <button
                className="btn btn-primary"
                style={{ marginRight: "10px" }}
              >
                Add Staff&nbsp;<i className="fas fa-caret-down"></i>
              </button>
            </Link>
            <Link to="/attendance">
              <button
                className="btn btn-primary"
                style={{ marginRight: "10px" }}
              >
                <i className="fas fa-bars"></i>&nbsp;Staff Attendance
              </button>
            </Link>
            <Link to="/payroll">
              <button
                className="btn btn-primary"
                style={{ marginRight: "10px" }}
              >
                <i className="fas fa-align-justify"></i>&nbsp;Payroll
              </button>
            </Link>
            <Link to="/leaves">
              <button
                className="btn btn-primary"
                style={{ marginRight: "10px" }}
              >
                <i className="fas fa-align-justify"></i>&nbsp;Leaves
              </button>
            </Link>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <div className="row">
                <form>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        className="form-control"
                        style={{ width: "100%", height: "32px" }}
                      >
                        <option>Doctor</option>
                        <option>Patient</option>
                        <option>Nurse</option>
                        <option>Radiologist</option>
                        <option>Pathologist</option>
                        <option>Admin</option>
                        <option>Super Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-10">
                    <button className="btn btn-primary btn-sm mt-3">
                      <i className="fas fa-search"></i>&nbsp; Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <form>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label>Search by Keyword</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Search by Staff ID, Name, Role"
                        style={{ width: "100%", height: "32px" }}
                      ></input>
                    </div>
                  </div>
                  <div className="col-sm-10">
                    <button className="btn btn-primary btn-sm mt-3">
                      <i className="fas fa-search"></i>&nbsp; Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <br />
          <div className="box border0 mt-2">
            <div className="box-header"></div>
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li>
                  <a href="#tab_1" data-toggle="tab" aria-expanded="false">
                    <i className="fas fa-newspaper p-1"></i>
                    Card view
                  </a>
                </li>
                <li className="ms-3">
                  <Link>
                    <i className="fas fa-list p-1"></i>
                    List view
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
        <div className="tab-content">
          <div className="tab-pane table-responsive no-padding" id="tab_1">
            <div className="row row-flex align-content-center">
              <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div className="staffinfo-box">
                  <div className="staff-leftbox"></div>
                </div>
                <div className="staffleft-content">
                  <h5>
                    <span
                      data-toggle="tooltip"
                      title="Name"
                      data-loading-text="<i className='fa fa-circle-o-notch fa-spin'></i> Processing"
                    >
                      Super Admin{" "}
                    </span>
                  </h5>
                  <p>
                    <font
                      data-toggle="tooltip"
                      title="Employee Id"
                      data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing"
                    >
                      9001
                    </font>
                  </p>
                  <p>
                    <font
                      data-toggle="tooltip"
                      title="Contact Number"
                      data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing"
                    >
                      9686576776
                    </font>
                  </p>
                  <p>
                    <font
                      data-toggle="tooltip"
                      title="Location"
                      data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing"
                    ></font>
                    <font
                      data-toggle="tooltip"
                      title="Department"
                      data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Processing"
                    >
                      {" "}
                    </font>
                  </p>
                  <p className="staffsub"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Hr)
