import React,{useState,useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import api from "services/Api"
import { useParams } from "react-router-dom/cjs/react-router-dom"

export default function OpdVisitDialog({
  open,
  opdid,
  handleClose,
  data,
  getOverviewVist
  // onChange,
  // handleFormSubmit,
  // handlePatientId
}) {
  const [openVisitDialog, setOpenVisitDialog] = React.useState(false)
  const [listPatient, setListPatient] = useState([])
   const [details,setDetials] = useState({})
  const [consdoctor,setConsdoctor] = useState('')
  const [symptomsType, setSympotoms] = useState([]);
  const [symptomTitle, setSymptomTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [symptID, setSymptID] = useState("");
  const [hospitalCharge, setHospitalCharge] = useState([]);
  const [chargeCategoryId, setChargeCategroyId] = useState("");
  const [charge, setCharge] = useState([]);
  const [amount, setAmount] = useState([]);
  const [tpa, setTpa] = useState([]);
  const params = useParams()
  const pid = params?.pid;
  let today = new Date();

// Get year, month, and day
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
let day = String(today.getDate()).padStart(2, '0');
  const [formData,setFormData] = useState({
    opd_details_id:opdid,
    cons_doctor:"",
    case_type:"",
    appointment_date:"",
    symptoms_type:symptID,
    symptoms:"",
    bp:"",
    height:"",
    weight:"",
    pulse:"",
    temperature:"",
    respiration:"",
    known_allergies:"",
    patient_old:"",
    casualty:"",
    refference:"",
    date:`${year}-${month}-${day}`,
    note:"",
    payment_mode:"",
    generated_by:"",
    live_consult:"",
    can_delete:"",
    payment_date:"",
    time:"",
    standard_chage:"",
charge_id:"",
tpa_charge:"",
tax:"",
apply_charge:"",
amount:"",
    patient_id:pid,
    Hospital_id:1
  })

useEffect(()=>{
  handleConsultant()
  // handleBloodgroups()

},[])
// useEffect(()=>{
//    setFormData({
//     opd_details_id:details?.OPD_ID,
//     cons_doctor:details?.doctor,
//     case_type:details?.case_type,
//     appointment_date:details?.appointment_date,
//     symptoms_type:details?.symptoms_type,
//     symptoms:details?.symptoms,
//     bp:details?.bp,
//     height:details?.height,
//     weight:details?.weight,
//     pulse:details?.pulse,
//     temperature:details?.temperature,
//     respiration:details?.respiration,
//     known_allergies:details?.known_allergies,
//     patient_old:details?.patient_old,
//     casualty:details?.casualty,
//     refference:details?.refference,
//     // date:
//     note:details?.note,
//     // payment_mode:
//     // generated_by:
//     // live_consult:
//     // can_delete:
//     // payment_date:
//     // time:
//     // standard_chage:
//     // charge_id:
//     // tpa_charge:"",
//     // tax:"",
//     // apply_charge:"",
//     // amount:"",
//     // patient_id:"",
//     Hospital_id:1
//    })
// },[details]);

const handleSubmit = async () =>{
  console.log(formData,"submit")
  const response = await api?.post_OPD_VISIT(formData)
  const {data} = response;
  console.log(data,"reponse")
  if(data[0]?.status === 'success'){
    getOverviewVist();
    handleClose();
  }
}

const handleConsultant = async () =>{
  const response = await  api.getConsultant()
  const {data} = response
  setConsdoctor(data)
  console.log(data,"data")
}

  const handleClickOpen = () => {
    //dialog open
    setOpenVisitDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenVisitDialog(false)
  }
const handleChange = (e) =>{
  const {id,value} = e.target
  setFormData({
    ...formData,
     [id]:value
  })
}

  useEffect(() => {
    getAllPatients()
    getVisitByid()
  }, [])
  const getVisitByid = async () =>{
    const opdid = localStorage.getItem('opdid')
    console.log(opdid,"eeda");
   const response = await api.get_OPD_VISIT_list(opdid)
   const {data} = response;
   console.log(data,"complete data")
   setDetials(data[0]);
  }
  const getAllPatients = async () => {
    const response = await api.getPatient();
    const { data } = response;
    console.log(data,"kkkkkkkkkkkkkkkkkkk");
    setListPatient(data);
  }
  const getSymptomeType = async () => {
    const response = await api.getSetupSymptoms_Type();
    const { data } = response;
    console.log(data, "symptems");
    setSympotoms(data);
  };
  useEffect(() => {
    getSymptomTitle();
    setFormData({
      ...formData,symptoms_type:symptID
    })
  }, [symptID]);
  const getSymptomTitle = async () => {
    console.log(symptID, ":::");
    const response = await api?.getOpd_symptomsTitle(symptID);
    const { data } = response;
    console.log(data, "titlesss");
    setSymptomTitle(data);
  };
  const getDescription = async () => {
    const id = formData?.symptoms;
    console.log(id, "iddddddd");
    if (id) {
      const response = await api.getSymptomeDescriptionByTitleIdOPD(id);
      const { data } = response;
      console.log(data, "data");
      setDescription(data);
    } else {
      console.log("nothing");
    }
  };
  const getChargeCategory = async () => {
    const response = await api.getChargeCategory();
    const { data } = response;
    console.log(data, "i.i.i.i.i.i");
    setHospitalCharge(data);
  };
  const getCharge = async () => {
    console.log(chargeCategoryId, "id");
    const response = await api.getCharge_OPD(chargeCategoryId);
    const { data } = response;
    console.log(data, "==");
    setCharge(data);
  };

  const handlegetAmount = async () => {
    // const response = await api.
    console.log(formData?.charge_id, "first");
    const response = await api.getAmountWithCharge(formData?.charge_id);
    const { data } = response;
    console.log(data, "amount and stuffs");
    setFormData({
      ...formData,
      amount:Number(data[0]?.amount),
      apply_charge: Number(data[0]?.apply_charge),
      standard_charge: Number(data[0]?.standard_charge),
      tax:amount[0]?.tax
    });
    setAmount(data);
  };
  useEffect(() => {
    handlegetAmount();
  }, [formData?.charge_id]);
  const getTpa = async () => {
    const response = await api.getTPA_OPD();
    const { data } = response;
    console.log(data, "kkkkk");
    
    setTpa(data);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" className="text-white fw-bold" 
                style={{backgroundColor: '#92A4FF', height: '60px'}}>
        <h4>Patient Details</h4>

        {/* <Container style={{paddingTop: '35px', position:'relative', right: '5px' }}> */}
        {/* <select
              style={{width: '23%', height: '30px' , borderRadius: '5px', border: "1px solid grey"}}
              name="patient_id"
              value={data.patient_id}
              onChange={handlePatientId}
              >
              {listPatient &&
                listPatient.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                  {patient.patient_name}
                  </option>
                  ))}
                </select> */}
                
        {/* </Container> */}
        </DialogTitle>
        <DialogContent className="mt-4 ms-2" style={{paddingTop: '15px'}}>
          <Row>
            {/* <div> */}
            <h4 style={{color:'black',display:'flex'}}>{details?.patient_name}</h4>
<div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
    <div style={{color:'black', marginBottom: '8px'}}>gender : {details?.gender}</div>
    <div style={{color:'black', marginBottom: '8px'}}>email : {details?.email}</div>
    <div style={{color:'black', marginBottom: '8px'}}>bloodgroup : {details?.blood_group ? details?.blood_group : 'null'}</div>
    <div style={{color:'black', marginBottom: '8px'}}>mobileno : {details?.mobileno ? details?.mobileno : 'null'}</div>
    <div style={{color:'black', marginBottom: '8px'}}>Any known allergies : {details?.known_allergies ? details?.known_allergies : 'null'}</div>
</div>


            <Col lg="8">
              <Row>
                <Col lg='6'>
                  <label >Height</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    id="height"
                    value={formData?.height}
                    onChange={handleChange}
                    style={{height: '30px', borderRadius: '5px', border: "1px solid grey" , width: '100%'}}
                  ></input>
                </Col>
                <Col lg='6'>
                  <label>Weight</label>
                  <br />
                  <input
                    type="number"
                    id="weight"
                    value={formData?.weight}
                    onChange={handleChange}
                    placeholder=""
                    style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%' }}
                  ></input>
                </Col>
                <Col lg='6'>
                  <label style={{paddingTop: '10px'}}>BP</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    id="bp"
                    value={formData?.bp}
                    onChange={handleChange}
                    style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%'  }}
                  ></input>
                </Col>
                <Col lg='6'>
                  <label style={{paddingTop: '10px'}}>Pulse</label>
                  <br />
                  <input
                    type="number"
                    id="pulse"
                    value={formData?.pulse}
                    onChange={handleChange}
                    placeholder=""
                    style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%'  }}
                  ></input>
                </Col>
                <Col lg='6'>
                  <label style={{paddingTop: '10px'}}>Temperature</label>
                  <br />
                  <input
                    type="number"
                    placeholder=""
                    id="temperature"
                    value={formData?.temperature}
                    onChange={handleChange}
                    style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%'  }}
                  ></input>
                </Col>
                <Col lg='6'>
                  <label style={{paddingTop: '10px'}}>Respiration</label>
                  <br />
                  <input
                    type="number"
                    value={formData?.respiration}
                    id="respiration"
                    onChange={handleChange}
                    placeholder=""
                    style={{height: '30px' , borderRadius: '5px', border: "1px solid grey" , width: '100%' }}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
              <Col>
                  <Row>
                    <Col lg="4" md="4" sm="12">
                      <label>Symptoms Type</label>
                      <br />
                      {/* <input
                        // id="symptoms"
                        type="text"
                        placeholder=""
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                        // value={formData?.symptoms}
                        onChange={handleChange}
                      ></input> */}
                      <select
                        style={{ width: "150px" }}
                        name="symptoms_type"
                        onClick={() => getSymptomeType()}
                        onChange={(e) => setSymptID(e.target.value)}
                      >
                        <option>select</option>
                        {symptomsType.map((symptoms) => (
                          <option key={symptoms?.id} value={symptoms?.id}>
                            {symptoms?.symptoms_type}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col lg="4" md="4" sm="12">
                      <label>Symptoms Title</label>
                      <br />
                      {/* <input
                        type="text"
                        placeholder=""
                        id="symptoms"
                        value={formData?.symptoms}
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      ></input> */}
                      <select
                        style={{ width: "150px" }}
                        onClick={() => getDescription()}
                        id="symptoms"
                        onChange={handleChange}
                      >
                        <option>select</option>
                        {symptomTitle &&
                          symptomTitle.map((symptoms) => (
                            <option key={symptoms?.id} value={symptoms?.id}>
                              {symptoms?.symptoms_title}
                            </option>
                          ))}
                      </select>
                    </Col>
                    <Col lg="4" md="4" sm="12">
                      <label>Symptoms Description</label>
                      <br />
                      <input
                        type="text"
                        placeholder=""
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                        onChange={handleChange}
                        value={description && description[0]?.description}
                      ></input>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="6" md="6" sm="2">
                  <label>Note</label>
                  <br />
                  <textarea
                    maxLength="infinity"
                    onChange={handleChange}
                    id="note"
                    value={formData?.note}
                    style={{ width: "100%" , borderRadius: '5px', border: "1px solid grey"}}
                  ></textarea>
                </Col>
                <Col lg="6" md="6" sm="2">
                  <label>Any Known Allergies</label>
                  <br />
                  <textarea
                    maxLength="infinity"
                    id="known_allergies"
                    value={formData?.known_allergies}
                    onChange={handleChange}
                    style={{ width: "100%" , borderRadius: '5px', border: "1px solid grey" }}
                  ></textarea>
                </Col>
              </Row>
            </Col>
            <Col lg="4">
            <div
                className="card p-4"
                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              >
                <Row>
                  <Col lg="12">
                    <label>
                      Appointment Date <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      type="date"
                      id="appointment_date"
                      style={{
                        width: "100%",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      value={formData?.appointment_date}
                      onChange={handleChange}
                    ></input>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12">
                    <label>
                      Payment Date <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      type="date"
                      id="payment_date"
                      style={{
                        width: "100%",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      value={formData?.payment_date}
                      onChange={handleChange}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Case</label>
                    <br />
                    <input
                      id="case_type"
                      onChange={handleChange}
                      value={formData?.case_type}
                      placeholder=""
                      style={{
                        width: "100%",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Casualty</label>
                    <br />
                    <select
                      id="casualty"
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      value={formData?.casualty}
                      onChange={handleChange}
                    >
                      <option>select</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </Col>
                  <Col>
                    <label>Old Patient</label>
                    <br />
                    <select
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      id="patient_old"
                      value={formData?.patient_old}
                      onChange={handleChange}
                    >
                      <option>select</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>TPA</label>
                    <br />
                    <select
                      id="tpa_charge"
                      value={formData?.tpa_charge}
                      onClick={() => getTpa()}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    >
                      <option>select</option>
                      {tpa.map((tpa) => (
                        <option value={tpa?.id}>{tpa?.name}</option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <label>Reference</label>
                    <br />
                    <input
                      placeholder=""
                      id="refference"
                      value={formData?.refference}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>
                      Consultant Doctor <span className="text-danger">*</span>
                    </label>
                    <br />
                    <select
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                      id="cons_doctor"
                      onChange={handleChange}
                      value={formData?.cons_doctor}
                    >
                      <option>select one</option>
                      {consdoctor &&
                        consdoctor.map((doctor) => (
                          <option key={doctor.id} value={doctor?.id}>
                            {doctor.doctor}
                          </option>
                        ))}
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Charge Category</label>
                    <br />
                    <select
                      onClick={() => getChargeCategory()}
                      onChange={(e) => setChargeCategroyId(e?.target?.value)}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    >
                      <option>Select</option>
                      {hospitalCharge.map((val) => (
                        <option value={val?.id} key={val?.id}>
                          {val?.charge_type}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <label>
                      Charge <span className="text-danger">*</span>
                    </label>
                    <br />
                    <select
                      id="charge_id"
                      onChange={handleChange}
                      onClick={() => getCharge()}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    >
                      <option>Select</option>
                      {charge &&
                        charge.map((val) => (
                          <option
                            onClick={() => handlegetAmount()}
                            value={val?.id}
                            key={val?.id}
                          >
                            {val?.name}
                          </option>
                        ))}
                    </select>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Tax</label>
                    <br />
                    <input
                      placeholder="%"
                      id="tax"
                      value={amount[0]?.tax}
                      readOnly
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                  <Col>
                    <label>Standard Charge(₹)</label>
                    <br />
                    <input
                      id="standard_charge"
                      value={amount[0]?.standard_charge}
                      placeholder=""
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>
                      Applied Charge(₹) <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      id="apply_charge"
                      value={amount[0]?.apply_charge}
                      placeholder=""
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                  <Col>
                    <label>
                      Amount(₹) <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      id="amount"
                      value={amount[0]?.amount}
                      placeholder=""
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Payment Mode</label>
                    <br />
                    <select
                      id="payment_mode"
                      onChange={handleChange}
                      value={formData?.payment_mode}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    >
                      <option>select</option>
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="cheque">Cheque</option>
                      <option value="bank transfer">Bank Transfer</option>
                      <option value="online">Online</option>
                    </select>
                  </Col>
                  <Col>
                    <label>
                      Paid Amount(₹) <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      id="amount"
                      value={amount[0]?.amount}
                      placeholder=""
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Live Consultation</label>
                    <br />
                    <select
                      id="live_consult"
                      onChange={handleChange}
                      value={formData?.live_consult}
                      style={{
                        width: "100%",
                        height: "30px",
                        borderRadius: "3px",
                        border: "1px solid rgba(0,0,0,0.2)",
                      }}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
