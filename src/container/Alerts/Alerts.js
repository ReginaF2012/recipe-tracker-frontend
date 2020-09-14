import React from 'react';
import Alert from '../../components/Alerts/Alert';


export default function Alerts({alerts}){
     const renderAlerts = (alerts) => {
        return alerts.map((alert, index) => {
            return < Alert key={`alert-${index+1}`} alert={alert} />
        })
    }

    return (
        renderAlerts(alerts)
    )
}
