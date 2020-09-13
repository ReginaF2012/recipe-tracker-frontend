import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Button } from 'react-bootstrap';

export default function RecipeCards(props){
       return (
        <Card key={props.id} className="text-center recipe-card">
            <Card.Img variant="top" alt={`${props.name} image`} src={props.image_url} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <div className="card-summary-container">
                    <Card.Text >
                        {props.summary}
                    </Card.Text>  
                </div>
                
            < LinkContainer to={`/recipes/${props.id}`}>
                <Button  className="center-bottom-button" variant="primary">See Recipe</Button>
            </LinkContainer>
            </Card.Body>
        </Card>
    )
}