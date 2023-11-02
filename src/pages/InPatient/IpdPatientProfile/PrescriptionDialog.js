import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useEffect } from "react"
import api from "services/Api"
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export default function PrescriptionDialog({
  open,
  handleClose,
  // data,
  onChange,
  handleFormSubmit,
}) {
  const [openCrDialog, setOpenCrDialog] = React.useState(false)
  const [medicineCategory,setMedicineCategory] = useState()
  const [medicineName,setMedicineName] = useState([])
  const [medicineDosage,setMedicineDosage] = useState([])
  const [dosageIntervel,setDosageIntervel] = useState([])
  const [dosageDuration,setDosageDuration] = useState([])
  const [findingCategory,setFindingCategory] = useState([])
  const [findings,setFindings] = useState([])
  const [radiology,setRadiology] = useState([])
  const [pathology,setPathology] = useState([])
  const [doctor,setDoctor] = useState([])
  const [basicData,setBasicData] = useState([])
  const {ipdno} = useParams()
  const [formData,setFormData] = useState({
    medine_category:'',
    pharmacy_id:'',
    dosage:'',
    dose_interval_id:'',
    dose_duration_id:'',
    finding_Category:'',
    findings:'',
    date:'',
    header_note:'',
    finding_description:'',
    ipd_id:ipdno,
    instruction:'',
    radiology_id:'',
    pathology_id:'',
    footer_note:'',
    created_at:'2017-12-02 11:11:11',
    generated_by:1,
    basic_id:null,
    ipd_prescription_basic_id:null
  })
  useEffect(()=>{
  fetchMedicineCategory()
  fetchFindingCategory()
  getRadiology()
  getPathology()
  getDoctor()
  },[])
  const getDoctor = async () =>{
    const response = await api.getDoctor()
    const {data} = response
    setDoctor(data)
  }
  const getRadiology = async () =>{
    const response = await api.getRadiologys()
    const {data} = response
    setRadiology(data)
    console.log(data,"radiology ddaattaa")
  }
  const getPathology = async () =>{
    const response = await api.getPathologys()
    const {data} = response
    setPathology(data)
    console.log(data,"pathologys")
  }
  const fetchFindingCategory = async () =>{
    const response = await api.getFindingCategory()
    const {data} = response
    setFindingCategory(data)
    console.log(data,"finding category")
  }
  const fetchMedicineCategory = async () =>{
    const response = await api.getMedicationCategroy()
    const {data} =response
    setMedicineCategory(data)
  }
  const handleChange = (event) =>{
    const {name,value} = event.target
    setFormData({
      ...formData,[name]:value
  })
  }
  const geMedicineName = async () =>{
   const response = await api.getMedicneName(formData.medine_category)
   const {data} = response
   setMedicineName(data)
   console.log(data,"fetched medicineName")
  }
  const getDosage = async () =>{
    const response = await api.getMedicineDosage(formData.medine_category)
    const {data} = response
    setMedicineDosage(data)
    console.log(data,"getdosagee")
  }
  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  const getDosageIntervel = async ()=>{
   const response = await api.getDosageIntervel()
   const {data} = response
   setDosageIntervel(data)
   console.log(data,"dosage interval")
  }
  const getDosageDuration = async ()=>{
    const response = await api.getDosageDuration()
    const {data} = response
    setDosageDuration(data)
    console.log(data,"dosageduration .")
  }
  const getFinding = async () =>{
    const response = await api.getFindings(formData.finding_Category)
    const {data} = response
    setFindings(data)
    console.log(data,"finded findings")
  }
  console.log(formData,"update")
  const handleSubmit = async () => {
    const response = await api.postPrescriptionBasic(formData);
    const { data } = response;
    console.log(data, "data ss dd");
    setBasicData(data);
    handleBasic_id(data);
  };
  
  const handleBasic_id = async (datas) => {
    console.log(datas, "datas basic");
    setFormData((prevFormData) => ({
      ...prevFormData,
      basic_id: datas?.data,
      ipd_prescription_basic_id: datas?.data
    }));
  };
  
  useEffect(() => {
    handlePriscriptionDetails(formData); 
  }, [formData]); 
  
  const handlePriscriptionDetails = async (formData) => {
    const response = await api.postPrescriptionDetails(formData);
    handlePriscriptionTest();
  };
  
  const handlePriscriptionTest = async () => {
    const response = await api.postPrescriptionTest(formData);
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
        <DialogTitle id="alert-dialog-title" className="bg-primary bg-soft text-primary">
        Add Prescription
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='12' sm='12'>
                <label>Header Note</label>
                <br />
                <input name="header_note" onChange={handleChange} value={formData.header_note} placeholder="" style={{width: '100%', height: '60px'}}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='3'  sm='12'>
                <label>Finding Category</label>
                <br />
                <select style={{width:'100%', height: '30px'}} name="finding_Category" onChange={handleChange} value={formData.finding_Category}>
                  <option>Select</option>
                  {findingCategory && findingCategory.map((val=>(
                    <option key={val.id} value={val.id}>{val.category}</option>
                  )))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
                <label>Findings</label>
                <br />
                <select style={{width:'100%', height: '30px'}} name="findings" onClick={()=>getFinding()} onChange={handleChange} value={formData.findings}>
                  {findings && findings.map((val=>(
                    <option key={val.name}>{val.name}</option>
                  )))}
                 <option>Select</option>
                </select>
            </Col>
            <Col lg='3' sm='12'>
                <label>Finding Prescription</label>
                <br />
                <textarea name="finding_description" onChange={handleChange} value={formData.finding_description} style={{width:'100%'}}></textarea>
            </Col>
            <Col lg='3' sm='12'>
                <label>Date</label>
                <br />
                <input name="date" type="date" onChange={handleChange} value={formData.finding_description} style={{width:'100%'}}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='3' sm='12'>
            <label>Medicine Category</label>
                <br />
                <select style={{width:'100%', height: '30px'}} name="medine_category" onChange={handleChange} value={formData.medine_category}>
                  <option>select one</option>
                  {medicineCategory && medicineCategory.map((val=>(
                 <option key={val.id} value={val.id}>{val.medicine_category}</option>
                  )))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
            <label>Medicine</label>
                <br />
                <select style={{width:'100%', height: '30px'}} name="pharmacy_id"  onClick={()=>geMedicineName()} onChange={handleChange} value={formData.pharmacy_id}>
                  <option>Select one</option>
                  {medicineName && medicineName.map((val=>(
                      <option key={val.id} value={val.id}>{val.medicine_name}</option>
                  )))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
            <label>Dosage</label>
                <br />
                <select style={{width:'100%', height: '30px'}} name="dosage" onClick={()=>getDosage()} onChange={handleChange} value={formData.dosage}>
                  <option>Select</option>
                  {medicineDosage && medicineDosage.map((val=>(
                    <option key={val.id} value={val.id}>{val.dosage}</option>
                  )))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
            <label>Dose Interval</label>
                <br />
                <select style={{width:'100%', height: '30px'}} onChange={handleChange} name="dose_interval_id" onClick={()=>getDosageIntervel()} value={formData.dose_interval_id}>
                  <option>Select</option>
                  {dosageIntervel && dosageIntervel.map((val=>(
                    <option key={val.id} value={val.id}>{val.name}</option>
                  )))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
            <label>Dose Duration</label>
                <br />
                <select style={{width:'100%', height: '30px'}} name="dose_duration_id" onClick={()=>getDosageDuration()} onChange={handleChange} value={formData.dose_duration_id}>
                  <option>Select</option>
                  {dosageDuration && dosageDuration.map((val=>(
                    <option key={val.id} value={val.id} >{val.name}</option>
                  )))}
                </select>
            </Col>
            <Col lg='3' sm='12'>
            <label>Instruction</label>
                <br />
                <textarea name="instruction" onChange={handleChange} value={formData.instruction} style={{width: '100%'}}></textarea>
            </Col>
            <div className="mt-2">
            {/* <button className="btn btn-primary">+ Add Medicine</button> */}

            </div>
          </Row>
          <br />
          <Row>
          <Col lg='4'>
                <label>Prescribe By</label>
                <br />
                <select  onChange={handleChange}  style={{width:'100%', height: '30px'}}>
                  <option>Select</option>
                  {doctor && doctor.map((value=>(
                    <option key={value.staff_id} value={value.staff_id}>{value.name}</option>
                  )))}
                </select>
            </Col>
            <Col lg='4'>
                <label>Pathology</label>
                <br />
                <select name="pathology_id" onChange={handleChange} value={formData.pathology_id} style={{width:'100%', height: '30px'}}>
                  {pathology && pathology.map((val=>(
                    <option key={val.id} value={val.id}>{val.short_name}</option>
                  )))}
                    <option>Select</option>
                </select>
            </Col>
            <Col lg='4'>
                <label>Radiology</label>
                <br />
                <select name="radiology_id"  style={{width:'100%', height: '30px'}} onChange={handleChange} value={formData.radiology_id}>
                  {radiology && radiology.map((val=>(
                    <option  key={val.id} value={val.id}>{val.short_name}</option>
                  )))}
                    <option>Select</option>
                </select>
            </Col>
            
          </Row>
          <br />
          <Row>
            <Col lg='12' sm='12'>
                <label>Footer Note</label>
                <br />
                <input name="footer_note" onChange={handleChange} value={formData.footer_note} placeholder="" style={{width: '100%', height: '60px'}}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
            <label>Notification To</label>
            <br />
                <input type="checkbox"></input>
                <label className="ms-2">Admin</label>
                <br />
                <input type="checkbox"></input>
                <label className="ms-2">Accountant</label>
                <br />
                <input type="checkbox"></input>
                <label className="ms-2">Pharmacist</label>
                <br />
                <input type="checkbox"></input>
                <label className="ms-2">Pathologist</label>
                <br />
                <input type="checkbox"></input>
                <label className="ms-2">Radiologist</label>
                <br />
                <input type="checkbox"></input>
                <label className="ms-2">Super Admin</label>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <button  className="btn btn-primary bg-soft btn-md" onClick={()=>handleSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
