import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Row, Col } from 'reactstrap';
import { TextField } from "@material-ui/core";

export default function GeneralDialog({ open, handleClose, data, onChange, handleFormSubmit }) {

    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className='bg-primary bg-soft text-primary'>
                    Register Your Android App Purchase Code
                </DialogTitle>
                <DialogContent className='mt-2'>
                <Row>
                    <label>
                    Envato Market Purchase Code For Smart Hospital Android App ( How to find it? )
                    </label>
                    <br />
                    <input></input>
                </Row>
                <br />
                <Row>
                    <label>
                    Your Email Registered With Envato
                    </label>
                    <br />
                    <input></input>
                </Row>
                </DialogContent>
                <DialogActions>
                    <button className='btn-mod' onClick={handleClose} autoFocus>
                        Save
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}