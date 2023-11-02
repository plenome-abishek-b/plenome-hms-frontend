import React, { useState } from "react"
import QRCode from "qrcode.react"
import { Row, Col, Card, CardBody } from "reactstrap"

const Generateqr = () => {
  const [hipId, setHipId] = useState("")
  const [counterId, setCounterId] = useState("")

  // Generate the URL
  const url = `https://phrsbx.abdm.gov.in/share-profile?hip-id=${hipId}&counter-id=${counterId}`

  return (
    <div className="account-pages my-5 pt-sm-5 bg-primary bg-soft">
      <Row className="d-flex justify-content-center mt-5">
        <Col lg="7" style={{borderRadius: '10px'}}>
          <Card>
            <div className="bg-primary text-white p-4 fw-bold">
              <h3>Generate QR</h3>
            </div>

            <CardBody>
              <div className="d-flex justify-content-center">
                <Row>
                  <Col>
                    <label className="fw-bold fs-5">Enter HIP ID</label>
                    <br />
                    <input
                      type="text"
                      value={hipId}
                      onChange={e => setHipId(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              <br />
              <div className="d-flex justify-content-center">
                <Row>
                  <Col>
                    <label className="fw-bold fs-5">Enter Counter ID</label>
                    <br />
                    <input
                      type="text"
                      value={counterId}
                      onChange={e => setCounterId(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              <br />
              <div className="d-flex justify-content-center">
                {hipId && counterId && (
                  <div>
                    <QRCode value={url} />
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Generateqr
