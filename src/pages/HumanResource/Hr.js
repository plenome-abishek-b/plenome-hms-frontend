import PropTypes from "prop-types";
import React from "react";
import { Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useEffect } from "react";
import api from "services/Api";
import { useState } from "react";
import Card from "common/data/Card";
// import { useHistory } from "react-router-dom/cjs/react-router-dom";
import EditButtonRenderer from "common/data/update-button";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import { FaPencilAlt } from 'react-icons/fa/';
//redux

const Hr = (props) => {
  const rowData = [{ staffid: "101", name: "Abishek" }];
  const [staffs, setStaffs] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchByRole, setSearchByRole] = useState("");
  const [searchBykeyword, setSearchBykeyword] = useState("");
  const [searchRoleResult, setSearchRoleResult] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [cardView, setCardView] = useState(true);
  const [listView, setListView] = useState(false);
  const [listDisabledStaffs, setListDisabledStaffs] = useState(false);
  const [disabledStaff, setDisabledStaffs] = useState([]);
  const history = useHistory();

  const handleEditClick = async (data) => {
    const response = await history.push("/addstaff", { staff: data });
  };
  const columnDefs = [
    { headerName: "staffID", field: "employee_id" },
    { headerName: "Name", field: "name" },
    { headerName: "Role", field: "role_name" },
    { headerName: "Department", field: "department_name" },
    { headerName: "Designation", field: "designation" },
    { headerName: "Mobile Number", field: "contact_no" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: "actionsRenderer",
      cellRendererParams: {
        onEditClick: (row) => handleEditClick(row),
        // onDeleteClick: (row) => handleDeleteClick(row),
      },
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );
  useEffect(() => {
    getAllStaffs();
  }, []);
  const getAllStaffs = async () => {
    const response = await api.getHRmainModuleHr_Staff();
    console.log(response, "all staffs");
    const { data } = response;
    setTableData(data);
    setStaffs(data);
  };
  const getRoles = async () => {
    const response = await api.getRolePermission();
    const { data } = response;
    setRoles(data);
  };
  const handleSearch = async (key) => {
    console.log(searchByRole, "selectedRoleid");
    if (key === "role") {
      const response = await api.getHrMainModuleSearchByRole(searchByRole);
      const { data } = response;
      console.log(data, "consoling data");
      setSearchRoleResult(data);
    } else {
      console.log(searchBykeyword);
      const response = await api.getHrMainModuleSearchByWordpress(
        searchBykeyword
      );
      const { data } = response;
      console.log(data, "consoling data");
      setSearchRoleResult(data);
    }
  };
  const handleDisableSearch = async (key) => {
    if (key === "role") {
      const response = await api.searchDisableStaffByRole(searchByRole);
      const { data } = response;
      console.log(data, "consoling data");
      setSearchRoleResult(data);
    } else {
      console.log(searchBykeyword);
      const response = await api.searchDisableStaffBykeyword(searchBykeyword);
      const { data } = response;
      console.log(data, "consoling data");
      setSearchRoleResult(data);
    }
  };
  const gridOptions = {
    domLayout: "autoHeight", // Set domLayout to autoHeight
    defaultColDef: {
      flex: 1, // Set the default flex property for columns
      sortable: true,
      filter: true,
    },
    onFirstDataRendered: (params) => {
      params.api.autoSizeAllColumns(); // Auto-size all columns on first data render
    },
  };
  const makelistView = () => {
    setListView(true);
    setCardView(false);
    // setListDisabledStaffs(false)
  };
  const makeCardView = () => {
    setCardView(true);
    setListView(false);
    setListDisabledStaffs(false);
  };
  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        {/* <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} /> */}
      </div>
    ),
  };
  const disabledStaffs = async () => {
    setListDisabledStaffs(true);
    setCardView(true);
    setListView(false);
    const response = await api.getDisabled_Staffs_HR_mainModule();
    const { data } = response;
    console.log(data, "disabled");
    setDisabledStaffs(data);
    console.log(listDisabledStaffs, "true");
  };

  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <h4>Staff Directory</h4>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/addstaff">
              <button className="btn-mod" style={{ marginRight: "10px" }}>
              <i className="fas fa-user-plus"></i>&nbsp;
                Add Staff&nbsp;
              </button>
            </Link>
            {/* <Link to="/addstaff"> */}
            <button
              onClick={() => disabledStaffs()}
              className="btn-mod"
              style={{ marginRight: "10px" }}
            >
              <i className="fas fa-ban"></i>
              &nbsp;Disabled staffs&nbsp;
            </button>
            {/* </Link> */}
            {/* <Link to="/attendance">
              <button className="btn-mod" style={{ marginRight: "10px" }}>
                <i className="fas fa-bars"></i>&nbsp;Staff Attendance
              </button>
            </Link>
            <Link to="/payroll">
              <button className="btn-mod" style={{ marginRight: "10px" }}>
                <i className="fas fa-align-justify"></i>&nbsp;Payroll
              </button>
            </Link>
            <Link to="/leaves">
              <button className="btn-mod" style={{ marginRight: "10px" }}>
                <i className="fas fa-align-justify"></i>&nbsp;Leaves
              </button>
            </Link> */}
          </div>
          {listDisabledStaffs ? (
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="row">
                  {/* <form> */}
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        className="form-control"
                        name="searchByRole"
                        style={{ width: "100%", height: "32px", border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px' }}
                        onClick={() => getRoles()}
                        onChange={(e) => setSearchByRole(e.target.value)}
                      >
                        <option>select</option>
                        {roles?.map((role) => (
                          <option value={Number(role?.id)}>{role.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-10">
                    <button
                      className="btn-mod btn-sm mt-3"
                      onClick={() => {
                        handleDisableSearch("role");
                      }}
                    >
                      <i className="fas fa-search"></i>&nbsp; Search
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  {/* <form> */}
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label>Search by Keyword</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Search by Staff ID, Name, Role"
                        style={{ width: "100%", height: "32px", border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px' }}
                        onChange={(e) => setSearchBykeyword(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="col-sm-10">
                    <button
                      className="btn-mod btn-sm mt-3"
                      onClick={() => {
                        handleDisableSearch();
                      }}
                    >
                      <i className="fas fa-search"></i>&nbsp; Search
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="row">
                  {/* <form> */}
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        className="form-control"
                        name="searchByRole"
                        style={{ width: "100%", height: "32px" }}
                        onClick={() => getRoles()}
                        onChange={(e) => setSearchByRole(e.target.value)}
                      >
                        <option>select</option>
                        {roles?.map((role) => (
                          <option value={Number(role?.id)}>{role.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-10">
                    <button
                      className="btn-mod btn-sm mt-3"
                      onClick={() => {
                        handleSearch("role");
                      }}
                    >
                      <i className="fas fa-search"></i>&nbsp; Search
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  {/* <form> */}
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label>Search by Keyword</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Search by Staff ID, Name, Role"
                        style={{ width: "100%", height: "32px", border: '1px solid rgba(0,0,0,0.2)', borderRadius: '3px' }}
                        onChange={(e) => setSearchBykeyword(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="col-sm-10">
                    <button
                      className="btn-mod btn-sm mt-3"
                      onClick={() => {
                        handleSearch();
                      }}
                    >
                      <i className="fas fa-search"></i>&nbsp; Search
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          )}
          <br />
          <div className="box border0 mt-2">
            <div className="box-header">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      onClick={() => makeCardView()}
                      className={cardView ? "nav-link active" : "nav-link"}
                      id="tab_1"
                      data-toggle="tab"
                      href="#tab_content_1"
                    >
                      <i className="fas fa-newspaper p-1"></i>{" "}
                      {listDisabledStaffs ? "Disabled Staffs" : "Card view"}
                    </a>
                  </li>
                  <li className="nav-item ms-3">
                    <a
                      onClick={() => makelistView()}
                      className={listView ? "nav-link active" : "nav-link"}
                      id="tab_2"
                      data-toggle="tab"
                      href="#tab_content_2"
                    >
                      <i className="fas fa-list p-1"></i>
                      {"List view"}
                    </a>
                  </li>
                </ul>
                <Row style={{ marginTop: "10px" }}>
                  {cardView && (
                    <>
                      {searchRoleResult.length > 0
                        ? (console.log("sat1"),
                          searchRoleResult.map((staff) => (
                            <Col md={4} key={staff.staffId}>
                              <Card
                                getAllStaff={getAllStaffs}
                                staff={staff}
                                staffname={staff?.staffname}
                                email={staff.email}
                                qualification={staff?.qualification}
                                number={staff?.contact_no}
                                role={staff?.role_name}
                                location="enable"
                              />
                              {/* <FaPencilAlt className="pencil-icon" /> */}
                            </Col>
                          )))
                        : listDisabledStaffs
                        ? (console.log(listDisabledStaffs, "entering"),
                          disabledStaff.map((staff) => (
                            <Col md={4} key={staff.staffId}>
                              <Card
                                getAllStaff={getAllStaffs}
                                staff={staff}
                                staffname={staff?.staffname}
                                email={staff.email}
                                qualification={staff?.qualification}
                                number={staff?.contact_no}
                                role={staff?.role_name}
                                location="disable"
                              />
                            </Col>
                          )))
                        : (console.log("else"),
                          staffs.map((staff) => (
                            <Col md={4} key={staff.staffId}>
                              <Card
                                getAllStaff={getAllStaffs}
                                staff={staff}
                                staffname={staff?.staffname}
                                email={staff.email}
                                qualification={staff?.qualification}
                                number={staff?.contact_no}
                                role={staff?.role_name}
                                location="enable"
                              />
                            </Col>
                          )))}
                    </>
                  )}
                  {listView && (
                    <div className="ag-theme-alpine">
                      {listDisabledStaffs ? (
                        <AgGridReact
                          rowData={disabledStaff}
                          columnDefs={columnDefs}
                          // defaultColDef={defaultColDef}
                          pagination={true}
                          paginationPageSize={10}
                          domLayout="autoHeight"
                          frameworkComponents={components}
                          gridOptions={gridOptions}
                        />
                      ) : (
                        <AgGridReact
                          rowData={tableData}
                          columnDefs={columnDefs}
                          // defaultColDef={defaultColDef}
                          pagination={true}
                          paginationPageSize={10}
                          domLayout="autoHeight"
                          frameworkComponents={components}
                          gridOptions={gridOptions}
                        />
                      )}
                    </div>
                  )}
                </Row>
              </div>
            </div>
          </div>
        </Container>
        {/* <div className="tab-content">
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
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Hr);
