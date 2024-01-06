import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import api from "services/Api";

const SetupDoctorShift = (props) => {
  const [rowData, setRowData] = useState([]);
  const [shift, setShift] = useState({});
  const [openBbDialog, setOpenBbDialog] = useState(false);
  const [staffId,setStaffId] = useState();

  useEffect(() => {
    getSetupDoctorGlobalShift();
  }, []);

  const mapApiDataToRowData = (apiData) => {
    return apiData.map((item) => ({
      doctor_name: item.doctor_name,
      name: item.doctor_name,
      staff_id: item.staff_id, 
      morning: item.global_shift_id === 1 ? 'Yes' : 'No',
      night: item.global_shift_id === 2 ? 'Yes' : 'No',
    }));
  };

  const columnDefs = [
    { headerName: "Doctor Name", field: "name" },
    {
      headerName: "Morning",
      field: "morning",
      editable: true,
      cellEditor: "agCheckboxEditor",
    },
    {
      headerName: "Night",
      field: "night",
      editable: true,
      cellEditor: "agCheckboxEditor",
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

  const getSetupDoctorGlobalShift = async () => {
    try {
      const response = await api.getSetupApptGlobalShift();
      const { data } = response;
      console.log(data, "data console");

      if (Array.isArray(data) && data.length > 0) {
        const morningShift = data.some((item) => item.global_shift_id === 1);
        const nightShift = data.some((item) => item.global_shift_id === 2);

        setShift({
          morning: morningShift,
          night: nightShift,
        });

        const rowData = mapApiDataToRowData(data);
        setRowData(rowData);

        // Assuming that the staff_id is the same for all items, you can store it in the state
        if (data[0] && data[0].staff_id) {
          setStaffId(data[0].staff_id);
        }
      }
    } catch (error) {
      console.error("Error fetching global shifts:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = rowData.map((item) => ({
        staff_id: item.staff_id,
        doctor_name: item.name,
        global_shift_id: item.morning ? 1 : item.night ? 2 : 0,
      }));
  
      console.log(updatedData, 'updated data');
  
      // Add this log to check the updatedData before sending it to the API
  
      const payload = {
        staff_id: staffId,
        updated_data: updatedData,
      };
  
      const response = await api.updateSetupApptGlobalShift(payload);
      const { data } = response;
      console.log(data, "data");
    } catch (error) {
      console.error("Error updating global shifts:", error);
    }
  };
  
  
  
  const handleCellValueChanged = (params) => {
    const { data } = params;
    setRowData((prevData) =>
      prevData.map((item) =>
        item === data
          ? {
              ...item,
              morning: item.morning && item.global_shift_id !== 1,
              night: item.night && item.global_shift_id !== 2,
              [params.colDef.field]: params.newValue,
            }
          : item
      )
    );
  };
  
  const handleOpenBb = () => {
    setOpenBbDialog(true);
  };

  const handleCloseBb = () => {
    setOpenBbDialog(false);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Doctor shift</h4>
          <Card>
            <CardBody>
              <div
                style={{ display: "flex", justifyContent: "flex-end" }}
              ></div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                   onCellValueChanged={handleCellValueChanged}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <button className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(SetupDoctorShift);
