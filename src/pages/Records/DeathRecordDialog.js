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

export default function DeathDialog({ open, handleClose , data,onChange,
    handleFormSubmit}) {




    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='md'
            >
                <DialogTitle id="alert-dialog-title" className="text-white fw-bold" style={{backgroundColor: '#6070FF', height: '60px'}}>
                    Add Death Details
                </DialogTitle>
                <DialogContent style={{paddingTop: '20px'}}>
                    <Row>
                        <Col lg='6' md='6' sm='12'>
                            <label>Case ID <span className="text-danger">*</span><span className="text-danger">*</span></label>
                            <br />
                            <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.case_reference_id} id="case_reference_id" onChange={e=>onChange(e)} ></input>
                        </Col>
                        <Col lg='6' md='6' sm='12'>
                            <label>Patient Name <span className="text-danger">*</span></label>
                            <br />
                            <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}  ></input>
                        </Col>
                        
                    </Row>
                    <br />
                    <Row>
                    <Col lg='6' md='6' sm='12'>
                            <label>Death Date <span className="text-danger">*</span></label>
                            <br />
                            <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}}  value={data.death_date} id="death_date" onChange={e=>onChange(e)}></input>
                        </Col>
                        <Col lg='6' md='6' sm='12'>
                            <label>Guardian Name <span className="text-danger">*</span></label>
                            <br />
                            <input style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.guardian_name} id="guardian_name" onChange={e=>onChange(e)} ></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col lg='6' md='6' sm='12'>
                            <label>Attachment</label>
                            <br />
                            <input id="file" size="small" type="file" value={data.attachment} onChange={e=>onChange(e)} style={{width: '100%', height: '30px' ,borderRadius: '5px'}} />
                        </Col>
                        <Col lg='6' md='6' sm='12'>
                            <label>Report</label>
                            <br />
                            <textarea rows={3} style={{width: '100%', height: '30px' ,borderRadius: '5px', border: "1px solid grey"}} value={data.death_report} id="death_report" onChange={e=>onChange(e)} ></textarea>
                        </Col>
                    </Row>
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <button className='btn btn-danger fw-bold' style={{backgroundColor: "#B2533E"}} onClick={handleClose}>Cancel</button>
                    <button className='btn-mod fw-bold' onClick={() => handleFormSubmit()} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}