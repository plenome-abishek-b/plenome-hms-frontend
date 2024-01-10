import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import api from "services/Api";
import "./styles.css";

const DoctorShift_setupAppointment = (props) => {
  const [rowData, setRowData] = useState([]);
  const [morningValues, setMorningValues] = useState({});
  const [nightValues, setNightValues] = useState({});
  const [shifts, setShifts] = useState();

  useEffect(() => {
    getSetupDoctorGlobalShift();
    getSetupShift();
  }, []);

  const mapApiDataToRowData = (apiData) => {
    const morningValues = {};
    const nightValues = {};

    const rowData = apiData.map((item) => {
      const selectedMorningValue = item.global_shift_id === 1 ? "Yes" : "No";
      const selectedNightValue = item.global_shift_id === 2 ? "Yes" : "No";

      morningValues[item.doctor_name] = selectedMorningValue;
      nightValues[item.doctor_name] = selectedNightValue;

      return {
        staff_id: item.staff_id,
        doctor_name: item.doctor_name,
        name: item.doctor_name,
        global_shift_id: item.global_shift_id,
      };
    });

    setMorningValues(morningValues);
    setNightValues(nightValues);

    return rowData;
  };

  const getSetupShift = async () => {
    const response =await api.getSetupApptShift();
    const { data } = response
    console.log(data, "shift data");
    setShifts(data);
  };

  const getSetupDoctorGlobalShift = async () => {
    try {
      const response = await api.getSetupApptGlobalShift();
      const { data } = response;
      setRowData(data.staff_id);
      if (Array.isArray(data) && data.length > 0) {
        const morningShift = data.some((item) => item.global_shift_id === 1);
        const nightShift = data.some((item) => item.global_shift_id === 2);

        const rowData = mapApiDataToRowData(data);
        setRowData(rowData);
      }
    } catch (error) {
      console.error("Error fetching global shifts:", error);
    }
  };

  const handleDropdownChange = (doctorName, selectedValue, shiftType) => {
    console.log("Dropdown change:", doctorName, selectedValue, shiftType);
    setRowData((prevData) =>
      prevData.map((row, index) => {
        if (row.name === doctorName) { 
          const updatedRow = {
            ...row,
            [shiftType]: selectedValue === "Yes",
          };

          const updatedGlobalShiftId = shiftType === "morning" ? 1 : 2;

          // Generate a unique id for the row (starting from 1)
          const updatedId = index + 1;

          // Update the global_shift_id in the API
          api.updateSetupApptGlobalShift(updatedId, {
            global_shift_id: updatedGlobalShiftId,
          });

          // Update the local state directly
          return {
            ...updatedRow,
            id: updatedId,
            global_shift_id: updatedGlobalShiftId,
          };
        }
        return row;
      })
    );
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
              <table>
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    {shifts &&
                      shifts.map((shift) => (
                        <th key={shift.id}>{shift.name}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {rowData.map((item) => (
                    <tr key={item.doctor_name}>
                      <td>{item.doctor_name}</td>
                      {shifts.map((shift) => (
                        <td key={shift.id}>
                          <input
                            value={
                              item.global_shift_id === shift.id ? "Yes" : "No"
                            }
                            onChange={(e) =>
                              handleDropdownChange(
                                item.doctor_name,
                                e.target.value,
                                shift.name.toLowerCase() // use shift name as a parameter
                              )
                            }
                            style={{
                              backgroundColor:
                                item.global_shift_id === shift.id
                                  ? "#00cc00"
                                  : "#ff6666",
                              border: "1px solid #7070FF",
                              borderRadius: "5px",
                              color: "white",
                            }}
                            type="checkbox"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                {/* <button className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button> */}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(DoctorShift_setupAppointment);
