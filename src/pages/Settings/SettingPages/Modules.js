import { toggle } from "../../../controll/controllSlice";
// import { toggle } from 'controll/controllSlice';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, toggleStatus } from "../../../store/module/action.js";
import { Container } from "reactstrap";

// import { setStatus } from 'store/module/action';
const Modules = () => {
  const [module, setModule] = useState({});
  // const value = useSelector((state)=> state?.toggle?.value);
  const dispatch = useDispatch();
  const initialState = () => {
    const savedState = localStorage.getItem("Modules");
    return savedState
      ? JSON.parse(savedState)
      : {
          Dashboard: false,
          Billing: false,
          Appointment: false,
          Opd: false,
          Ipd: false,
          Pharmacy: false,
          Pathology: false,
          Radiology: false,
          Bloodbank: false,
          Ambulance: false,
          Frontoffice: false,
          BirthAndDeathRecord: false,
          HumarResource: false,
          TPA: false,
          Finance: false,
          LiveConsultation: false,
          Message: false,
          Certificate: false,
          Referral: false,
          Reports: false,
          Inventory: false,
          FrontCMS: false,
          Download: false,
          abha: false,
          linkCareContext: false,
          discoverCareDonText: false,
          consentRequest: false,
          setup: false,
        };
  };
  const status = useSelector((state) => {
    console.log("Redux state:", state); 
    console.log("Status slice:", state?.statusReducer?.status); 
    return state?.statusReducer?.status;
  });
  console.log(status, "redux value");
  const handleClick = (key) => {
    setSideBar((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  const [sideBar, setSideBar] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("Modules", JSON.stringify(sideBar));
  }, [sideBar]);

  let value;
  useEffect(() => {
    const values = JSON.parse(localStorage.getItem("Modules"));
    setModule(values);
  }, [sideBar]);
  return (
    <React.Fragment>
      <div className="page-content" style={{position: 'relative', bottom: '35px', right: '10px'}}>
        <Container style={{}}>
        
          <div>
          <h4 style={{marginLeft: '30px'}}>Module Settings</h4>
            <ul className="pt-3">
              {Object.keys(module).map(
                (key) => (
                  console.log(key),
                  (value = module[key]),
                  (
                    <li
                      key={key}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px",
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                    >
                      
                      <h5>{key}</h5>
                      <button
                        className="btn btn-sm fw-bold text-white ps-2"
                        style={{
                          marginRight: "10px",
                          backgroundColor:
                            value === false ? "#C62727" : "#65B741",
                        }}
                        onClick={() => handleClick(key)}
                      >
                        {value === false ? "Disabled" : "Enabled"}
                      </button>
                    </li>
                  )
                )
              )}
            </ul>
          </div>
        </Container>
        {/* Your other fields can be added here */}
      </div>
    </React.Fragment>
  );
};

export default Modules;
