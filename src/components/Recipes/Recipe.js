import { Container, Row, Col, Image } from 'react-bootstrap';
import React from 'react';

export default function Recipe({recipe}){
        return (
        <Container className="text-center">
            <Row>
                <h1>{recipe.name}</h1>
            </Row>
            <Row>
                <Image src={recipe.image_url} alt={recipe.name+' image'} fluid />
            </Row>
            <h3>Summary:</h3>
            <p>{recipe.summary}</p>
            
            <h3>Cook Time: {recipe.cook_time}</h3>
            <h3>Prep Time: {recipe.prep_time}</h3>
            <h3>Servings: {recipe.servings}</h3>
            <h3>Ingredients:</h3>
            <ul>
                {console.log(recipe.ingredients)}
            </ul>
            
        </Container>
    )
}