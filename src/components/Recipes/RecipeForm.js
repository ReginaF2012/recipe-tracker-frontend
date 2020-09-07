import React from 'react';
import { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

class RecipeForm extends Component{

    state = {
        name: '',
        summary: '',
        servings: 0,
        prep_time: '',
        cook_time: '',
        ingredients_attributes: []
    }

    render(){
        if(!this.props.user.id){
            return (<Redirect to="/login"/>)
        }else{
        return(
            <Container>
                <Form>
                    <h1>New Recipe Form</h1>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Recipe Name" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Summary</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Write a brief summary" />
                    </Form.Group>
                    <h2>Ingredients</h2>
                    <Form.Group>
                        <Form.Label>Ingredient Name</Form.Label>
                        <Form.Control type="text" placeholder="Name of Ingredient"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" placeholder="Amount of Ingredient"/>
                    </Form.Group>
                    <Button>Add Another Ingredient</Button>
                </Form>
            </Container>
        )}
    }
}

const mapStateToProps = (state) => {
    console.log('MSTP', state)
    return {user: state.user}
}

export default connect(mapStateToProps)(RecipeForm)