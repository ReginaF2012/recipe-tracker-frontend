import React from 'react';
import { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { postRecipe, editRecipe } from '../../actions/recipesActions';


// used this stack overflow https://stackoverflow.com/questions/36512686/react-dynamically-add-input-fields-to-form to figure out dynamic input fields

class RecipeForm extends Component{

    isEdit = !!this.props.match.params.id

    state = {  
        user_id: this.props.user.id,
        name: '',
        summary: '',
        servings: 1,
        prep_time: '',
        cook_time: '',
        instructions: [''],
        ingredients_attributes: [{name: '', amount: ''}]      
     }

    componentDidMount(){
        if(this.isEdit){
            let recipes = this.props.recipes
            let id = this.props.match.params.id
            const recipe = recipes.find(recipe => recipe.id === parseInt(id))
            this.setState({...recipe, instructions: recipe.instructions.split('\n'),ingredients_attributes: recipe.ingredients.map(ingredient => {
                return {name: ingredient.name, amount: ingredient.recipes_ingredients[0].amount}
                })
            })
        }
    }

    renderRemoveIngredientButton = (index) => {
        return this.state.ingredients_attributes.length > 1 && (
            <Button onClick={this.removeIngredient} id={`ingredient-index-${index}`} variant="danger" size="sm" style={{
                marginLeft: "15px",
                float: "right",
                lineHeight: "20px",
                cursor: "pointer",
                transition:" 0.3s",
              }}>&times; Remove</Button>
        )
    }

    renderRemoveInstructionButton = (index) => {
        return this.state.instructions.length > 1 && (
            <Button onClick={this.removeInstruction} id={`instruction-index-${index}`} variant="danger" size="sm" style={{
                marginLeft: "15px",
                float: "right",
                lineHeight: "20px",
                cursor: "pointer",
                transition:" 0.3s",
              }}>&times; Remove</Button>
        )
    }



    addIngredientInput = () => {
        this.setState(prevState => ({...prevState, ingredients_attributes: [...prevState.ingredients_attributes, {name: '', amount: ''}]}))
    }

    removeInstruction = (event) => {
        let index = parseInt(event.target.id.split('-')[2])
        let instructions = [...this.state.instructions]
        instructions.splice(index, 1)

        this.setState({...this.state, instructions})

    }

    instructionOnChange = (event) => {
        event.persist()
        let index = event.target.name
        let instructions = this.state.instructions
        instructions[index] = event.target.value
        this.setState({instructions})
    }

    addInstructionsInput = () => {
        this.setState(prevState => ({...prevState, instructions: [...prevState.instructions, '']}))
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
        let index = parseInt(event.target.id.split('-')[2])
        let ingredients_attributes = [...this.state.ingredients_attributes]
        ingredients_attributes.splice(index, 1)
        this.setState({...this.state, ingredients_attributes})

    }

    handleSubmit = (event) => {
        event.preventDefault()
        const recipe = {recipe: {...this.state, instructions: this.state.instructions.join('\n')}}
       
        this.isEdit ? this.props.editRecipe(recipe, this.props) : this.props.addRecipe(recipe, this.props)
    }

    renderIngredientInputs = () => {
        
        return (
            <>
                {this.state.ingredients_attributes.map((ingredient, index) => {
                    return (
                    <Fragment key={`ingredient-${index+1}`}>
                    <Form.Group key={`ingredient-name-${index}`}>
                        {this.renderRemoveIngredientButton(index)}
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

    renderInstructionInputs = () => {
        return(
        <Fragment>
            {this.state.instructions.map((step, index) => {
                return (
                    <Fragment key={`instruction-${index+1}`}>
                        {this.renderRemoveInstructionButton()}
                        <Form.Group key={`step-${index+1}`}>
                            <Form.Label>Step {index+1}</Form.Label>
                            <Form.Control type="text" value={step} onChange={this.instructionOnChange} name={index}/>
                        </Form.Group>
                    </Fragment>
                )
            })}
        </Fragment>
        )
    }

    render(){
        if(!this.props.user.id){
            return (<Redirect to="/login"/>)
        }else{
        return(
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <h1>Recipe Form</h1>
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
                    {this.renderInstructionInputs()}
                    <Button onClick={this.addInstructionsInput}>Add Another Step</Button>
                    <br></br><br></br><br></br>
                    <Button type="Submit">{this.isEdit ? "Edit Recipe" : "Add Recipe"}</Button>
                </Form>
            </Container>
        )}
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        recipes: state.recipes
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        addRecipe: (recipe, ownProps) => dispatch(postRecipe(recipe, ownProps)),
        editRecipe: (recipe, ownProps) => dispatch(editRecipe(recipe, ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm)