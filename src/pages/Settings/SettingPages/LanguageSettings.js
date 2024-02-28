import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  CardTitle,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  CardText,
} from "reactstrap"

import { Link, withRouter } from "react-router-dom"

import classnames from "classnames"

const Languagesettings = () => {

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Language Settings</h4>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Languagesettings)
