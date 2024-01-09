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

export default function SetupPathologyParameterDialog({
  open,
  handleClose,
  data,
  onChange,
  // handleFormSubmit,
  selectedData,
  getSetupPathoParameter
}) {


  const [openParameterDialog, setOpenParameterDialog] = React.useState(false)
  const [pathUnit,setpathUnit] = useState('')
  const [formData,setFormData] = useState({})
  const [validate,setValidate] = useState({
    parameter_name: false,
    test_value: false,
    reference_range: false,
    gender: false,
    unit: false,
    description: false,
  })
  console.log(pathUnit,'unit')

  useEffect(() => {
    handlePathoSetupUnit()
  }, [])
  const handleFormSubmit = async ()=>{
    try {
      
      console.log(formData,"eedata");
      if(formData?.test_value === '' && formData?.parameter_name === '' && formData?.reference_range === ''&& formData?.unit === '' && formData?.description === ""){
        // setValidate()
        window.alert("fill all fields")
      }
      else if(formData?.parameter_name === ''){
       setValidate({...validate,parameter_name:true})
       setTimeout(() => {
        setValidate({...validate,parameter_name:false});
      }, 10000);
      }
      else if(formData?.reference_range === ''){
        setValidate({...validate,reference_range:true})
        setTimeout(() => {
          setValidate({...validate,reference_range:false});
        }, 10000);
      }
      // if(formData?.)
      else if(formData?.unit === ''){
        setValidate({...validate,unit:true})
        setTimeout(() => {
          setValidate({...validate,unit:false});
        }, 10000);
      }
      else if(formData?.description === ''){
        setValidate({...validate,description:true})
        setTimeout(() => {
          setValidate({...validate,description:false});
        }, 10000);
      }
      else{
        const response = await api.postSetupPathologyParameter(formData)
        getSetupPathoParameter()
        handleClose()
      }
    } catch (error) {
      console.log(error);
      getSetupPathoParameter()
      handleClose()
    }
  }
  const handleFormSubmitUpdate = async () =>{
    const data = {
      ...formData,id:selectedData?.id
    }
    const updateRadiologyParameter = await api.updateSetupPathologyParameter(data)
    setFormData({
      parameter_name:"",
      test_value: "",
      reference_range:"",
      gender: "",
      unit: "",
      description:"",
    });
    getSetupPathoParameter();
  }
  const handleChange = (e) =>{
    const {id,value} = e.target
    setFormData({
      ...formData,
      [id]:value
    })
  }
  const handlePathoSetupUnit = async () =>{
    const response = await  api.getSetupPathologyUnit()
    const {data} = response
    setpathUnit(data)
    console.log(data,"data")
  }
  
  useEffect(() => {
    // When selectedData changes, update the form data
    if (selectedData) {
      setFormData({
        parameter_name: selectedData.parameter_name || "",
    reference_range:selectedData?.reference_range || "",
    test_value:selectedData?.test_value || "",
    unit:selectedData?.unit || "",
    gender:selectedData?.gender || "",
    description:selectedData?.description || ""
      });
    } else {
      // Reset form data when selectedData is not available (for addition)
      setFormData({
        parameter_name:"",
        test_value: "",
        reference_range:"",
        gender: "",
        unit: "",
        description:"",
      });
    }
  }, [selectedData]);
  const handleClickOpen = () => {
    //dialog open
    setOpenParameterDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenParameterDialog(false)
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
          Add Pathology Category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container className="p-2">
            <Row>
              <label>Parameter Name</label>
              <br />
              <input id='parameter_name' placeholder={validate?.parameter_name? "Enter parameter name":""} onChange={handleChange} value={formData.parameter_name} style={{borderColor :validate?.parameter_name ? 'red':'inherit'}}></input>
            </Row>
            <br />
            <Row> 
              <label>Reference Range</label>
              <br />
              <input id='reference_range' placeholder={validate?.reference_range? "Enter reference rage":""}  onChange={handleChange} value={formData.reference_range} style={{borderColor :validate?.reference_range ? 'red':'inherit'}}></input>
            </Row>
            <br />
            <Row>
              <label>Unit</label>
              <br />
              <select id='unit' onChange={handleChange} placeholder={validate?.unit? "Enter unit":""}  style={{borderColor :validate?.unit ? 'red':'inherit'}} value={formData.unit_name} >
                <option>select</option>
                {pathUnit && pathUnit.map((pathounit => (
                    <option key={pathounit.id} value={pathounit.id}>
                      {pathounit.unit_name}
                    </option>
                  )))}
              </select>
            </Row>
            <br />
            <Row>
              <label>Description</label>
              <br />
              <input id='description' placeholder={validate?.description? "Enter description":""} onChange={handleChange} value={formData.description} style={{borderColor : validate?.description ? 'red':'inherit'}}></input>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          {selectedData?.parameter_name ? <button
            className="btn-mod bg-soft btn-sm"
            onClick={() => handleFormSubmitUpdate(handleClose())}
            style={{ marginRight: "3%" }}
          >
            Saves
          </button>:
           <button
           className="btn-mod bg-soft btn-sm"
           onClick={() => handleFormSubmit()}
           style={{ marginRight: "3%" }}
         >
           Save
         </button>}
        </DialogActions>
      </Dialog>
    </div>
  )
}
