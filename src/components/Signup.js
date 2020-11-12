import { Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField } from '@material-ui/core';
import React, {Component} from 'react'
import { Container, Row, Col, Card } from 'reactstrap';
import signup from '../assets/signup-image.webp';
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          password: "",
          password2: "",
          errors: {}
        };
      }

      componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
      }
      
      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
      
      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
      
      onSubmit = e => {
        e.preventDefault();
        
        const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
      };
      render(){
        const { errors } = this.state;
    return (
        <>
            <div className="bg-light p-5">
            <Container className="p-5">
                <Card className="cardhover">
                <Row>
                    <Col lg={6}  className="mt-2 pt-5">
                        <h1 className="d-flex justify-content-center pt-5 pb-3">Sign up</h1>
                        <div>
                            <Grid container spacing={1} alignItems="flex-end"  className="d-flex justify-content-center">
                            <Grid item>
                            <span class="material-icons">person</span>
                            </Grid>
                            <Grid item>
                                <TextField size="medium" onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text" label="Your Name" />
                            </Grid>
                            </Grid>
                            <span className="red-text">{errors.name}</span>
                        </div>
                        <div>
                            <Grid container spacing={1} alignItems="flex-end"  className="d-flex justify-content-center">
                            <Grid item>
                            <span class="material-icons">email</span>
                            </Grid>
                            <Grid item>
                                <TextField size="medium" onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email" label="Your Email" />
                            </Grid>
                            </Grid>
                            <span className="red-text">{errors.email}</span>
                        </div>
                        <div>
                            <Grid container spacing={1} alignItems="flex-end"  className="d-flex justify-content-center">
                            <Grid item>
                            <span class="material-icons">lock</span>
                            </Grid>
                            <Grid item>
                                <TextField sixe="medium"                   onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password" label="Password" />
                            </Grid>
                            </Grid>
                            <span className="red-text">{errors.password}</span>
                        </div>
                        <div>
                            <Grid container spacing={1} alignItems="flex-end"  className="d-flex justify-content-center">
                            <Grid item>
                            <span class="material-icons md-light">lock</span>
                            </Grid>
                            <Grid item>
                                <TextField sixe="medium" onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password" label="Repeat your Password" />
                            </Grid>
                            </Grid>
                            <span className="red-text">{errors.password2}</span>
                        </div>
                        <FormGroup aria-label="position" row  className="d-flex m-3 justify-content-center">
                        <FormControlLabel
                            value="end"
                            control={<Checkbox color="primary" />}
                            label="I agree to all statements in Terms of Service"
                            labelPlacement="end"
                            />
                        </FormGroup>
                        <div className="d-flex justify-content-center">
                        <Button variant="contained" color="primary" onClick={this.onSubmit}>Register</Button>
                        </div>
                    </Col>
                    <Col lg={6} className="p-5">
                        <img src={signup} alt=""  height="450" width="100%"   className="d-flex justify-content-center"/>
                        <a href="/signin" className="d-flex justify-content-center">I'm already member</a>
                    </Col>
                </Row>
                </Card>
            </Container>
        </div>
        </>
    )
}
}
Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps,{registerUser})(withRouter(Signup));
