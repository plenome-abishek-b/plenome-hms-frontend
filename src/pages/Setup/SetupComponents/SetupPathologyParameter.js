import PropTypes from "prop-types";
import React, { useMemo, useState, useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
//redux
import SetupPathologyParameterDialog from "../SetupDialog/SetupPathologyParameterDialog";
import api from "services/Api";
import EditButtonRenderer from "common/data/update-button";
import DeleteButtonRenderer from "common/data/delete-button";

function SetupPathology() {
  const initialPathologySetupParameterValue = {
    parameter_name: "",
    test_value: "pathology",
    reference_range: "",
    gender: "male",
    unit: "1",
    unit_name: "",
    description: "",
    created_at: "2023-02-02 11:11:11",
  };

  const [openParamDiaolog, setOpenParamDialog] = useState(false);
  const [tableData, setTableData] = useState();
  const [formData, setFormData] = useState(initialPathologySetupParameterValue);
  const [selectedData,setSelectedData] = useState({})
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenParamDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetupPathologyParameter(data.id)
         getSetupPathoParameter()
   }else{
    console.log("cancelled");
   }
  
   }
  const onChange = (e) => {
    //catch the parameters when changed.
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
    // setFormData1({ ...formData1, [id]: value })
  };

  // const rowData = [
  //     {parameter_name: 'New Category', ref: 'category', unit: '1',description: 'test parameter'}
  // ]

  const columnDefs = [
    { headerName: "Parameter Name", field: "parameter_name" },
    { headerName: "Reference Range", field: "reference_range" },
    { headerName: "Unit", field: "unit" },
    { headerName: "Description", field: "description" },
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

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const handleOpenParamDialog = () => {
    setSelectedData({})
    setOpenParamDialog(true);
  };

  const handleCloseParamDialog = () => {
    setOpenParamDialog(false);
  };

  useEffect(() => {
    // getUsers from json
    getSetupPathoParameter();
  }, []);

  const getSetupPathoParameter =async () => {
    // api.getPatient().then(res => setTableData(res.data))
   const response = await api.getSetupPathologyParameter()
   const {data} = response
   console.log(data,"loging data");
   setTableData(data)
  };

  function patientId(e) {
    console.log(e.target.value, "nameeeeeeeeeeee");
    const patientId = e.target.value;
    setId(patientId);
  }

  function handleFormSubmit(event) {
    // const payload = {
    //   case_reference_id: "1",
    //   patient_id: id, // Assign the patient ID to the patient_id field
    //   generated_by: "1",
    //   is_ipd_moved: "no",
    //   discharged: "2023-04-25 14:07:22",
    //   created_at: ""
    // };

    api.postPathologySetupParameter(formData).then((resp) => {
      console.log(resp);
      console.log(resp.data, "patient");
    });

    // api.postOpdVisits(formData).then(resp => {
    //   console.log(resp);
    //   console.log(resp.data, 'patient');
    // });

    api
      .getPathologySetupParameter({
        headers: { "content-type": "application/json" },
      })
      .then((resp) => {
        getSetupPathoParameter();
        setFormData(initialPathologySetupParameterValue);
        console.log();
        event.preventDefault();
      });

    handleClose();
  }
  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
      </div>
    ),
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Pathology Parameter List</h4>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-end">
                <button
                  className="btn-mod bg-soft"
                  onClick={handleOpenParamDialog}
                >
                  <i className="fa fa-plus"></i>&nbsp; Add Pathology Parameter
                </button>
              </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 700, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <SetupPathologyParameterDialog
                  open={openParamDiaolog}
                  handleClose={handleCloseParamDialog}
                  data={formData}
                  onChange={onChange}
                  handleFormSubmit={handleFormSubmit}
                  selectedData = {selectedData}
                  getSetupPathoParameter={getSetupPathoParameter}
                />
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withTranslation()(SetupPathology);
