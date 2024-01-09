import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Row, Col } from 'reactstrap';
import { TextField } from '@mui/material';
import TextArea from 'antd/es/input/TextArea';

export default function BirthDialog({ open, handleClose, data, onChange, handleFormSubmit }) {


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{backgroundColor: '#6070FF', height: '60px'}}>
                    Add Birth Details
                </DialogTitle>
                <DialogContent style={{paddingTop: '20px'}}>
                   <Row>
                    <Col lg='3' md='3' sm='12'>
                        <label>Child Name <span className="text-danger">*</span></label>
                        <br />
                        <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} id='child_name' value={data.child_name} onChange={e=>onChange(e)}></input>
                    </Col>
                    <Col lg='3' md='3' sm='12'>
                        <label>Gender <span className="text-danger">*</span></label>
                        <br />
                        <select style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} id='gender' value={data.gender} onChange={e=>onChange(e)}>
                            <option>select</option>
                            <option value="male">male</option>
                            <option value="female">Female</option>
                        </select>
                    </Col>
                    <Col lg='3' md='3' sm='12'>
                        <label>Weight <span className="text-danger">*</span></label>
                        <br />
                        <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} id='weight' value={data.weight} onChange={e=>onChange(e)}></input>
                    </Col>
                    <Col lg='3' md='3' sm='12'>
                        <label>Child Photo</label>
                        <br />
                        <input type='file' style={{width: '100%', height: '30px' ,borderRadius: '5px'}} id='child_pic' value={data.child_pic} onChange={e=>onChange(e)}></input>
                    </Col>
                   </Row>
                   <br />
                   <Row>
                    <Col lg='4' md='4' sm='12'>
                        <label>Phone</label>
                        <br />
                        <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} id='contact' value={data.contact} onChange={e=>onChange(e)}></input>
                    </Col>
                    <Col lg='4' md='4' sm='12'>
                        <label>Address</label>
                        <br />
                        <textarea style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} id='address' value={data.address} onChange={e=>onChange(e)}></textarea>
                    </Col>
                    <Col lg='4' md='4' sm='12'>
                        <label>Case ID <span className="text-danger">*</span></label>
                        <br />
                        <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} id='case_reference_id' value={data.case_reference_id} onChange={e=>onChange(e)}></input>
                    </Col>
                   </Row>
                   <br />
                   <Row>
                    <Col lg='6' md='6' sm='12'>
                        <label>Mother Name  <span className="text-danger">*</span></label>
                        <br />
                        <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></input>
                    </Col>
                    <Col lg='6' md='6' sm='12'>
                        <label>Mother Photo</label>
                        <br />
                        <input type='file' style={{width: '100%', height: '30px' ,borderRadius: '5px'}} id='mother_pic' value={data.mother_pic} onChange={e=>onChange(e)}></input>
                    </Col>
                    </Row>
                    <br />
                    <Row>
                    <Col lg='6' md='6' sm='12'>
                        <label>Father Name</label>
                        <br />
                        <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} id='father_name' value={data.father_name} onChange={e=>onChange(e)}></input>
                    </Col>
                    <Col lg='6' md='6' sm='12'>
                        <label>Father Photo</label>
                        <br />
                        <input type='file' style={{width: '100%', height: '30px' ,borderRadius: '5px'}} id='father_pic' value={data.father_pic} onChange={e=>onChange(e)}></input>
                    </Col>
                    </Row>
                   
                   
                   <br />
                   <Row>
                    <Col lg='6' md='6' sm='12'> 
                        <label>Report</label>
                        <br />
                        <textarea rows={3} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></textarea>
                    </Col>
                    <Col lg='6' md='6' sm='12'>
                        <label>Attach Document Photo</label>
                        <br />
                        <input type='file' style={{width: '100%', height: '30px' ,borderRadius: '5px'}} id='document' value={data.document} onChange={e=>onChange(e)}></input>
                    </Col>
                   </Row>
                   <br />
                   <Row>
                    <Col>
                        <label>Birth date <span className="text-danger">*</span></label>
                        <br />
                        <input id='birth_date' value={data.birth_date} onChange={e=>onChange(e)} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}></input>
                    </Col>
                   </Row>
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-danger fw-bold' onClick={handleClose} style={{backgroundColor: '#B2533E'}}>Cancel</button>
                    <button className='btn-mod fw-bold' onClick={()=>handleFormSubmit(handleClose())} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}