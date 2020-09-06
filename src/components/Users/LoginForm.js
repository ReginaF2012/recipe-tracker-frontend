import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
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
                    </Form.Group>

                    <Button variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </Container>
            )} else {
                return ( <>{this.props.history.push('/recipes')}</>)
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
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)