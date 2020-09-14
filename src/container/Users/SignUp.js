import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/usersActions';
import UserAuthForm from '../../components/Users/UserAuthForm';

class Login extends Component{
    state = {
        user: {
            username: '', 
            email: '', 
            password: ''
        },
        
        isLogin: false
    }

    handleOnChange = (event) => {
        this.setState({user: {...this.state.user, [event.target.name]: event.target.value}})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let user = {...this.state.user}
        this.props.signUpUser(user)
    }

    render(){
        return (
            <UserAuthForm signUpUser={this.props.signUpUser} user={this.state.user} handleOnChange={this.handleOnChange} handleSubmit={this.handleSubmit} isLogin={this.state.isLogin}/>
        )
    }
        
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUpUser: (user) => dispatch(signUpUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)