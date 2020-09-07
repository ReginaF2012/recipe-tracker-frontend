import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Container, Alert} from 'react-bootstrap';
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

    renderAlerts = () => {
        return !!this.props.user.alerts && <Alert variant="danger">{this.props.user.alerts}</Alert>
    }
    render(){
        console.log(this.props)
        if(!this.props.user.id){
        return (
            <Container>
                {this.renderAlerts()}
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
                return ( <>{this.props.history.push(`/users/${this.props.user.id}/recipes`)}</>)
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