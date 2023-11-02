import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";
import SidebarContentDoctor from "./SidebarContentDoctor";
import { Link } from "react-router-dom";
import logo from "Plenome_logo.png";
import { useSelector } from "react-redux";

const Sidebar = ( props ) => {
  // console.log(props, "userRole");
  const userRole = props;
  // console.log(userRole,'user Role')
  // const { USER } = useSelector((state) => state.authReducer);
  // console.log(USER,"fufuf") 

  const isUserAdmin = userRole === "Super Admin";
  const isUserDoctor = userRole === "Doctor";
  // Add more role checks as needed

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/">
            <span className="logo-lg"></span>
          </Link>

          <a href="http://plenome.com/" className="logo logo-light">
            <span className="logo-lg">
              <h3 style={{ color: "white", marginTop: "25px" }} className="ms-1">BlockTrack</h3>
            </span>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "40px",
                height: "40px",
                position: "fixed",
                left: "1%",
                top: "2%",
              }}
            ></img>
          </a>
        </div>
        <div data-simplebar className="h-100">
          {isUserAdmin && <SidebarContent />} {/* Show admin-specific content */}
          {isUserDoctor && <SidebarContentDoctor />} {/* Show doctor-specific content */}
          {/* Add more role-specific content as needed */}
          {!isUserAdmin && !isUserDoctor && <SidebarContent />} {/* Show default content for other roles */}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
    userRole: state.login && state.login.userRole, // Add a check for undefined auth object and role property
  };
};


export default connect(mapStateToProps, {})(withRouter(withTranslation()(Sidebar)));
