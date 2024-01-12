import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"
import { useEffect } from "react"
import { useState } from "react"

export default function SetupFindingDialog({
  open,
  handleClose,
  // data,
  onChange,
  // handleFormSubmit,
  selectedData,
  getFindings
}) {
  const [openFindingDialog, setOpenFindingDialog] = React.useState(false)
  const [setupCategory,setSetupCategory] = useState([])
  const [validate,setValidate] = useState({
    description:false,
    finding_category_id:false,
    name:false
  })
  const [formData,setFormData] = useState({
    description:'',
    finding_category_id:'',
    name:''
  })
  const [data,setData] = useState({})
  const handleClickOpen = () => {
    //dialog open
    setOpenFindingDialog(true)
  }
  const handleFormSubmit = async () =>{
    try{
      if(formData?.name === '' || formData?.name === undefined){
       setValidate({...validate,name:true})
       setTimeout(()=>{
        setValidate({...validate,name:false})
       },3000)
      }
      else if(formData?.description === '' || formData?.description === undefined){
       setValidate({...validate,description:true})
       setTimeout(()=>{
        setValidate({...validate,description:false})
       },3000)
      }
      else if(formData?.finding_category_id === "" || formData?.finding_category_id === undefined){
        setValidate({...validate,finding_category_id:true})
        setTimeout(()=>{
          setValidate({...validate,finding_category_id:false})
         },3000)
      }
      else{
        const datas ={
          ...formData,Hospital_id:1,
          created_at: "2023-05-22 10:11:13"
        }
          console.log(formData,"login formdata");
         const response = await api.postSetup_Findings(datas)
         const {data} = response
         console.log(data,"posted");
         getFindings()
         handleClose()
      }
    }catch(error){
      getFindings()
      handleClose()
    }
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenFindingDialog(false)
  }
  const getSetupFindingCategory = async  () =>{
    const response = await api.getSetup_Finding_Category()
    const {data} = response
    console.log(data,"consoling setup category");
    setSetupCategory(data)
  }
  // useEffect(() =>{
  //  getSetupFindingCategory()
  // },[])
  const handleChange = async (event) =>{
     const {name,value} = event.target
     console.log(name,value,"name and value");
     setFormData({...formData,[name]:value})
  }
  
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        name: selectedData?.name || "",
        description:selectedData?.description || "",
        finding_category_id:selectedData?.finding_category_id || ""
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        name: "",
        description:"",
        finding_category_id:""
      });
    }
  }, [selectedData]);
  async function handleFormUpdate() {
    
    try {
      const newData = {
        ...formData,
        id: selectedData?.id,
      };
      const response = await api.updateSetup_Findings(newData);
      console.log(response, "respo");
      getFindings();
      location.reload()
    } catch (error) {
      console.error("Error updating data:", error);
    }
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
          Add Finding
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container className="p-2">
            <Row>
                <label>Finding<span style={{color: 'red'}}>*</span></label>
                <br />
                <input onChange={handleChange} name="name" placeholder={validate?.name ? "Enter finding name":""} value={formData?.name} type="text" style={{height: '30px',borderColor:validate?.name ? 'red':'inherit'}}></input>
            </Row>
            <br />
            <Row>
  <label>Category</label>
  <br />.
  <select onClick={getSetupFindingCategory} name="finding_category_id" value={formData?.finding_category_id} onChange={handleChange} style={{height: '30px',borderColor:validate?.finding_category_id ? 'red':'inherit'}}>
    <option>select</option>
    {setupCategory &&
      setupCategory.map((val) => {
        console.log(val, "lll");
        return (
          <option key={val.id} value={val.id}>{val.category}</option>
        );
      })}
  </select>
</Row>

            <br />
            <Row>
                <label>Description</label>
                <br />
                <textarea name="description" placeholder={validate?.description ? "Enter description":""} value={formData?.description} onChange={handleChange} style={{height: '50px',borderColor:validate?.description ? 'red':'inherit'}}></textarea>
            </Row>
          </Container>
          
        </DialogContent>
        <DialogActions>
         { selectedData?.name ?<button
            className="btn-mod bg-soft btn-md"
            onClick={()=>handleFormUpdate(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Saves
          </button>:
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
