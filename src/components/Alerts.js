import React from 'react';
import { Alert } from 'react-bootstrap';

const Alerts = ({alerts}) => {
    return alerts.length > 0 && (
        alerts.map((alert, index) => {
            return < Alert key={`alert-${index+1}`} variant="danger" >{alert}</Alert>
        })
    )
}

export default Alerts