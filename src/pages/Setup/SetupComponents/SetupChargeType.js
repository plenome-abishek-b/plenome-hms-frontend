import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

// i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"
import SetupChargeTypeDialog from "../SetupDialog/SetupChargeTypeDialog"

// redux

const SetupChargeType = (props) => {

    const initialValue = {
        charge_type_id: '',
        is_default: 'no',
        is_active: 'yes',
        created_at: '2023-06-07 11:11:11'
    }

const [open, setOpen] = useState(false);
const [tableData, setTableData] = useState(null)
const [formData, setFormData] = useState(initialValue)

  const columnDefs = [
    { headerName: "Charge Type", field: "charge_type" },
    { headerName: "Appointment", field: "appointment" },
    { headerName: "OPD", field: "opd" },
    { headerName: "IPD", field: "ipd"  },
    { headerName: "Pathology", field: "pathology"  },
    { headerName: "Radiology", field: "radiology" },
    { headerName: "Blood Bank", field: "bloodbank"  },
    { headerName: "Ambulance", field: "ambulance" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    // getUsers from json
    chargeTypes()
  }, [])

  const chargeTypes = () => {
    api.getChargeType().then(res => setTableData(res.data))
    api.http
  }

  const handleFormSubmit = () => {
    api.postSetupChargeType(formData).then(resp => {
     console.log(resp)
    })

    api
      .getChargeType({ headers: { "content-type": "application/json" } })
      .then(resp => {
        chargeTypes()
        setFormData(initialValue)
        preventDefault()
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Charge Type List</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-primary bg-soft" onClick={handleOpen}>
                  <i className="fa fa-plus"></i>&nbsp; Add Charge Type
                </button>
              </div>
              <SetupChargeTypeDialog open={open} handleClose={handleClose} onChange={onChange} handleFormSubmit={handleFormSubmit} data={formData}/>
              <div className="ag-theme-alpine" style={{ height: 500, marginTop: "20px" }}>
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupChargeType)
