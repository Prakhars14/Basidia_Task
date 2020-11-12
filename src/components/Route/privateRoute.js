import React from "react";
import { Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink  } from "reactstrap";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>{

      console.log(auth.isAuthenticated)
      return auth.isAuthenticated === true ? (
        <>
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Task</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/weather">Weather</NavLink>
            </NavItem>            
            <NavItem>
              <NavLink href="/logout">Logout</NavLink>
            </NavItem>
            </Nav>
          </Navbar>
        <Component {...props} /></>
      ) : (
        <Redirect to="/signin" />
      )}
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);