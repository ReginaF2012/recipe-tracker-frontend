import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Button } from 'react-bootstrap';

export default function RecipeCards(props){
       return (
        <Card key={props.id} className="text-center">
            <Card.Img variant="top" alt={`${props.name} image`} src={props.image_url} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.summary}
                </Card.Text>
            < LinkContainer to={`/recipes/${props.id}`}>
                <Button variant="primary">See Recipe</Button>
            </LinkContainer>
            </Card.Body>
        </Card>
    )
}