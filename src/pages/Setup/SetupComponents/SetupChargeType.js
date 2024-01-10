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
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

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
  const [checkboxState, setCheckboxState] = useState({});
  const [chargeData,setChargeData] = useState([]);
  const [data,setData] = useState([])
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenFindingCategoryDialog(true)
   }

   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetup_Finding_Category(data.id)
         getFindingCategory()
   }else{
    console.log("cancelled");
   }
   }
   
  const columnDefs = [
    { headerName: "Charge Type", field: "charge_type" },
    { headerName: "Appointment",  field: "appointment",
    cellRenderer: 'checkboxRenderer', },
    { headerName: "OPD", field: "opd" ,cellRenderer: 'checkboxRenderer'},
    { headerName: "IPD", field: "ipd",cellRenderer: 'checkboxRenderer' },
    { headerName: "Pathology", field: "pathology",cellRenderer: 'checkboxRenderer' },
    { headerName: "Radiology", field: "radiology" ,cellRenderer: 'checkboxRenderer'},
    { headerName: "Blood Bank", field: "bloodbank",cellRenderer: 'checkboxRenderer'},
    { headerName: "Ambulance", field: "ambulance",cellRenderer: 'checkboxRenderer'},
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'actionsRenderer',
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
    setOpen(true);
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
  )


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

    api.getChargeType({ headers: { "content-type": "application/json" } }).then((resp) => {
      chargeTypes();
      setFormData(initialValue);
    });
  };

  const handleCheckboxChange = (rowIndex, field) => {
    console.log(rowIndex,field,"changing");
 
    setCheckboxState((prevCheckboxState) => {
      const key = `${rowIndex}_${field}`;
      const newState = { ...prevCheckboxState, [key]: !prevCheckboxState[key] };
      return newState;
    });
  };
  const targetRowIndex = 0; 
  useEffect(() => {
    // const initialData = [
    //   { charge_type: "Type1", appointment: "yes", opd: "no", ipd: "yes" },
    //   { charge_type: "Type2", appointment: "no", opd: "yes", ipd: "no" },
    // ];
    // setTableData(initialData);
    getChargeType()
    getChargemodule()
  }, []);

  const getChargeType = async () =>{
   const response = await api.getSetup_chargeType_setup()
   console.log(response.data,"loging charge type");
   setTableData(response.data)
  }
  const getChargemodule = async () =>{
    const response = await api.getSetup_ChargeType_module()
    console.log(response.data,"ee");
    setChargeData(response.data)
    const groupedArray = response.data.reduce((accumulator, currentObject) => {
      const existingGroup = accumulator.find(
        group => group.charge_type_master_id === currentObject.charge_type_master_id
      );
    
      if (existingGroup) {
        existingGroup.module_shortcode.push(currentObject.module_shortcode);
      } else {
        accumulator.push({
          charge_type_master_id: currentObject.charge_type_master_id,
          module_shortcode: [currentObject.module_shortcode]
        });
      }
    
      return accumulator;
    }, []);
    console.log(groupedArray,"fillterarrayz");
    setData(groupedArray)
    console.log(modules,"fillterarray");
}

  // const isModuleShortcodePresent = (field) => {
  //   return chargeData && chargeData.some(data => data.module_shortcode === field);
  // };
// let datas;
const components = {  
  actionsRenderer: (props) => (
    <div>
      <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
      &nbsp;
      <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
    </div>
  ),
  checkboxRenderer: (props) => (
    <input
      type="checkbox"
      checked={props.value === 'yes'} // Assuming 'yes' means checked, adjust as needed
      onChange={() => handleCheckboxChange(props.rowIndex, props.colDef.field)}
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
