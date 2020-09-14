import React from 'react';
import { Component } from 'react';
import { Alert } from 'react-bootstrap';


export default class myAlert extends Component {

    state = {hidden: false}
  
    // start the timer when component mounts
    componentDidMount(){
        // assign the timer here so it can be cleared in componentWillUnmount
        // this will hide the alert after 5 seconds
        this.timer = setTimeout(() => (this.setState({hidden: true})), 5000)
    }

    // clear the timer when it unmounts
    componentWillUnmount(){
        clearTimeout(this.timer)
    }
    
    render(){
        return <Alert hidden={this.state.hidden} variant="danger">{this.props.alert}</Alert>
    }


}