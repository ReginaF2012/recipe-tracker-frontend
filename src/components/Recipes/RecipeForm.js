import React from 'react';
import { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { postRecipe } from '../../actions/recipesActions';


// used this stack overflow https://stackoverflow.com/questions/36512686/react-dynamically-add-input-fields-to-form to figure out dynamic input fields

class RecipeForm extends Component{

    state = {
        user_id: this.props.user.id,
        name: '',
        summary: '',
        servings: 1,
        prep_time: '',
        cook_time: '',
        instructions: '',
        ingredients_attributes: [{name: '', amount: ''}]
    }
    
    addIngredientInput = () => {
        this.setState(prevState => ({...prevState, ingredients_attributes: [...prevState.ingredients_attributes, {name: '', amount: ''}]}))
    }

    ingredientOnChange = (event) => {
        event.persist()
        let index = parseInt(event.target.id.split('-')[3])
        let ingredients_attributes = [...this.state.ingredients_attributes]
        ingredients_attributes[index] = { ...ingredients_attributes[index], [event.target.name]: event.target.value}
        this.setState({...this.state, ingredients_attributes})
    }

    recipeOnChange = (event) => {
        event.persist()
        this.setState({[event.target.name]: event.target.value})
    }

    removeIngredient = (event) => {
        event.preventDefault()
        let index = parseInt(event.target.id.split('-')[2])
        let ingredients_attributes = [
            ...this.state.ingredients_attributes.slice(0, index),
            ...this.state.ingredients_attributes.slice(index + 1)
          ]

        this.setState({...this.state, ingredients_attributes})

    }

    handleSubmit = (event) => {
        event.preventDefault()
        const recipe = {recipe: this.state}
        this.props.addRecipe(recipe, this.props)
    }

    renderIngredientInputs = () => {
        return (
            <>
                {this.state.ingredients_attributes.map((ingredient, index) => {
                    return (
                    <Fragment key={index}>
                    <Form.Group key={`ingredient-name-${index}`}>
                        {this.state.ingredients_attributes.length > 1 && (
                            <Button onClick={this.removeIngredient} id={`ingredient-index-${index}`} variant="danger" size="sm" style={{
                                marginLeft: "15px",
                                float: "right",
                                lineHeight: "20px",
                                cursor: "pointer",
                                transition:" 0.3s",
                              }}>&times; Remove</Button>
                        )}
                        <Form.Label>Ingredient Name</Form.Label>
                        <Form.Control required type="text" onChange={this.ingredientOnChange} id={`ingredient-name-input-${index}`} name="name" value={ingredient.name} placeholder="Name of Ingredient"/>
                    </Form.Group>
                    <Form.Group key={`ingredient-amount-${index}`}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control required type="text" onChange={this.ingredientOnChange} id={`ingredient-value-input-${index}`} name="amount" value={ingredient.amount} placeholder="Amount of Ingredient"/>
                    </Form.Group>
                    </Fragment>
                    )
                })}
            </>
        )
    }

    render(){
        if(!this.props.user.id){
            return (<Redirect to="/login"/>)
        }else{
        return(
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <h1>New Recipe Form</h1>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" name="name" value={this.state.name} onChange={this.recipeOnChange} placeholder="Enter Recipe Name" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Summary</Form.Label>
                        <Form.Control required as="textarea" rows="3" name="summary" value={this.state.summary} onChange={this.recipeOnChange} placeholder="Write a brief summary" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Prep Time</Form.Label>
                        <Form.Control required type="text" name="prep_time" value={this.state.prep_time} onChange={this.recipeOnChange} placeholder="Enter Prep Time"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cook Time</Form.Label>
                        <Form.Control required type="text" name="cook_time" value={this.state.cook_time} onChange={this.recipeOnChange} placeholder="Enter Cook Time"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Servings</Form.Label>
                        <Form.Control required type="number" min={1} name="servings" value={this.state.servings} onChange={this.recipeOnChange} />
                    </Form.Group>
                    <h2>Ingredients</h2>
                    {this.renderIngredientInputs()}
                    <Button onClick={this.addIngredientInput}>Add Another Ingredient</Button>
                    <br></br><br></br><br></br>
                    <h2>Instructions</h2>
                    
                    <Form.Group>
                        <Form.Control as="textarea" rows="3" name="instructions" value={this.state.instructions} onChange={this.recipeOnChange} placeholder="Write Instructions" />
                    </Form.Group>
                    <Button type="Submit">Add Recipe</Button>
                </Form>
            </Container>
        )}
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        alerts: state.alerts
    }
}

const mapDispatchToProps = (dispatch) => {
    return { addRecipe: (recipe, ownProps) => dispatch(postRecipe(recipe, ownProps))}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm)