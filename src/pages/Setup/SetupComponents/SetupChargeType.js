import PropTypes from "prop-types";
import React, { useState, useEffect, useMemo } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import api from "services/Api";
import SetupChargeTypeDialog from "../SetupDialog/SetupChargeTypeDialog";
import "./chargetype.css";
import EditButtonRenderer from "common/data/update-button";
import DeleteButtonRenderer from "common/data/delete-button";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const SetupChargeType = (props) => {
  const initialValue = {
    charge_type_id: "",
    is_default: "no",
    is_active: "yes",
    created_at: "2023-06-07 11:11:11",
  };

  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState(initialValue);
  const [checkboxState, setCheckboxState] = useState({
    appointment: true,
    opd: false,
    ipd: false,
  });
  const [selectedData,setSelectedData] = useState({})
  const [chargeData, setChargeData] = useState([]);
  const [data, setData] = useState([]);
  const [appointment, setAppointment] = useState(false);
  const handleEditClick = (data) => {
    console.log(data, "edit");
    setSelectedData(data);
    // setSelectedData()
    setOpen(true);
  };

  const handleDeleteClick = async (data) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    console.log(userConfirmed, "delete");
    if (userConfirmed) {
      const deleteResponse = await api.deleteSetup_ChargeType_master(data.id);
      getChargeType();
    } else {
      console.log("cancelled");
    }
  };

  const columnDefs = [
    { headerName: "Charge Type", field: "charge_type" },
    {
      headerName: "Appointment",
      field: "appointment",
      cellRenderer: "checkboxRendererAppointment",
    },
    { headerName: "OPD", field: "opd", cellRenderer: "checkboxRendererOpd" },
    { headerName: "IPD", field: "ipd", cellRenderer: "checkboxRendererIpd" },
    {
      headerName: "Pathology",
      field: "pathology",
      cellRenderer: "checkboxRendererPatho",
    },
    {
      headerName: "Radiology",
      field: "radiology",
      cellRenderer: "checkboxRendererRadio",
    },
    {
      headerName: "Blood Bank",
      field: "bloodbank",
      cellRenderer: "checkboxRendererBG",
    },
    {
      headerName: "Ambulance",
      field: "ambulance",
      cellRenderer: "checkboxRendererAmbu",
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

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleOpen = () => {
    // if (Object.keys(selectedData).length === 0) {
      setSelectedData({}); 
      setOpen(true);
    // }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  // const chargeTypes = () => {
  //   api.getChargeType().then((res) => setTableData(res.data));
  // };

  const handleFormSubmit = () => {
    api.postSetupChargeType(formData).then((resp) => {
      console.log(resp);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });

    api
      .getChargeType({ headers: { "content-type": "application/json" } })
      .then((resp) => {
        chargeTypes();
        setFormData(initialValue);
      });
  };

  const change = () => {
    console.log("callitttttttng");
  };

  const handleCheckboxChange = async (
    typeid,
    masterid,
    module_shortcode,
    status
  ) => {
    console.log(
      "Checkbox changed!",
      typeid,
      masterid,
      module_shortcode,
      status,
      "newS"
    );
    if (typeid == null) {
      const datas = {
        charge_type_master_id: masterid,
        module_shortcode: module_shortcode,
        Hospital_id: 1,
      };
      const response = await api.postSetup_ChargeType_module(datas);
      getChargeType();
    } else {
      const datas = {
        typeid: typeid,
        charge_type_master_id: masterid,
        module_shortcode: module_shortcode,
        Hospital_id: 1,
      };
      console.log(datas, "sho");
      const response = await api.deleteSetup_ChargeType_modue(typeid);
      getChargeType();

    }
  };

  // const handleCheckboxChange = async (rowIndex,field) => {
  //   console.log("just for fun");
  //   console.log(rowIndex,field,"changing");
  // setCheckboxState((prevCheckboxState) => {
  //   const key = `${rowIndex}_${field}`;
  //   const newState = { ...prevCheckboxState, [key]: !prevCheckboxState[key] };
  //   return newState;
  // });
  // const data ={
  //   // id:
  //   charge_type_master_id:rowIndex,
  //   module_shortcode:field
  // }
  //  const response = await
  // };
  const targetRowIndex = 0;
  useEffect(() => {
    // const initialData = [
    //   { charge_type: "Type1", appointment: "yes", opd: "no", ipd: "yes" },
    //   { charge_type: "Type2", appointment: "no", opd: "yes", ipd: "no" },
    // ];
    // setTableData(initialData);
    getChargeType();
    // getChargemodule()
  }, []);

  const getChargeType = async () => {
    const response = await api.getSetup_chargeType_setup();
    console.log(response, "loging charge type");
    //  setTableData(response.data)
    setTableData(response.data);
    // const initialCheckboxState = {};

    //   console.log(row,"rowss");
    //   initialCheckboxState[row?.charge_type] = {
    //     appointment: row.modules?.appointment === true,
    //       opd: row.modules?.opd === true,
    //       ipd: row.modules?.ipd === true,
    //     // ... other modules
    //   };
    // });
    // setCheckboxState(initialCheckboxState)
  };

  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
      </div>
    ),
    checkboxRendererAppointment: (props) => (
      // {const isChecked = props.data.module_shortcode.includes(props.colDef.field)}
      <input
        type="checkbox"
        checked={
          (console.log(props, "eeee"), props?.data?.modules?.appointment?.value)
        }
        //  onChange={() => handleCheckboxChange()}
        onClick={() =>
          handleCheckboxChange(
            props?.data?.modules?.appointment?.id,
            props?.data?.id,
            "appointment",
            props?.data?.modules?.appointment?.value
          )
        }
      />
    ),
    checkboxRendererOpd: (props) => (
      // {const isChecked = props.data.module_shortcode.includes(props.colDef.field)}
      <input
        type="checkbox"
        name="opdcheckbox"
        checked={props?.data?.modules?.opd?.value}
        // value={props?.data?.modules?.opd}
        onClick={() =>
          handleCheckboxChange(
            props?.data?.modules?.opd?.id,
            props?.data?.id,
            "opd",
            props?.data?.modules?.opd?.value
          )
        }
      />
    ),
    checkboxRendererIpd: (props) => (
      // {const isChecked = props.data.module_shortcode.includes(props.colDef.field)}
      <input
        type="checkbox"
        checked={props?.data?.modules?.ipd?.value}
        onClick={() =>
          handleCheckboxChange(
            props?.data?.modules?.ipd?.id,
            props?.data?.id,
            "ipd",
            props?.data?.modules?.ipd?.vlaue
          )
        }
      />
    ),
    checkboxRendererPatho: (props) => (
      // {const isChecked = props.data.module_shortcode.includes(props.colDef.field)}
      <input
        type="checkbox"
        checked={props?.data?.modules?.pathology?.value}
        onClick={() =>
          handleCheckboxChange(
            props?.data?.modules?.pathology?.id,
            props?.data?.id,
            "pathology",
            props?.data?.modules?.pathology?.vlaue
          )
        }

        // Assuming 'yes' means checked, adjust as needed
        // checked={props.data.module_shortcode.map((val)=> val === props?.colDef.field)}
        // onChange={() => handleCheckboxChange(props.data.id, props.colDef.field)}
      />
    ),
    checkboxRendererRadio: (props) => (
      // {const isChecked = props.data.module_shortcode.includes(props.colDef.field)}
      <input
        type="checkbox"
        checked={props?.data?.modules?.radiology?.value}
        onClick={() =>
          handleCheckboxChange(
            props?.data?.modules?.radiology?.id,
            props?.data?.id,
            "radiology",
            props?.data?.modules?.radiology?.value
          )
        }

        // Assuming 'yes' means checked, adjust as needed
        // checked={console.log(props,"ddd"),props.data.module_shortcode.map((val)=> val === props?.colDef.field)}
        // onChange={() => handleCheckboxChange(props.data.id, props.colDef.field)}
      />
    ),
    checkboxRendererBG: (props) => (
      // {const isChecked = props.data.module_shortcode.includes(props.colDef.field)}
      <input
        type="checkbox"
        checked={props?.data?.modules?.bloodbank?.value}
        onClick={() =>
          handleCheckboxChange(
            props?.data?.modules?.bloodbank?.id,
            props?.data?.id,
            "bloodbank",
            props?.data?.modules?.bloodbank?.value
          )
        }

        // Assuming 'yes' means checked, adjust as needed
        // checked={console.log(props,"ddd"),props.data.module_shortcode.map((val)=> val === props?.colDef.field)}
        // onChange={() => handleCheckboxChange(props.data.id, props.colDef.field)}
      />
    ),
    checkboxRendererAmbu: (props) => (
      // {const isChecked = props.data.module_shortcode.includes(props.colDef.field)}
      <input
        type="checkbox"
        checked={props?.data?.modules?.ambulance?.value}
        onClick={() =>
          handleCheckboxChange(
            props?.data?.modules?.ambulance?.id,
            props?.data?.id,
            "ambulance",
            props?.data?.modules?.ambulance?.value
          )
        }
        // Assuming 'yes' means checked, adjust as needed
        // checked={console.log(props,"ddd"),props.data.module_shortcode.map((val)=> val === props?.colDef.field)}
        // onChange={() => handleCheckboxChange(props.data.id, props.colDef.field)}
      />
    ),
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Charge Type List</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-mod bg-soft" onClick={handleOpen}>
                  <i className="fa fa-plus"></i>&nbsp; Add Charge Type
                </button>
              </div>

              {/* <div style={{ marginTop: "20px" }}> */}
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <SetupChargeTypeDialog
                  getChargeType={getChargeType}
                  selectedData={selectedData}
                  open={open}
                  handleClose={handleClose}
                  onChange={onChange}
                  handleFormSubmit={handleFormSubmit}
                  data={formData}
                  // domLayout='autoHeight'
                />
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

SetupChargeType.propTypes = {
  // Add your prop types here
};

export default withTranslation()(SetupChargeType);
