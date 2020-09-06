import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function Recipe(props){
    console.log(props)
       return (
        <Card key={props.id} >
            <Card.Img variant="top" style={{width: "30%"}} alt={`${props.name} image`} src={props.image_url} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.summary}
                </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}