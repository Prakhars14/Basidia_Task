import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Logout extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/");
      };
    render(){
        
    return (
        <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-primary" onClick={this.onLogoutClick}>Logout</button>
        </div>
    )
}
}
Logout.propTypes = {
    logoutUser: PropTypes.func.isRequired
  };
  
  export default connect(null,{ logoutUser })(Logout);
