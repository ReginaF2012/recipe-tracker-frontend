import React from 'react';
import { Component } from 'react';
import Alert from './Alert';
import { connect } from 'react-redux';


class Alerts extends Component{
     renderAlerts = (alerts) => {
         return alerts.length > 0 && (
        alerts.map((alert, index) => {
            return < Alert key={`alert-${index+1}`} alert={alert} />
        })
    )}

    render(){
        return <>{this.renderAlerts(this.props.alerts)}</>
    }
}

const mapStateToProps = (state) => {
    return {
        alerts: [...state.alerts]
    }
}

export default connect(mapStateToProps)(Alerts)