import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Row, Col } from "reactstrap";
import { TextField } from "@mui/material";
import TextArea from "antd/es/input/TextArea";

export default function DownloadDialog({ open, handleClose , data,
    onChange,
    handleFormSubmit }) {


        const [openDialog, setOpenDialog] = React.useState(false)

  const handleClickOpen = () => {
    //dialog open
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    //dialog close
    setOpenDialog(false)
  }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Add File Details</DialogTitle>
                <DialogContent>
                    <br />
                    <Row>
                        <Col>
                            <TextField label="Content Title"  size="small" id="title" value={data.title} onChange={e=>onChange(e)}/>
                        </Col>
                        <Col>
                            <TextField label="Content Type"  size="small" id="type" value={data.type} onChange={e=>onChange(e)}/>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <input
                            id="date"
                            className="form-control date"
                            placeholder
                            type="date"
                            size="small"
                            value={data.date} onChange={e=>onChange(e)}
                        />
                    </Row>
                    <br />
                    <Row>
                        <label>Content File</label>
                        <TextField id="file" size="small" type="file"  value={data.file} onChange={e=>onChange(e)}/>
                    </Row>
                    <br />
                    <Row>
                        <TextArea 
                            rows={3}
                            placeholder='Description'
                            id="note" 
                            value={data.note} onChange={e=>onChange(e)}
                        />
                    </Row>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-danger" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn-mod" onClick={() => handleFormSubmit()} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
