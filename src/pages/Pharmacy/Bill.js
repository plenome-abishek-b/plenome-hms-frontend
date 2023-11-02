import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Input } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import { TextField } from "@mui/material";

//redux

const Message = props => {
  var [date, setDate] = useState(new Date())

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  })

  return (
    <React.Fragment>
      <div className="page-content">
       
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Message)
