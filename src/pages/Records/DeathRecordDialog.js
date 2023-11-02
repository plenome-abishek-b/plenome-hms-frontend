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
            >
                <DialogTitle id="alert-dialog-title">
                    Add Death Details
                </DialogTitle>
                <DialogContent>
                    <Row>
                        <Col lg='3' md='3' sm='12'>
                            <label>Case ID</label>
                            <br />
                            <input style={{width: '100%', height: '30px'}} value={data.case_reference_id} id="case_reference_id" onChange={e=>onChange(e)} ></input>
                        </Col>
                        <Col lg='3' md='3' sm='12'>
                            <label>Patient Name</label>
                            <br />
                            <input style={{width: '100%', height: '30px'}}  ></input>
                        </Col>
                        <Col lg='3' md='3' sm='12'>
                            <label>Death Date</label>
                            <br />
                            <input style={{width: '100%', height: '30px'}}  value={data.death_date} id="death_date" onChange={e=>onChange(e)}></input>
                        </Col>
                        <Col lg='3' md='3' sm='12'>
                            <label>Guardian Name</label>
                            <br />
                            <input style={{width: '100%', height: '30px'}} value={data.guardian_name} id="guardian_name" onChange={e=>onChange(e)} ></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col lg='6' md='6' sm='12'>
                            <label>Attachment</label>
                            <br />
                            <TextField id="file" size="small" type="file" value={data.attachment} onChange={e=>onChange(e)} />
                        </Col>
                        <Col lg='6' md='6' sm='12'>
                            <label>Report</label>
                            <br />
                            <textarea rows={3} style={{width: '100%'}} value={data.death_report} id="death_report" onChange={e=>onChange(e)} ></textarea>
                        </Col>
                    </Row>
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-danger' onClick={handleClose}>Cancel</button>
                    <button className='btn btn-primary' onClick={() => handleFormSubmit()} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}