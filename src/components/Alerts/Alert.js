import React from 'react';
import { Component } from 'react';
import { Alert } from 'react-bootstrap';


export default class myAlert extends Component {

    state = {hidden: false}
    
    render(){
        setTimeout(() => (this.setState({hidden: true})), 5000)
        return <Alert hidden={this.state.hidden} variant="danger">{this.props.alert}</Alert>
    }

}