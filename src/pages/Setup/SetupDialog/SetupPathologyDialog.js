import React , {useState,useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"
import { isEmpty } from "lodash"

export default function SetupPathologyDialog({
  open,
  handleClose,
  data,
  onChange,
  getSetupPathoCategory,
  selectedData
  // handleFormSubmit,
}) {
  console.log("logselecteddata:",isEmpty(selectedData));
  const initialPathologySetupCategoryValue = {
    category_name: "",
      }

  const [openDialog, setOpenDialog] = React.useState(false)
  const [formData,setFormData] = useState({})
  const [validate,setValidate] = useState(false)
  const handleChange = (event) =>{
    const {name,value} = event.target
    console.log(name,"g",value,"val and name");
    setFormData({...formData,[name]:value})
  }
  const handleFormSubmitUpdate = async () =>{
    const data = {
      ...formData,id:selectedData?.id
    }
    console.log(data,"weeeeeeeee");
    const updateRadiologyParameter = await api.patchSetupPathologyCategory(data)
    console.log(updateRadiologyParameter,"e");
    setFormData({  category_name: ""})
    getSetupPathoCategory()
  }
  const handleFormSubmit = async () =>{
    console.log(formData,"formdatass");
    try {
      if(formData?.category_name === '' || formData?.category_name === undefined){
        console.log("calliing");
        setValidate(true)
       setTimeout(()=>{
        setValidate(false)
       },3000)
      }else{

        console.log(formData,"111111111");
        const response = await api.postSetupPathologyCategory(formData)
        window.location.reload()
      console.log(response,"loging response");
      handleClose()
      getSetupPathoCategory()
      setFormData({  category_name: ""})
      }
    } catch (error) {
      console.log(error);
      getSetupPathoCategory()
      handleClose()
    // getSetupPathoCategory()
      
    }
  }
  const handleClickOpen = () => {
    //dialog open
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenDialog(false)
  }
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      console.log(selectedData,"date consoling");
      setFormData({
        category_name:selectedData?.category_name
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        category_name: ""
      });
    }
  }, [selectedData]);
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
        Add Pathology Category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Container className="p-2">
            <Row>
                <label>Category Name</label>
                <br />
                <input name='category_name' placeholder={validate? "please fill category name" : ""} onChange={handleChange} value={formData.category_name} style={{borderColor:validate? 'red':'inherit'}} ></input>
            </Row>
        </Container>
        </DialogContent>
        <DialogActions>
        { isEmpty(selectedData) === true ? 
        <button className="btn-mod bg-soft btn-sm" onClick={()=>handleFormSubmit()} style={{marginRight: '3%'}}>
            Save
          </button>:
          <button className="btn-mod bg-soft btn-sm" onClick={()=>handleFormSubmitUpdate(handleClose())} style={{marginRight: '3%'}}>
          Save
        </button>}
        </DialogActions>
      </Dialog>
    </div>
  )
}
