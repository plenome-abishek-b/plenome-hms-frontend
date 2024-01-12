import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import api from "services/Api";
import "./styles.css";

const DoctorShift_setupAppointment = (props) => {
  const [rowData, setRowData] = useState([]);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    getSetupDoctorGlobalShift();
    getSetupShift();
  }, []);


// useEffect(() => {
//   try {
//     const storedData =
//       JSON.parse(localStorage.getItem("globalShiftIds")) || {};

//     setRowData((prevData) =>
//       prevData.map((row) => ({
//         ...row,
//         global_shift_id: storedData[row.doctor_name] || row.global_shift_id,
//       }))
//     );
//   } catch (error) {
//     console.error("Error fetching data from localStorage:", error);
//   }
// }, [rowData]); 
  
  
 const mapApiDataToRowData = (apiData) => {
    const rowData = apiData.map((item) => {
      return {
        staff_id: item.staff_id,
        doctor_name: item.doctor_name,
        name: item.doctor_name,
        global_shift_id: item.global_shift_id,
      };
    });

    return rowData;
  };

  const getSetupShift = async () => {
    try {
      const response = await api.getSetupApptShift();
      const { data } = response;
      console.log(data, "shift data");
      setShifts(data);
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  };

  const getSetupDoctorGlobalShift = async () => {
    try {
      const response = await api.getSetupApptGlobalShift();
      const { data } = response;

      if (Array.isArray(data) && data.length > 0) {
        const rowData = mapApiDataToRowData(data);
        setRowData(rowData);

        localStorage.setItem("rowData", JSON.stringify(rowData));
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

          const selectedShift = shifts.find(
            (shift) => shift.name.toLowerCase() === shiftType
          );

          const updatedId = index + 1;

          api.updateSetupApptGlobalShift(updatedId, {
            global_shift_id: selectedShift ? selectedShift.id : null,
          });

          const storedData =
            JSON.parse(localStorage.getItem("globalShiftIds")) || {};
          storedData[doctorName] = selectedShift ? selectedShift.id : null;
          localStorage.setItem("globalShiftIds", JSON.stringify(storedData));

          return {
            ...updatedRow,
            id: updatedId,
            global_shift_id: selectedShift ? selectedShift.id : null,
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
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
                  {rowData.map((doctor) => (
                    <tr key={doctor.doctor_name}>
                      <td>{doctor.doctor_name}</td>
                      {shifts.map((shift) => (
                        <td key={shift.id}>
                          <input
                            value={doctor.global_shift_id === shift.id ? "Yes" : "No"}
                            onChange={(e) =>
                              handleDropdownChange(
                                doctor.doctor_name,
                                e.target.value,
                                shift.name.toLowerCase()
                              )
                            }
                            style={{
                              backgroundColor:
                                doctor.global_shift_id === shift.id ? "#00cc00" : "#ff6666",
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
