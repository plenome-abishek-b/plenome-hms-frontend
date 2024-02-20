import React , {useState , useEffect} from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container, Label, Input } from "reactstrap"
import { TextField } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"
import PatientDialog from "pages/Appointment/Dialog/PatientDialog"
import api from "services/Api"

export default function SetupBedGroupDialog({
  open,
  handleClose,
  selectedData,
  getBedGroupList
}) {
//new
  const [bedFloor, setbedFloor] = useState('')
  const [formData,setFormData] = useState({
        name: "",
        color: "",
        description: "",
        floor: "",
        is_active: 0,
        Hospital_id:1
  })
  const [validate,setValidate] = useState({
    name: false,
    color:false,
    description: false,
    floor: false,
  })
 


  const getFloorCate = async () => {
    const response = await api.getSetup_bed_floor()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setbedFloor(data)
  }
   useEffect(()=>{
    if(selectedData){
      setFormData({
        name:selectedData?.name,
        color:selectedData?.color,
        description:selectedData?.description,
        floor:selectedData?.floor_id,
        Hospital_id:1,
        is_active: 0,
      })
    }else{
      setFormData({
        name: "",
        color: "",
        description: "",
        floor: "",
        is_active: 0,
        Hospital_id:1
      })
    }
   },[selectedData])

   const handleChange=(e)=>{
    const {id,value} = e.target
    console.log(id,value,"getting");
    setFormData((prevFormData) => {
      console.log(prevFormData, "D");
      return {
        ...prevFormData,
        [id]: value,
      };
    });
  
   }
   const handleSubmit = async () =>{
    console.log(formData,"FF",formData?.name === undefined,"FF");

    try{
    if(formData?.name == undefined){
      setValidate({...validate,name:true})
      setTimeout(()=>{
      setValidate({...validate,name:false})
      },3000)
    }
    else if(formData?.color === undefined){
      setValidate({...validate,color:true})
      setTimeout(()=>{
        setValidate({...validate,color:false})
        },3000)
    }
    else if(formData?.description === undefined){
      setValidate({...validate,description:true})
      setTimeout(()=>{
        setValidate({...validate,description:false})
        },3000)
    }else if(formData?.floor === undefined){
      setValidate({...validate,floor:true})
      setTimeout(()=>{
       setValidate({...validate,floor:false})
      },3000)
    }
    else{
      const response = await api.postSetup_bed_group(formData)
      const {data} = response
      console.log(data,"ddd");
      getBedGroupList();
      handleClose();
    }
  }catch(error){
      console.log(error,"error");
    }
   }
   const handleUpdate = async () =>{
    const datas ={
      ...formData,
      id:selectedData?.id
    }
    console.log(datas,"datas");
    const response = await api.updateSetup_bed_group(datas);
    const {data} = response;
    console.log(data,"ew");
    getBedGroupList();
    handleClose();
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
        Add Bed Group
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">   
        <Row className="p-2">
            <label>Name<span style={{color: 'red'}}>*</span></label>
            <br />
            <input type="text" placeholder={validate?.name ? 'enter name':''} style={{height: '30px',borderColor:validate?.name ? 'red':''}} value={formData.name} id="name" onChange={handleChange} ></input>
        </Row>
        <br />
        <Row className="p-2">
            <label>Floor</label>
            <br />
            <select  style={{height: '30px',borderColor:validate?.floor ? 'red':''}} value={formData.floor} id="floor" onChange={handleChange} onClick={()=>getFloorCate()} >
            <option>select</option>
            {bedFloor &&
                bedFloor.map((floorSet) => (
                  <option key={floorSet.id} value={floorSet.id}>
                    {floorSet.name}
                  </option>
                ))}
            </select>
        </Row>
        <br />
        <Row className="p-2">
            <label>Color</label>
            <br />
            <input type="color"  style={{height: '30px',borderColor:validate?.color ? 'red':''}} value={formData.color} id="color" onChange={handleChange} ></input>
        </Row>
        <br />
        <Row className="p-2">
            <label>Description</label>
            <br />
            <textarea style={{height: '50px',borderColor:validate?.description ? 'red':''}} placeholder={validate?.description ? "enter description":""} value={formData.description} id="description" onChange={handleChange} ></textarea>
        </Row>
        </DialogContent>
        <DialogActions>
          {selectedData?.color ? (
          <button className="btn-mod bg-soft btn-md" onClick={() => handleUpdate()} style={{marginRight: '3%'}}>
            Save
          </button>
          ):
          (    
            <button
            className="btn-mod bg-soft btn-md"
            type="button"
            onClick={() => handleSubmit()}
            style={{ marginRight: '3%' }}
          >
            Saves
          </button>
            )
          
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}