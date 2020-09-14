import React from 'react';
import { Button } from 'react-bootstrap';


// button with specific styling for removing dynamic inputs
export default function RemoveButton({callback, index}){
    return (
        <Button onClick={callback} name={index} id={`remove-instruction-index-${index+1}`} variant="danger" size="sm" className="remove-button">
             &times; Remove
        </Button>
    )
}