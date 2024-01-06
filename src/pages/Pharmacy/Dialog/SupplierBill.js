import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Row, Col, Container } from "reactstrap"
import { TextField } from "@material-ui/core"

export default function SupplierbillDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  var [date, setDate] = useState(new Date())

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  })
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-white fw-bold"
          style={{ backgroundColor: "#6070FF" }}
        >
          Bill No
        </DialogTitle>
        <DialogContent className="mt-2">
          <h4 className="mt-3">Bill No</h4>
          <p
            className="text-dark fw-bold fs-5"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            Purchase Date & Time&nbsp;
            {date.toLocaleTimeString()}&nbsp;
            {date.toLocaleDateString()}
          </p>
          <br />
          <div className="container">
            <Row>
              <Col lg="12">
                <Row>
                  <Col lg="4" md="4">
                    <label>Medicine Category <span className="text-danger">*</span></label>
                    <br />
                    <select
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="medicine_category"
                      value={data.medicine_category}
                      onChange={e => onChange(e)}
                    >
                      <option>Select</option>
                      <option value="tablet">Tablet</option>
                    </select>
                  </Col>
                  <Col lg="4" md="4">
                    <label>Medicine Name <span className="text-danger">*</span></label>
                    <br />
                    <select
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="medicine_name"
                      value={data.medicine_name}
                      onChange={e => onChange(e)}
                    >
                      <option>Select</option>
                      <option value="Azithromycin">Azithromycin</option>
                    </select>
                  </Col>
                  <Col lg="4" md="4">
                    <label>Batch No <span className="text-danger">*</span></label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="medicine_batch_detail_id"
                      value={data.medicine_batch_detail_id}
                      onChange={e => onChange(e)}
                      type="number"
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="4" md="4">
                    <label>Expiry Date <span className="text-danger">*</span></label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      type="date"
                    ></input>
                  </Col>
                  <Col lg="4" md="4">
                    <label>MRP(₹) <span className="text-danger">*</span></label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      type="number"
                    ></input>
                  </Col>
                  <Col lg="4" md="4">
                    <label>Batch Amount(₹)</label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="amount"
                      value={data.amount}
                      onChange={e => onChange(e)}
                      type="number"
                    ></input>
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col lg="4" md="4">
                    <label>Sales Price(₹) <span className="text-danger">*</span></label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="sale_price"
                      value={data.sale_price}
                      onChange={e => onChange(e)}
                      type="number"
                    ></input>
                  </Col>
                  <Col lg="4" md="4">
                    <label>Packing Qty</label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      type="number"
                    ></input>
                  </Col>
                  <Col lg="4" md="4">
                    <label>Quantity <span className="text-danger">*</span></label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="quantity"
                      value={data.quantity}
                      onChange={e => onChange(e)}
                      type="number"
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="4" md="3">
                    <label>Bill Basic ID</label>
                    <br />
                    <input
                      id="pharmacy_bill_basic_id"
                      value={data.pharmacy_bill_basic_id}
                      onChange={e => onChange(e)}
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      type="number"
                    ></input>
                  </Col>
                  <Col lg="4" md="3">
                    <label>Bill No</label>
                    <br />
                    <input
                      id="invoice_no"
                      value={data.invoice_no}
                      onChange={e => onChange(e)}
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      type="number"
                    ></input>
                  </Col>
                  <Col lg="4" md="4">
                    <label>Purchase Price(₹) <span className="text-danger">*</span></label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      type="number"
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="4" md="4">
                    <label>Tax <span className="text-danger">*</span></label>
                    <br />
                    <input
                      placeholder="%"
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="tax_percentage"
                      onChange={e => onChange(e)}
                      value={data.tax_percentage}
                      type="number"
                    ></input>
                  </Col>
                  <Col lg="4" md="4">
                    <label>Amount(₹) <span className="text-danger">*</span></label>
                    <br />
                    <input
                      placeholder=""
                      style={{
                        width: "90%",
                        height: "25px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                      id="net_amount"
                      value={data.net_amount}
                      onChange={e => onChange(e)}
                      type="number"
                    ></input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="12">
                    <label>Note</label>
                    <br />
                    <textarea
                      maxLength="infinity"
                      style={{
                        width: "100%",
                        height: "55px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                      }}
                    ></textarea>
                    <br />
                    <br />
                  </Col>

                  <br />
                  <Container style={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '5px'}} className="p-4">
                    <Row className="ms-2">
                      <Col lg="3">
                        <label>Total(₹)</label>
                      </Col>
                      <Col lg="7">
                        <input
                          className="ms-3"
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            width: "100%",
                            textAlign: "end",
                            borderRadius: '5px'
                          }}
                          placeholder="0"
                          id="total"
                          value={data.total}
                          onChange={e => onChange(e)}
                          type="number"
                        ></input>
                      </Col>
                    </Row>
                    <br />
                    <Row className="ms-2">
                      <Col lg="3">
                        <label>Discount(₹)</label>
                      </Col>
                      <Col lg="7">
                        <input
                          className="ms-3"
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            width: "100%",
                            textAlign: "end",
                            borderRadius: '5px'
                          }}
                          placeholder="0"
                          id="discount"
                          value={data.discount}
                          onChange={e => onChange(e)}
                          type="number"
                        ></input>
                      </Col>
                    </Row>
                    <br />
                    <Row className="ms-2">
                      <Col lg="3">
                        <label>Tax(₹)</label>
                      </Col>
                      <Col lg="7">
                        <input
                          className="ms-3"
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            width: "100%",
                            textAlign: "end",
                            borderRadius: '5px'
                          }}
                          placeholder="0"
                          id="tax"
                          value={data.tax}
                          onChange={e => onChange(e)}
                          type="number"
                        ></input>
                      </Col>
                    </Row>
                    <br />
                    <Row className="ms-2">
                      <Col lg="3">
                        <label>Net Amount(₹)</label>
                      </Col>
                      <Col lg="7">
                        <input
                          className="ms-3"
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            width: "100%",
                            textAlign: "end",
                            borderRadius: '5px'
                          }}
                          placeholder="0"
                          id="net_amount"
                          value={data.net_amount}
                          onChange={e => onChange(e)}
                          type="number"
                        ></input>
                      </Col>
                    </Row>
                    <br />
                    <Row></Row>
                    <Row>
                      <Col lg='12'>
                        <label>Payment Mode</label>
                        <br />
                        <select style={{width: '100%', height: '30px', borderRadius: '5px',border: '1px solid grey'}}>
                          <option>Cash</option>
                          <option>UPI</option>
                          <option>Bank Transfer</option>
                          <option>Cheque</option>
                          <option>Online</option>
                        </select>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col lg='12'>
                        <label>Payment Amount(₹)</label>
                        <br />
                        <input style={{width: '100%', height: '30px', borderRadius: '5px',border: '1px solid grey'}}></input>
                      </Col>
                    </Row>

                    <br />
                    <Row>
                      <Col lg='12'>
                        <label>Payment Note</label>
                        <br />
                        <textarea
                          style={{width: '100%', height: '30px', borderRadius: '5px',border: '1px solid grey'}}
                        ></textarea>
                      </Col>
                    </Row>
                  </Container>
                  <div className="mt-4">
                    <button className="btn-mod bg-soft fw-bold">
                      Calculate
                    </button>
                  </div>
                </Row>

                <br />
                <Row></Row>
              </Col>
            </Row>

            <br />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod fw-bold"
            onClick={() => handleFormSubmit(handleClose())}
            autoFocus
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
