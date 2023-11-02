import React , {useState,useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function OpdOperationDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openCrDialog, setOpenCrDialog] = React.useState(false)
  const [operationCategory,setOperationCategory] = useState('')
  const [operationName,setoperationName] = useState('')
  const [consdoctor,setConsdoctor] = useState('')


  useEffect(() => {
    handleOperationCategory()
    handleOperationName()
    handleConsultant()
  }, [])

  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }

  const handleOperationCategory = async () =>{
    const response = await  api.getOperationCategory()
    const {data} = response
    setOperationCategory(data)
    console.log(data,"data")
  }

  const handleOperationName = async () =>{
    const response = await  api.getOperationName()
    const {data} = response
    setoperationName(data)
    console.log(data,"data")
  }

  const handleConsultant = async () =>{
    const response = await  api.getConsultant()
    const {data} = response
    setConsdoctor(data)
    console.log(data,"data")
  }
  

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
        Add Operation
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='6' sm='12'>
                <label>Operation Category</label>
                <br />
                <select style={{width: '100%'}} id='category' onChange={e=>onChange(e)} value={data.category} > 
                    <option>Select</option>
                    {operationCategory && operationCategory.map((operation) => (
                    <option key={operation.id} value={operation.id}>
                      {operation.category}
                    </option>
                  ))}
                </select>
            </Col>
            <Col lg='6' sm='12'>
                <label>Operation Name</label>
                <br />
                <select style={{width: '100%'}} id='operation' onChange={e=>onChange(e)} value={data.operation} >
                    <option>Select</option>
                    {operationName && operationName.map((medicine) => (
                    <option key={medicine.id} value={medicine.id}>
                      {medicine.operation}
                    </option>
                  ))}
                </select>
            </Col>
          </Row>
          <br />
          <Row>
          <Col lg='6' sm='12'>
                <label>Operation Date</label>
                <br />
                <input placeholder="" style={{width: '100%'}} value={data.date} id="date" onChange={e=>onChange(e)} ></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>Consultant Doctor</label>
                <br />
                <select style={{width: '100%'}} value={data.cons_doctor} id="cons_doctor" onChange={e=>onChange(e)} >
                    <option>Select</option>
                    {consdoctor && consdoctor.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col  lg='6' sm='12'>
                <label>Assistant Consultant 1</label>
                <br />
                <input placeholder="" style={{width: '100%'}} value={data.ass_consultant_1} id="ass_consultant_1" onChange={e=>onChange(e)} ></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>Assistant Consultant 2</label>
                <br />
                <input placeholder="" style={{width: '100%'}} value={data.ass_consultant_2} id="ass_consultant_2" onChange={e=>onChange(e)} ></input>
            </Col>
          </Row>
          <br />
          <Row>
          <Col lg='6' sm='12'>
                <label>Anesthetist</label>
                <br />
                <input placeholder="" style={{width: '100%'}} value={data.anesthetist} id="anesthetist" onChange={e=>onChange(e)} ></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>Anesthesia Type</label>
                <br />
                <input placeholder="" style={{width: '100%'}} value={data.anaethesia_type} id="anaethesia_type" onChange={e=>onChange(e)} ></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' sm='12'>
                <label>OT Technician</label>
                <br />
                <input placeholder="" style={{width: '100%'}} value={data.ot_technician} id="ot_technician" onChange={e=>onChange(e)} ></input>
            </Col>
            <Col lg='6' sm='12'>
                <label>OT Assistant</label>
                <br />
                <input placeholder="" style={{width: '100%'}} value={data.ot_assistant} id="ot_assistant" onChange={e=>onChange(e)} ></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' sm='12'>
                <label>Remark</label>
                <br />
                <textarea style={{width: '100%'}} value={data.remark} id="remark" onChange={e=>onChange(e)} ></textarea>
            </Col>
            <Col lg='6' sm='12'>
                <label>Result</label>
                <br />
                <textarea style={{width: '100%'}} value={data.result} id="result" onChange={e=>onChange(e)} ></textarea>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={()=>handleFormSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
