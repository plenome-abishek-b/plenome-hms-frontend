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

export default function NurseNoteDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const [openCrDialog, setOpenCrDialog] = React.useState(false)
  const [fetchNurse,setFetchNurse] = useState([])
  const{ipdno} = useParams()
  const [formValues,setFormValues] = useState({
    date:'',
    staff_id:'',
    note:'',
    comment:'',
    updated_at:'2023-10-11 11:11:11',
    ipd_id:ipdno
  })

  const handleClickOpen = () => {
    //dialog open
    setOpenCrDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenCrDialog(false)
  }
  useEffect(()=>{
   fetchNurses()
  },[])
  const fetchNurses = async () =>{
    const response = await api.getNurses()
    const {data} = response
    console.log(data,"funnn")
    setFetchNurse(data)
  }
  const handleChange = (event) =>{
    console.log(event.target, "oooo")
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }
  console.log(formValues)
  const handleSubmit = async () =>{
    const response = await api.postNurseNote(formValues)
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
        Add Charges
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Row>
            <Col lg='6'>
                <label>Date</label>
                <br />
                <input name="date" onChange={handleChange} value={formValues.date} placeholder="" type="date" style={{width: '100%', height: '30px'}}></input>
            </Col>
            <Col lg='6'>
                <label>Nurse</label>
                <br />
                <select name="staff_id" style={{width: '100%', height: '30px'}} onChange={handleChange} value={formValues.staff_id}>
                  <option>select one</option>
                {fetchNurse && fetchNurse.map((nurse)=>(
                    <option key={nurse.staff_id} value={nurse.staff_id}>{nurse.name}</option>
                ))}
                </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='12'>
                <label>Note</label>
                <br />
                <textarea name="note" onChange={handleChange} value={formValues.note} style={{width: '100%'}}></textarea>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='12'>
                <label>Comment</label>
                <br />
                <textarea name="comment" onChange={handleChange} value={formValues.comment}  style={{width: '100%'}}></textarea>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-primary bg-soft btn-md" onClick={()=>handleSubmit(handleClose())} style={{marginRight: '3%'}}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
