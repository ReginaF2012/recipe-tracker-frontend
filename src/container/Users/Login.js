import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/usersActions';
import UserAuthForm from '../../components/Users/UserAuthForm';

// component to handle login
class Login extends Component{


    state = {
        user: {
            username: '', 
            email: '', 
            password: ''
        },
        
        isLogin: true
    }

    handleOnChange = (event) => {
        this.setState({user: {...this.state.user, [event.target.name]: event.target.value}})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let user = {...this.state.user}
        this.props.loginUser(user)
    }

    render(){
        return (
            <UserAuthForm loginUser={this.props.loginUser} user={this.state.user} handleOnChange={this.handleOnChange} handleSubmit={this.handleSubmit} isLogin={this.state.isLogin}/>
        )
    }
        
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user) => dispatch(loginUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)