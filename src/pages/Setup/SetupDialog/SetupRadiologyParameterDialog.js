import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import { useState } from "react"
import api from "services/Api"
import { useEffect } from "react"
import { isEmpty } from "lodash"

export default function SetupRadiologyParameterDialog({
  open,
  handleClose,
  data,
  getRadiologyParameter,
  selectedData
}) {
  console.log(isEmpty(selectedData),"log selectedData");
  const [units,setUnits] = useState([])
  const [formData,setFormData] = useState({
    parameter_name:'',
    reference_range:'',
    test_value:'',
    unit:'',
    gender:'',
    description:''
  })
  const [validate,setValidate] = useState({
    parameter_name: false,
    test_value: false,
    reference_range: false,
    gender: false,
    unit: false,
    description: false,
  })
  const handleChange = (event) =>{
    const {name,value} = event.target
    setFormData({...formData,[name]:value})
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
        parameter_name:'',
        reference_range:'',
        test_value:'',
        unit:'',
        gender:'',
        description:''
      });
    }
  }, [selectedData]);
  const handleFormSubmit = async () =>{
    try {
      if(formData?.test_value === '' && formData?.parameter_name === '' && formData?.reference_range === ''&& formData?.unit === '' && formData?.description === ""){
        // setValidate()
        window.alert("fill all fields")
      }
      else if(formData?.parameter_name === ''){
       setValidate({...validate,parameter_name:true})
       setTimeout(() => {
        setValidate({...validate,parameter_name:false});
      }, 3000);
      }
      else if(formData?.reference_range === ''){
        setValidate({...validate,reference_range:true})
        setTimeout(() => {
          setValidate({...validate,reference_range:false});
        }, 3000);
      }
      // if(formData?.)
      else if(formData?.unit === ''){
        setValidate({...validate,unit:true})
        setTimeout(() => {
          setValidate({...validate,unit:false});
        }, 3000);
      }
      else if(formData?.description === ''){
        setValidate({...validate,description:true})
        setTimeout(() => {
          setValidate({...validate,description:false});
        }, 3000);
      }
      else{

        const response = await api.postSetupRadiologyParameter(formData)
        // if(response.data){
          getRadiologyParameter()
          setFormData({ parameter_name:'',
          reference_range:'',
          test_value:'',
          unit:'',
          gender:'',
          description:''})
          handleClose()
      }
      // }
    } catch (error) {
      console.log(error);
      getRadiologyParameter()
      handleClose()
      
    }
    // window.location.reload()
  }
  const handleFormSubmitUpdate = async () =>{
    const data = {
      ...formData,id:selectedData?.id
    }
    const updateRadiologyParameter = await api.patchSetupRadiologyParameter(data)
    setFormData({ parameter_name:'',
    reference_range:'',
    test_value:'',
    unit:'',
    gender:'',
    description:''})
    getRadiologyParameter()
  }
  const getUnits =async () =>{
   const response = await api.getSetupRadiologyUnit()
   const {data} = response 
   setUnits(data)
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
          Add Radiology Category
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container className="p-2">
            <Row>
              <label>Parameter Name</label>
              <br />
              <input name="parameter_name" placeholder={validate?.parameter_name ? "Enter parameter name" :""} onChange={handleChange} value={formData.parameter_name} style={{borderColor:validate?.parameter_name ? 'red':'inherit'}}></input>
            </Row>
            <br />
            <Row>
              <label>Reference Range</label>
              <br />
              <input name="reference_range" placeholder={validate?.reference_range ? "Enter referenceRage" :""} onChange={handleChange} value={formData.reference_range} style={{borderColor:validate?.reference_range ? 'red':'inherit'}}></input>
            </Row>
            <br />
            <Row>
              <label>Unit</label>
              <br />
              <select name="unit" onClick={()=>getUnits()} placeholder={validate?.unit ? "Enter unit" :""} onChange={handleChange} value={formData.unit} style={{borderColor:validate?.unit ? 'red':'inherit'}}>
                <option>select one</option>
                {units.map((val=>(
                <option key={val.id} value={val.id}>{val.unit_name}</option>
                )))}
              </select>
            </Row>
            <br />
            <Row>
              <label>Description</label>
              <br />
              <input name="description" placeholder={validate?.description ? "Enter description" :""} onChange={handleChange} value={formData.description} style={{borderColor:validate?.description ? 'red':'inherit'}}></input>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          {selectedData?.parameter_name ?
          <button
          className="btn-mod bg-soft btn-sm"
          onClick={() => handleFormSubmitUpdate(handleClose())}
          style={{ marginRight: "3%" }}
        >
          Save
        </button>:<button
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
