import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { loginUser, signUpUser } from '../../actions/usersActions';

class LoginSignupForm extends Component{

    isLogin = () => {
        return this.props.match.url === "/login"
    }

    state = {username: '', email: '', password: '', password_confirmation: ''}

    handleOnChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let user = {...this.state}
        this.isLogin() ? this.props.loginUser(user) : this.props.signUpUser(user)
        this.setState({username: '', email: '', password: '', password_confirmation: ''})
    }

    renderPassConf = () => {
        return (
            <Form.Group>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" value={this.state.password_confirmation} name="password_confirmation" onChange={this.handleOnChange} placeholder="Enter Password Confirmation"/>
            </Form.Group>
        )
    }


    render(){
        return (
            <Container>
                <h1>{this.isLogin() ? "Login" : "Sign Up"}</h1>
                <Form onSubmit={this.handleSubmit} id="login-form">
                    <Form.Group>

                        <Form.Label>Username</Form.Label>
                        <Form.Control required onChange={this.handleOnChange} type="text" placeholder="Enter Username" name="username" value={this.state.username}/>
                        <Form.Text id="passwordHelpBlock" muted>
                             Must be 3-20 characters long.
                             Contain only letters, numbers, and underscores.
                        </Form.Text>

                    </Form.Group>
                    <Form.Group >

                        <Form.Label>Email address</Form.Label>
                        <Form.Control required onChange={this.handleOnChange} type="email" name="email" value={this.state.email} placeholder="Enter email" />

                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control required onChange={this.handleOnChange} type="password" name="password" value={this.state.password} placeholder="Password" />
                        <Form.Text id="passwordHelpBlock" muted>
                             Must be 8-20 characters long.
                             Contain 1 capital letter.
                             Contain 1 lowercase letter.
                             Contain 1 Symbol.
                        </Form.Text>
                    </Form.Group>
                    { !this.isLogin() && this.renderPassConf()}

                    <Button variant="primary" type="submit">
                           { this.isLogin() ? "Login" : "Sign Up"}
                    </Button>
                </Form>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (userObj) => {dispatch(loginUser(userObj))},
        signUpUser: (userObj) => {dispatch(signUpUser(userObj))}
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        alerts: state.alerts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupForm)