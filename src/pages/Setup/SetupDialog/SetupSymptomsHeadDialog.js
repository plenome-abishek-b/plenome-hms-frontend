import React , {useState,useEffect}from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function SetupSymptomsDialog({
  open,
  handleClose,
  selectedData,
  getSymptomsHeadList
}) {
  const [openSetupSupplierDialog, setOpenSetupSupplierDialog] = React.useState(false)
  const [symptomType,setSymptomType] = useState('')
  const [formData,setFormData] = useState({
    symptoms_title:'',
    description:'',
    type:'',
    Hospital_id:1
  })

  useEffect(()=>{
    if(selectedData){
      setFormData({
       symptoms_title:selectedData?.symptoms_title,
       description:selectedData?.description,
       type:selectedData?.type
      })
    }else{
      setFormData({
      symptoms_title:'',
      description:'',
      type:'',
      Hospital_id:1
    })
    }
  },[selectedData])


  const handleClickOpen = () => {
    //dialog open
    setOpenSetupSupplierDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
   setOpenSetupSupplierDialog(false)
  }
console.log(symptomType,"type")
const handleUpdate = async () =>{
  const newData = {
    ...formData,
    id:selectedData?.id
  }
  const response = await api?.updateSetupSymptoms_header(newData)
  handleClose()
  getSymptomsHeadList()
}
const handleFormSubmit = async () =>{
    console.log(formData);
    const response = await api?.postSetupSymptoms_header(formData)
    handleClose()
    getSymptomsHeadList()
}
const getSymptomsType = async () =>{
  const response = await api?.getSetupSymptoms_Type()
  const {data} = response
  console.log(data,":response data");
  setSymptomType(data)

}
const handleChange = (e) =>{
  const {id,value} = e.target
  setFormData({
    ...formData,[id]:value
  })
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
        Add Symptoms Head
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Container className="p-2">
            <Row>
                <label>Symptoms Head</label>
                <br />
               <input value={formData?.symptoms_title} id="symptoms_title" onChange={handleChange} ></input>
                
            </Row>
            <br />
            <Row>
                <label>Symptoms Type</label>
                <br />
                <select style={{height:'30px'}} value={formData?.type} id="type" onClick={()=>getSymptomsType()} onChange={handleChange} >
                <option>select</option>
                {symptomType &&
                symptomType.map((head) => (
                  <option key={head.id} value={head?.id}>
                    {head.symptoms_type}
                  </option>
                ))}
                </select>
            </Row>
            <br />
            <Row>
                <label>Description</label>
                <br />
                <textarea rows={6} value={formData?.description} id="description" onChange={handleChange} ></textarea>
            </Row>
        </Container>
        </DialogContent>
        <DialogActions>
          {selectedData?.symptoms_title ?
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleUpdate()} style={{marginRight: '3%'}}>
            Save
          </button>:
          <button className="btn-mod bg-soft btn-md" onClick={()=>handleFormSubmit()} style={{marginRight: '3%'}}>
          Save
        </button>
             }
        </DialogActions>
      </Dialog>
    </div>
  )
}