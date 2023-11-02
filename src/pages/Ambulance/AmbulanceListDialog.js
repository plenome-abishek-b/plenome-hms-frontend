import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Row, Col, Container } from 'reactstrap';
import { TextField } from '@mui/material';

export default function AmbulanceListDialog({ open, handleClose }) {


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Add Ambulance
                </DialogTitle>
                <DialogContent>
                 <Container>
                    <Row>
                        <Col lg='4' md='4' sm='12'>
                            <label>Vehicle Number</label>
                            <br />
                            <input style={{width: '100%', height: '30px'}}></input>
                        </Col>
                        <Col lg='4' md='4' sm='12'>
                            <label>Vehicle Model</label>
                            <br />
                            <input style={{width: '100%', height: '30px'}}></input>
                        </Col>
                        <Col lg='4' md='4' sm='12'>
                            <label>Year Made</label>
                            <br />
                            <input style={{width: '100%', height: '30px'}}></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col lg='4' md='4' sm='12'>
                            <label>Driver Name</label>
                            <br />
                            <input style={{width: '100%', height: '30px'}}></input>
                        </Col>
                        <Col lg='4' md='4' sm='12'>
                            <label>Driver License</label>
                            <br />
                            <input style={{width: '100%', height: '30px'}}></input>
                        </Col>
                        <Col lg='4' md='4' sm='12'>
                            <label>Driver Contact</label>
                            <br />
                            <input style={{width: '100%', height: '30px'}}></input>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col lg='4' md='4' sm='12'>
                        <label>Vehicle Type</label>
                        <br />
                        <select style={{width: '100%', height: '30px'}}>
                            <option>select</option>
                            <option>Owned</option>
                            <option>Contractual</option>
                        </select>
                        </Col>
                        <Col lg='8' md='8' sm='12'>
                            <label>Note</label>
                            <br />
                            <textarea rows={3} style={{width: '100%'}}></textarea>
                        </Col>
                    </Row>
                 </Container>
                </DialogContent>
                <br />
                <DialogActions>
                    <button className='btn btn-danger' onClick={handleClose}>Cancel</button>
                    <button className='btn btn-primary' onClick={handleClose} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}