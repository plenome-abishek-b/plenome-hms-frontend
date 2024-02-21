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
 
export default function SetupBedListDialog({
  open,
  handleClose,
  getBedStatusList,
  selectedData
}) {
 
 
  const [openSetupBedDialog, setOpenSetupBedDialog] = React.useState(false)
  const [bedType, setBedType] = useState('')
  const [bedGroup, setBedGroup] = useState('')
  const [formData,setFormData] = useState({
        name: "",
        bed_type_id:"",
        bed_group_id: "",
        is_active: "yes",
        Hospital_id:1
  })
  const [validate,setValidate] = useState({
    name: false,
    bed_type_id:false,
    bed_group_id: false,
    is_active: false,
  })
 
  console.log(bedType, 'bed type');
  console.log(bedGroup, 'bed grp');
 
  useEffect(() => {
    getTypeBed()
    getGroupBed()
  }, [])
 
 
  const getTypeBed = async () => {
    const response = await api.getSetup_bed_type()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setBedType(data)
  }
 
  const getGroupBed = async () => {
    const response = await api.getSetup_bed_group()
    const { data } = response
    console.log(data, "kkkkkkkkkkkkkkkkkkk")
    setBedGroup(data)
  }
 
  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    console.log(typeof(value), id, "jj");
 
    setFormData((prevFormData) => {
      if (id === 'is_active') {
        return { ...prevFormData, is_active: type === 'checkbox' ? (checked ? 'yes' : 'no') : (value === 'on' ? 'yes' : 'no') };
      } else {
        console.log(id, value, "eew");
        return { ...prevFormData, [id]: value };
      }
    });
  };
 
 const handleSubmit = async () =>{
  console.log(formData,"FF");
  if(formData?.name == undefined){
    setValidate({...validate,name:true})
    setTimeout(()=>{
      setValidate({...validate,name:false})
    },3000)
  }else if(formData?.bed_type_id == undefined){
    setValidate({...validate,bed_type_id:true})
    setTimeout(()=>{
      setValidate({...validate,bed_type_id:false})
    },3000)
  }else if(formData?.bed_group_id == undefined){
    setValidate({...validate,bed_group_id:true})
    setTimeout(()=>{
      setValidate({...validate,bed_group_id:false})
    },3000)
  }else{
    const response = await api.postSetup_Bed(formData)
    const {data} = response
    console.log(data,"submitted");
    getBedStatusList()
    handleClose()
  }
 }
 const handleUpdate = async () =>{
 
  const data = {
    ...formData,
    id:selectedData?.id
  }
  console.log(data,"la la la");
  if(data?.name == ''){
    setValidate({...validate,name:true})
    setTimeout(()=>{
      setValidate({...validate,name:false})
    },3000)
  }else if(data?.bed_type_id == ''){
    setValidate({...validate,bed_type_id:true})
    setTimeout(()=>{
      setValidate({...validate,bed_type_id:false})
    },3000)
  }else if(data?.bed_group_id == ''){
    setValidate({...validate,bed_group_id:true})
    setTimeout(()=>{
      setValidate({...validate,bed_group_id:false})
    },3000)
  }else{
  console.log(data,"dataf");
  const response = await api.updateSetup_Bed(data)
  getBedStatusList()
  handleClose()
  }
 }
 const handleChangeCheckbox = () => {
  setFormData((prevFormData) => (
    console.log(prevFormData.is_active,"is active"),{

    ...prevFormData,
    is_active: prevFormData.is_active === 'yes' ? 'no' : 'yes'
  }));
};
 
 useEffect(()=>{
  if(selectedData){
    console.log(selectedData,"selected");
    setFormData({
      name:selectedData?.name,
      bed_type_id:selectedData?.bed_type_id,
      bed_group_id:selectedData?.bed_group_id,
      is_active:selectedData?.used,
      Hospital_id:1
    })
  }else{
    setFormData({
      name: "",
      bed_type_id:"",
      bed_group_id: "",
      is_active: "yes",
      Hospital_id:1
    })
  }
 },[selectedData])
 
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
        Add Bed
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">  
        <Row className="p-2">
        <Label>Name</Label>
            <input
            type="text"
            style={{height: '30px',borderColor:validate?.name ? 'red':''}} placeholder={validate?.name ? 'enter name':''} value={formData?.name} id="name"  onChange={handleChange}
            >
            </input>
        </Row>
        <br />
        <Row className="p-2">
        <label>Bed Type</label>
        <br />
            <select style={{height: '30px',borderColor:validate?.bed_type_id ? 'red':''}} placeholder={validate?.bed_type_id ? 'select bed type':''} value={formData?.bed_type_id} id="bed_type_id" onChange={handleChange} onClick={()=>getTypeBed()}>
                <option>{selectedData?.bed_group ? selectedData?.bed_group : 'select'}</option>
                {bedType &&
                bedType.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </select>
        </Row>
        <br />
        <Row className="p-2">
        <label>Bed Group</label>
        <br />
            <select style={{height: '30px',borderColor:validate?.bed_group_id ? 'red':''}} value={formData?.bed_group_id} id="bed_group_id" placeholder={validate?.name ? 'select bed group':''} onClick={()=>getGroupBed()} onChange={handleChange} >
            <option>{selectedData?.Bed_Type ? selectedData?.Bed_Type :'select'}</option>
            {bedGroup &&
                bedGroup.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
            </select>
        </Row>
        <br />
        <input type="checkbox" id="is_active" checked={formData?.is_active === 'yes'} value={formData?.is_active} onClick={()=>handleChangeCheckbox()}></input>
        &nbsp; <label>Mark as unused</label>
        </DialogContent>
        <DialogActions>
          {selectedData?.bed_type_id ?(
 
            <button className="btn-mod bg-soft btn-md"  onClick={()=>handleUpdate()} style={{marginRight: '3%'}}>
                Save
          </button>
          ):(
            <button className="btn-mod bg-soft btn-md" onClick={()=>handleSubmit()} style={{marginRight: '3%'}}>
            Save
          </button>
          )}
         
        </DialogActions>
      </Dialog>
    </div>
  )
}