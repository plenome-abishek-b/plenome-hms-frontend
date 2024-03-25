import PropTypes from "prop-types"
import React, { useState } from "react"

import { connect } from "react-redux"
import { Row, Col } from "reactstrap"
import { Link } from "react-router-dom"

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"
import "./styles.css"

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import megamenuImg from "../../assets/images/megamenu-img.png"

// import images
import github from "../../assets/images/brands/github.png"
import bitbucket from "../../assets/images/brands/bitbucket.png"
import dribbble from "../../assets/images/brands/dribbble.png"
import dropbox from "../../assets/images/brands/dropbox.png"
import mail_chimp from "../../assets/images/brands/mail_chimp.png"
import slack from "../../assets/images/brands/slack.png"

import logo from "Plenome_logo.png";

//i18n
import { withTranslation } from "react-i18next"

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions"

const Header = props => {
  const [search, setsearch] = useState(false)
  const [megaMenu, setmegaMenu] = useState(false)
  const [socialDrp, setsocialDrp] = useState(false)

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  function tToggle() {
    var body = document.body
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable")
    } else {
      body.classList.toggle("vertical-collpsed")
      body.classList.toggle("sidebar-enable")
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-md">
                  <img src={logo} alt="" height="22" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle()
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars text-white" />
            </button>

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder={props.t("Search") + "..."}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>

            <Dropdown
              className="dropdown-mega d-none d-lg-block ms-2"
              isOpen={megaMenu}
              toggle={() => {
                setmegaMenu(!megaMenu)
              }}
            >
              <DropdownToggle className="btn header-item text-white" caret tag="button">
                {" "}
                {props.t("Mega Menu")} <i className="mdi mdi-chevron-down text-white" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-megamenu">
                <Row>
                  <Col sm={8}>
                    <Row>
                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("Patient & Services")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="/appointment" className="custom-list">{props.t("Appointment")}</Link>
                          </li>
                          <li>
                            <Link to="/opd" className="custom-list">{props.t("OPD-Out Patient")}</Link>
                          </li>
                          {/* <li>
                            <Link to="/pharmacy" className="custom-list">{props.t("Pharmacy")}</Link>
                          </li>
                          <li>
                            <Link to="/ambulance" className="custom-list">{props.t("Ambulance")}</Link>
                          </li> */}
                        </ul>
                      </Col>

                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("Staffs")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="/hr" className="custom-list">
                              {props.t("Human Resource")}
                            </Link>
                          </li>
                        </ul>
                      </Col>

                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("Finance")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="/income" className="custom-list">{props.t("Income")}</Link>
                          </li>
                          <li>
                            <Link to="/expenses" className="custom-list">{props.t("Expenses")}</Link>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4}>
                    <Row>
                      <Col sm={6}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("Reports")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="/opdreport" className="custom-list">
                              {props.t("OPD Reports")}
                            </Link>
                          </li>
                          <li>
                            <Link to="/ipdreport" className="custom-list">
                              {props.t("Appointment Reports")}
                            </Link>
                          </li>
                          {/* <li>
                            <Link to="pathologyreport" className="custom-list">
                              {props.t("Pathology Reports")}
                            </Link>
                          </li>
                          <li>
                            <Link to="/bloodreport" className="custom-list">
                              {props.t("Blood Issue Reports")}
                            </Link>
                          </li>
                          <li>
                            <Link to="/radiologyreport" className="custom-list">
                              {props.t("Radiology Reports")}
                            </Link>
                          </li> */}
                        </ul>
                      </Col>

                      <Col sm={5}>
                        <div>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/6260/6260435.png"
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search)
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify text-white" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn-mod" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* <LanguageDropdown /> */}

            {/* <div className="d-none d-lg-inline-block ms-1">
              <button 
              className="btn header-item bed-icon"
                data-toggle="fullscreen"
              ><i className="bx bx-bed bx-sm text-white"></i></button>
            </div>

            <div className="d-none d-lg-inline-block ms-1">
              <button 
              className="btn header-item cal-icon"
                data-toggle="fullscreen"
              ><i className="bx bx-calendar bx-sm text-white"></i></button>
            </div>

            <div className="d-none d-lg-inline-block ms-1">
              <button 
              className="btn header-item cal-icon"
                data-toggle="fullscreen"
              ><i className="bx bx-check-square bx-sm text-white"></i></button>
            </div> */}

            {/* <Dropdown
              className="d-none d-lg-inline-block ms-1"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp)
              }}
            >
              <DropdownToggle
                className="btn header-item noti-icon "
                tag="button"
              >
                <i className="fab fa-whatsapp text-white"></i>
              </DropdownToggle>
            </Dropdown> */}

            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen()
                }}
                className="btn header-item noti-icon text-white"
                data-toggle="fullscreen"
                style={{color: "white"}}
              >
                <i className="fas fa-qrcode" style={{color: 'white'}}></i>
              </button>
            </div>

            

            <NotificationDropdown />
            <ProfileMenu />

            <div
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar)
              }}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle text-white"
                style={{color: 'white'}}
              >
                <i className="bx bx-cog bx-spin text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header))
