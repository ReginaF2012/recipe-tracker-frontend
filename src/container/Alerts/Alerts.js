import React from 'react';
import Alert from '../../components/Alerts/Alert';

// container component for alerts
export default function Alerts({alerts}){
    return (
        alerts.map((alert, index) => {
            return < Alert key={`alert-${index+1}`} alert={alert} />
        })
    )
}
