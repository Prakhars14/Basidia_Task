import { Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField } from '@material-ui/core';
import React, {Component} from 'react'
import { Container, Row, Col, Card } from 'reactstrap';
import signin from '../assets/signin-image.webp';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { withRouter } from 'react-router-dom';

//here
class Signin extends Component{
    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          errors: {}
        };
      }

      componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
      }
      componentWillReceiveProps(nextProps) {
        console.log("yha",nextProps);
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/home"); // push user to dashboard when they login
        }
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
        
            const userData = {
              email: this.state.email,
              password: this.state.password
            };
            this.props.loginUser(userData, this.props.history);
          };
    render(){
        const { errors } = this.state;
    return (
        <>
        <div className="bg-light p-5">
            <Container className="p-5">
                <Card className="cardhover">
                <Row>
                    <Col lg={6} className="p-5">
                        <img src={signin} alt=""  height="450" width="100%"   className="d-flex justify-content-center"/>
                        <a href="/signup" className="d-flex justify-content-center">Create an account</a>
                    </Col>
                    <Col lg={6}  className="mt-2 pt-5">
                        <h1 className="d-flex justify-content-center pt-5 pb-3">Sign up</h1>
                        <div>
                            <Grid container spacing={1} alignItems="flex-end"  className="d-flex justify-content-center">
                            <Grid item>
                            <span class="material-icons">person</span>
                            </Grid>
                            <Grid item>
                                <TextField size="medium" onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email" label="Your Email" />
                            </Grid>
                            </Grid>
                            <span className="red-text">
                            {errors.email}
                            {errors.emailnotfound}
                            </span>
                        </div>
                        <div>
                            <Grid container spacing={1} alignItems="flex-end"  className="d-flex justify-content-center">
                            <Grid item>
                            <span class="material-icons">lock</span>
                            </Grid>
                            <Grid item>
                                <TextField sixe="medium" onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password" label="Password" />
                            </Grid>
                            </Grid>
                            <span className="red-text">
                            {errors.password}
                            {errors.passwordincorrect}
                            </span>
                        </div>
                        <FormGroup aria-label="position" row  className="d-flex m-3 justify-content-center">
                        <FormControlLabel
                            value="end"
                            control={<Checkbox color="primary" />}
                            label="Remember me"
                            labelPlacement="end"
                            />
                        </FormGroup>
                        <div className="d-flex justify-content-center">
                        <Button variant="contained" color="primary" onClick={this.onSubmit}>Log in</Button>
                        </div>
                            <div class="mt-5 mb-5 footer-social-icon d-flex justify-content-center">
                                <span>Or login with &nbsp; 
                                <a href="#"><i class="fab fa-facebook-f facebook-bg"></i></a>
                                <a href="#"><i class="fab fa-twitter twitter-bg"></i></a></span>
                                <a href="#"><i class="fab fa-google-plus-g google-bg"></i></a>
                            </div>
                            
                            
                    </Col>
                </Row>
                </Card>
            </Container>
        </div>
        </>
    )
}
}

Signin.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps,{loginUser})(withRouter(Signin));
