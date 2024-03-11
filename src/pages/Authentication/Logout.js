import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";

import { logoutUser } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

const Logout = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logoutUser(props.history))
  }, [dispatch])
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loginTime');
  return <></>
};


Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Logout);
