import React from 'react';
import { Component } from 'react';
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
            return (<>{this.props.history.push('/login')}</>)
        }else{
        return(
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Recipe Name" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Summary</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Write a brief summary" />
                    </Form.Group>
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