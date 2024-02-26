import { toggle } from '../../../controll/controllSlice';
// import { toggle } from 'controll/controllSlice'; 
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStatus, toggleStatus } from '../../../store/module/action.js';

// import { setStatus } from 'store/module/action';
const Modules = () => {
  const [module,setModule] = useState({})
    // const value = useSelector((state)=> state?.toggle?.value);
    const dispatch = useDispatch();
    const initialState = () => {
      const savedState = localStorage.getItem("Modules");
      return savedState ? JSON.parse(savedState) : {
          dashboard: false,
          billing: false,
          appointment: false,
          opd: false,
          ipd: false,
          pharmacy: false,
          pathology: false,
          radiology: false,
          bloodbank: false,
          ambulance: false,
          frontoffice: false,
          birthAndDeathRecord: false,
          hr: false,
          tpa: false,
          finance: false,
          liveConsultation: false,
          message: false,
          certificate: false,
          referral: false,
          reports: false,
          inventory: false,
          frontCMS: false,
          download: false,
          abha: false,
          linkCareContext: false,
          discoverCareDonText: false,
          consentRequest: false,
          setup: false
      };
  };
    const status = useSelector(state => {
      console.log('Redux state:', state); // Log the entire Redux state
      console.log('Status slice:', state?.statusReducer?.status
      ); // Log the status slice
      return state?.statusReducer?.status;
    });
    console.log(status,"redux value"); 
    const handleClick = (key) => {
      setSideBar(prevState => ({
          ...prevState,
          [key]: !prevState[key]
      }));
      window.location.reload()
  };
    const [sideBar, setSideBar] = useState(initialState);
 
    useEffect(() => {
      localStorage.setItem("Modules", JSON.stringify(sideBar));
  }, [sideBar]);


    let value;
    useEffect(()=>{
      const values = JSON.parse(localStorage.getItem("Modules"));
      setModule(values)
    },[sideBar])
    return (
      <div style={{ marginTop: '30px' }}>
                          <div>
                <ul>
                    {Object.keys(module).map((key) => (
                      console.log(key),
                     value = module[key],
                        <li key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}>
                            <span>{key}</span>
                            <button className="btn-mod" style={{ marginRight: "10px",backgroundColor:value===false ? 'red':'green' }} onClick={()=>handleClick(key)}>{value===false ? 'Disabled':'Enabled'}</button>
                        </li>
                    ))}
                </ul>
            </div>


            {/* Your other fields can be added here */}
        </div>
  )
}

export default Modules