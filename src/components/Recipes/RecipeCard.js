import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Button } from 'react-bootstrap';

export default function RecipeCards({recipe}){
       return (
        <Card key={recipe.id} className="text-center recipe-card">
            <Card.Img variant="top" alt={`${recipe.name} image`} src={recipe.image_url} />
            <Card.Body>
                <Card.Title>{recipe.name}</Card.Title>
                <div className="card-summary-container">
                    <Card.Text >
                        {recipe.summary.length < 200 ? recipe.summary : recipe.summary.slice(0, 150)+"..."}
                    </Card.Text>  
                </div>
                
            < LinkContainer to={`/recipes/${recipe.id}`}>
                <Button  className="center-bottom-button" variant="primary">See Recipe</Button>
            </LinkContainer>
            </Card.Body>
        </Card>
    )
}