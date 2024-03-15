import React, { useEffect } from "react";
import {
  Button,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useMemo, useState, useCallback, useRef } from "react";
import AlertDialog from "./Dialog/Dialog";
import api from "services/Api";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DeleteButtonRenderer from "common/data/delete-button";
import Patientdetails from "./Dialog/PatientdetailsDialog";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ToastContainer, toast, Flip, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditButtonRenderer from "common/data/update-button";
import "./nav.css";
//redux

const initialValue = {
  //reset the form to initial value
  patient_name: "",
  gender: "",
  mobileno: "",
  bloodgroup: "",
  Appointmentno: "",
  Appointmentdate: "",
  priority: "",
  source: "",
  live: "",
  fees: "",
  status: "",
};

const Appointment = (props) => {
  const gridRef = useRef();

  const [tableData, setTableData] = useState(null);

  const [formData, setFormData] = useState(initialValue);

  const [open, setOpen] = React.useState(false);

  const [datas, setDatas] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedData, setSelectedData] = useState({});
  const [activeTab, setActiveTab] = useState("current");

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const handleClickOpen = () => {
    //dialog open
    setSelectedData({});
    setOpen(true);
  };

  const handleClose = () => {
    //dialog close
    setOpen(false);
  };

  const onChange = (e) => {
    //catch the parameters when changed.
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const PatientNameLinkRenderer = (props) => {
    const { value, data } = props;

    const handleClick = async () => {
      try {
        const response = await api.getAppointmentbyId(data.id);
        const { data: appointmentData } = response;
        setModalData(appointmentData);
        setModalOpen(true);
      } catch (error) {
        console.error("Error fetching appointment details:", error);
      }
    };

    return (
      <Link to="#" onClick={handleClick}>
        {value}
      </Link>
    );
  };

  const columnDefs = [
    { headerName: "Token No", field: "id", filter: "agSetColumnFilter" },
    {
      headerName: "Patient Name",
      field: "patient_name",
      filter: "agSetColumnFilter",
      cellRenderer: "patientNameLinkRenderer",
      flex: "1",
    },
    {
      headerName: "Appointment No",
      field: "id",
      cellStyle: {
        color: "#000",
        fontWeight: "400",
      },
      resizable: true,
      cellRenderer: (params) => {
        const appno = params.data.id;
        return <p>{"APPN" + appno}</p>;
      },
      flex: "1",
    },
    { headerName: "Appointment Date", field: "date", flex: "2" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Phone", field: "mobileno" },
    { headerName: "Priority", field: "priority_status" },
    { headerName: "Live Consultant", field: "live_consult" },
    { headerName: "Fees", field: "amount" },
    {
      headerName: "Appointment Status",
      field: "appointment_status",
      cellRenderer: (params) => {
        const status = params.value;
        let buttonStyle = {};
  
        switch (status) {
          case "pending":
            buttonStyle = { backgroundColor: "#FF9801", color: "#fff", fontWeight: 'bold' };
            break;
          case "approved":
            buttonStyle = { backgroundColor: "#66AA18", color: "#fff", fontWeight: 'bold'  };
            break;
          case "cancel":
            buttonStyle = { backgroundColor: "#B80000", color: "#fff" , fontWeight: 'bold' };
            break;
          default:
            buttonStyle = { backgroundColor: "yellow", color: "#000000" };
        }
  
        return (
          <button style={{
            backgroundColor: buttonStyle.backgroundColor,
            color: buttonStyle.color,
            fontWeight: buttonStyle.fontWeight,
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          disabled className="btn-sm">
             {status}
          </button>
        );
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: "actionsRenderer",
      cellRendererParams: {
        onEditClick: (row) => handleEditClick(row),
        onDeleteClick: (row) => handleDeleteClick(row),
      },
    },
  ];

  const onBtnExport = useCallback(() => {
    console.log(gridRef.current);
    gridRef.current.api.exportDataAsCsv();
  }, []);

  useEffect(() => {
    getAppointment();
  }, []);

  const getAppointment = async () => {
    try {
      const response = await api.getAppointment();
      const { data } = response;

      const modifiedData = data.map((patient) => {
        const trimmedDate = patient.date.split("T")[0];
        const combinedDateTime = `${trimmedDate} ${patient.time}`;
        const formattedDateTime = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date(combinedDateTime));

        const modifiedName = patient?.patient_name?.replace(/\//g, "");

        return {
          ...patient,
          patient_name: modifiedName,
          date: formattedDateTime,
        };
      });

      setDatas(modifiedData);
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  // Inside your Appointment component
  const filteredData = useMemo(() => {
    if (!datas) return null;

    const currentDate = new Date();

    switch (activeTab) {
      case "current":
        return datas.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          return (
            appointmentDate.getDate() === currentDate.getDate() &&
            appointmentDate.getMonth() === currentDate.getMonth() &&
            appointmentDate.getFullYear() === currentDate.getFullYear()
          );
        });
      case "upcoming":
        return datas.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate > currentDate;
        });
      case "history":
        return datas.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate < currentDate;
        });
      default:
        return datas;
    }
  }, [datas, activeTab]);

  console.log(filteredData, "filterdata");

  // const handleEditClick = (rowData) => {
  //   setSelectedRowData(rowData);
  //   setEditDialogOpen(true);
  // };

  const handleDeleteClick = async (data) => {
    try {
      const toastId = toast.info(
        <div>
          <div className="text-dark">
            Are you sure you want to delete this item?
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-danger btn-md"
              onClick={() => handleDeletionConfirmed(data.id)}
            >
              OK
            </button>
          </div>
        </div>,
        {
          position: toast.POSITION.TOP_CENTER,
          closeButton: false,
        }
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };
  const handleEditClick = (data) => {
    console.log(data, "edit");
    setSelectedData(data);
    // setSelectedData()
    setOpen(true);
  };

  const handleDeletionConfirmed = async (appointmentId) => {
    try {
      const hos_id = 1;
      await api.deleteAppointment(appointmentId, hos_id);
      toast.dismiss();

      toast.success(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Item deleted successfully</div>
          <button
            className="btn btn-danger btn-sm fw-bold"
            onClick={() => toast.dismiss()}
          >
            X
          </button>
        </div>,
        {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: false,
          autoClose: 300,
        }
      );

      setTimeout(() => {
        getAppointment();
      }, 1500);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };
  

  const gridOptions = {
    domLayout: "autoHeight",
    autoSizeStrategy: {
      type: 'fitCellContents'
  },
    defaultColDef: {
      flex: 1,
      sortable: true,
      filter: true,
    },
    onFirstDataRendered: (params) => {
      params.api.autoSizeAllColumns();
    },
  };

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
    params.api.autoSizeColumns();
  };
  

  const defaultSort = [{ colId: "id", sort: "asc" }];

  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
      </div>
    ),
    patientNameLinkRenderer: PatientNameLinkRenderer,
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const onBtnExportPDF = () => {
    const filteredColumnDefs = columnDefs.filter(
      (col) => col.headerName !== "Actions"
    );

    const columns = filteredColumnDefs.map((col) => ({
      header: col.headerName,
      dataKey: col.field,
    }));
    const rows = datas.map((data) =>
      filteredColumnDefs.map((col) => data[col.field])
    );

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    const doc = new jsPDF({ orientation: "landscape" });
    const columnStyles = {};
    filteredColumnDefs.forEach((_, index) => {
      columnStyles[index] = { cellWidth: 30 };
    });

    doc.autoTable({
      head: [columns.map((col) => col.header)],
      body: rows,
      columnStyles,
      margin: { top: 20 },
    });

    const fileName = `AppointmentDetails_${formattedDate}.pdf`;
    doc.save(fileName);
  };

  console.log(datas, "dataaaaaaa");
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ToastContainer transition={Flip} />
          <Breadcrumbs
            title={props.t("Appointment")}
            breadcrumbItem={props.t("Appointment")}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="btn-mod bg-soft custom-btn"
              onClick={handleClickOpen}
              style={{ marginRight: "15px" }}
            >
              + Add Appointment
            </button>
            {/* <Link to="/doctorwise">
              <button
                className="btn-mod bg-soft custom-btn"
                style={{ marginRight: "15px" }}
              >
                <i className="fas fa-align-justify"></i>
                &nbsp;&nbsp;Doctor Wise
              </button>
            </Link>
            <Link to="/patientqueue">
              <button
                className="btn-mod bg-soft custom-btn"
                style={{ marginRight: "15px" }}
              >
                <i className="fas fa-align-center"></i>&nbsp;&nbsp;Queue
              </button>
            </Link> */}

            <button
              className="btn-mod bg-soft custom-btn"
              onClick={() => onBtnExport()}
            >
              <i
                className="far fa-file-excel fa-md"
                style={{ paddingRight: "6px" }}
              ></i>
              Export
            </button>
            <button
              className="btn-mod bg-soft custom-btn ms-3"
              onClick={onBtnExportPDF}
            >
              <i
                className="far fa-file-pdf fa-md"
                // style={{ padding: "6px" }}
              ></i>
              &nbsp; Export as PDF
            </button>
          </div>
        </Container>

        <div
          className="ag-theme-material"
          style={{ height: 1000, marginTop: "20px" }}
        >
          <div className="d-flex justify-content-start" >
          <Nav
            tabs
            style={{
              backgroundColor: "#fff",
              width: "630px",
              borderRadius: "60px 60px 0 0px",
            }}
          >
            <NavItem className="custom-nav">
              <NavLink
                className={activeTab === "current" ? "active" : ""}
                onClick={() => handleTabSelect("current")}
                style={{fontWeight: '600', borderRadius: '12px 0 0 0px'}}
              >
                Current Appointment
              </NavLink>
            </NavItem>
            <NavItem className="custom-nav">
              <NavLink
                className={activeTab === "upcoming" ? "active" : ""}
                onClick={() => handleTabSelect("upcoming")}
                style={{fontWeight: '600'}}
              >
                Upcoming Appointment
              </NavLink>
            </NavItem>
            <NavItem className="custom-nav">
              <NavLink
                className={activeTab === "history" ? "active" : ""}
                onClick={() => handleTabSelect("history")}
                style={{ borderRadius: "0 12px 0 0",fontWeight: '600'}}
              >
                Appointment History
              </NavLink>
            </NavItem>
          </Nav>
          </div>
          

          <TabContent activeTab={activeTab}>
            <TabPane tabId="current"></TabPane>
            <TabPane tabId="upcoming"></TabPane>
            <TabPane tabId="history">
              {/* Add your appointment history content here */}
            </TabPane>
          </TabContent>
          <AgGridReact
            ref={gridRef}
            rowData={filteredData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
            // defaultColDef={defaultColDef}
            defaultSort={defaultSort}
            frameworkComponents={components}
            gridOptions={gridOptions}
            onGridReady={onGridReady}
          />

          <AlertDialog
            open={open}
            handleClose={handleClose}
            selectedData={selectedData}
            data={formData}
            getAppointment={getAppointment}
          />
          <Patientdetails
            open={modalOpen}
            handleClose={handleCloseModal}
            data={modalData}
            getAppointment={getAppointment}
            handleDeleteClick={handleDeleteClick}
            handleDeletionConfirmed={handleDeletionConfirmed}
          />
        </div>
        {/* <h4>Abishek</h4> */}
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Appointment);
