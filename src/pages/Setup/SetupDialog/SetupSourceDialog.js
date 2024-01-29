import  React , {useState,useEffect}from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function SetupSourceDialog({
  open,
  handleClose,
  selectedData,
  getFrontSetupSource
}) {
  const [openSourceDialog, setopenSourceDialog] = React.useState(false)
  const [formData,setFormData] = useState({
    source:'',
    description:'',
    Hospital_id:1
  })
  const [validate,setValidate] = useState({
    source:false,
    description:false,
  })
  const handleClickOpen = () => {
    //dialog open
    setopenSourceDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setopenSourceDialog(false)
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        source:selectedData?.source || '',
        description:selectedData?.description || '',
        Hospital_id:1
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        source:'',
        description:'',
        Hospital_id:1
      });
    }
  }, [selectedData]);
  const handleFormSubmit = async () =>{
    console.log(formData,"POST");
    if(formData?.source === ''){
      setValidate({...validate,source:true})
      setTimeout(()=>{
      setValidate({...validate,visitors_purpose:false})
      },3000)
    }
    else if(formData?.description === ''){
      setValidate({...validate,description:true})
      setTimeout(()=>{
      setValidate({...validate,description:false})
      },3000)
    }
    else{
      const response = await api.postSetupFrontOffice_source(formData)
      getFrontSetupSource()
      handleClose()
    }
  }
  const handleUpdate = async () =>{
    const newData = {
      ...formData,
      id:selectedData?.id
    }
    const response = await api.updateSetupFrontOffice_source(newData)
    getFrontSetupSource()
    handleClose()
  }
  const handleChange = async (e) =>{
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
        <DialogTitle
          id="alert-dialog-title"
          className="bg-primary bg-soft text-primary"
        >
          Add Source
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container>
            <Row>
                <label>Source</label>
                <br />
                <input id='source' style={{borderColor:validate?.source ? 'red':''}}  placeholder={validate?.source ? "enter source" : "source"} onChange={handleChange} value={formData?.source} ></input>
            </Row>
            <br />
            <Row>
                <label>Description</label>
                <br />
                <textarea id='description' style={{borderColor:validate?.description ? 'red':''}} placeholder={validate?.description ? "enter description" : "description"} onChange={handleChange} value={formData?.description} ></textarea>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
         {selectedData?.source ? 
         <button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleUpdate()}
            style={{ marginRight: "3%" }}
          >
            Save
          </button> :
          <button
          className="btn-mod bg-soft btn-md"
          onClick={()=>handleFormSubmit()}
          style={{ marginRight: "3%" }}
        >
          Save
        </button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}
