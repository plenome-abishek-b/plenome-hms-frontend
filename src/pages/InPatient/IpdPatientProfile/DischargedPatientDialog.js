import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Row, Col, Input } from 'reactstrap';
import { TextField } from '@mui/material';
import TextArea from 'antd/es/input/TextArea';
import { TextareaAutosize } from '@mui/material';
import { Label } from 'recharts';
import { Select } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import api from 'services/Api';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function DischargedPatientDialog({ open, handleClose }) {
const {ipdno} = useParams()
const [formData,setFormData] = useState({
    discharge_date:'',
    discharge_status:'',
    note:'',
    operation:'',
    diagnosis:'',
    investigations:'',
    treatment_home:'',
    ipd_details_id:ipdno,
    created_at:'2012-03-11 11:11:11'
})
const handleChange = (event) =>{
    const {name,value} = event.target
    console.log(name,value,"target and name")
    setFormData({
        ...formData,[name]:value
    })
}
console.log(formData,'bbbc')
const handleSubmit = async () =>{
 const response = await api.postDischargePatients(formData)
}
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Row>
                        <Col>
                        <label>Discharge Date</label>
                        <br />
                        <input name="discharge_date" type="date" onChange={handleChange} value={formData.discharge_date} placeholder="" style={{width: '100%', height: '30px'}}></input>
                        </Col>
                        <Col>
                        <label>Discharge Status</label>
                        <br />
                        <select onChange={handleChange} name="discharge_status" value={formData.discharge_status} style={{width: '100%', height: '30px'}}>
                            <option >select</option>
                            <option key="1" value="1">Death</option>
                            <option key="2" value="2">Referral</option>
                            <option key="3" value="3">Normal</option>
                        </select>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <label>Note</label>
                        <br />
                        <textarea name="note" onChange={handleChange} value={formData.note} style={{width: '100%', height: '30px'}}></textarea>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                        <label>Operation</label>
                        <br />
                        <input name="operation" onChange={handleChange} value={formData.operation}/>
                        </Col>
                        <Col>
                        <label>Diagnosis</label>
                        <br />
                        <input onChange={handleChange} name="diagnosis" value={formData.diagnosis} style={{width: '100%', height: '30px'}}></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                        <label>Investigation</label>
                        <br />
                        <input name="investigations" onChange={handleChange} value={formData.investigations} style={{width: '100%', height: '30px'}}></input>
                        </Col>
                        <Col>
                        <label>Treatment at Home</label>
                        <br />
                        <input name='treatment_home' onChange={handleChange} value={formData.treatment_home} style={{width: '100%', height: '30px'}}></input>
                        </Col>
                    </Row>

                </DialogTitle>
                <DialogContent>
                   
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-danger' onClick={handleClose}>Cancel</button>
                    <button className='btn btn-primary' onClick={()=>handleSubmit(handleClose())} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}