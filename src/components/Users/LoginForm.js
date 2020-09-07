import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import { loginUser } from '../../actions/usersActions';

class LoginForm extends Component{

    state = {username: '', email: '', password: ''}

    handleOnChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let user = this.state
        this.props.loginUser(user)

        this.setState({username: '', email: '', password: ''})
    }


    render(){
        if(!this.props.user.id){
        return (
            <Container>
                <h1>Login Form</h1>
                <Form onSubmit={this.handleSubmit} id="login-form">
                    <Form.Group>

                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={this.handleOnChange} type="text" placeholder="Enter Username" name="username" value={this.state.username}/>

                    </Form.Group>
                    <Form.Group >

                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={this.handleOnChange} type="email" name="email" value={this.state.email} placeholder="Enter email" />

                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleOnChange} type="password" name="password" value={this.state.password} placeholder="Password" />
                        <Form.Text id="passwordHelpBlock" muted>
                             Must be 8-20 characters long.
                             Contain 1 capital letter.
                             Contain 1 lowercase letter.
                             Contain 1 Symbol.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                            Login
                    </Button>
                </Form>
            </Container>
            )} else {
                return (
                    <Redirect to={`/users/${this.props.user.id}/recipes`}/>
                )
            }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (userObj) => {dispatch(loginUser(userObj))}
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        alerts: state.alerts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)