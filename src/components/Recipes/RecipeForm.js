import React from 'react';
import { Component, Fragment } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { postRecipe, editRecipe } from '../../actions/recipesActions';
import RemoveButton from '../removeButton';


// used this stack overflow https://stackoverflow.com/questions/36512686/react-dynamically-add-input-fields-to-form to figure out dynamic input fields

class RecipeForm extends Component{
    
    // using this form for edit and add because they are only slightly different
    // if the url has an id param in it, then it is the edit form
    isEdit = !!this.props.match.params.id


    // start the state blank except user_id for add
    state = {  
        user_id: this.props.user.id,
        image: '',
        name: '',
        summary: '',
        servings: 1,
        prep_time: '',
        cook_time: '',
        instructions: [''],
        ingredients_attributes: [{name: '', amount: ''}]      
     }

     //? if I'm going to do this this way, should this happen in componentWillRecieveProps
    componentDidMount(){
        // if it's an edit, find the recipe it's for from the recipe array
        if(this.isEdit){
            let recipes = this.props.recipes
            let id = this.props.match.params.id
            const recipe = recipes.find(recipe => recipe.id === parseInt(id))
            // set the state to the current values of that recipe, which will fill in the edit form with the current information for the recipe
            this.setState({...recipe, instructions: recipe.instructions.split('\n'),ingredients_attributes: recipe.ingredients.map(ingredient => {
                return {name: ingredient.name, amount: ingredient.recipes_ingredients[0].amount}
                })
            })
        }
    }

    // Only want to be able to remove an ingredient or instruction input if there are more than one. Each recipe must at least have 1 ingredient and 1 step in the instructions
    renderRemoveIngredientButton = (index) => {
       if (this.state.ingredients_attributes.length > 1 ){
           return <RemoveButton callback={this.removeIngredient} index={index}/>
       }
    }

    renderRemoveInstructionButton = (index) => {
        if (this.state.instructions.length > 1){
            return <RemoveButton callback={this.removeInstruction} index={index}/>
        }
    }


    removeInstruction = (event) => {
        // stored the index of the instruction in the name field
        let index = parseInt(event.target.name)
        // get all of the instructions currently in state
        let instructions = [...this.state.instructions]
        // get all of the instructions except for the one to be removed
        instructions = [...instructions.slice(0, index), ...instructions.slice(index+1)]

        this.setState({...this.state, instructions})

    }

    instructionOnChange = (event) => {
        event.persist()
        // get the index of the instruction that is being changed
        let index = event.target.name
        // get all of the instructions in state
        let instructions = [...this.state.instructions]
        // change the value of the instruction at that index to event.target.value
        instructions[index] = event.target.value

        this.setState({instructions})
    }

    // when the user clicks the "add another instruction" button, add a new instruction with a blank string to the array, causing another input field to be rendered
    addInstructionsInput = () => {
        this.setState(prevState => ({...prevState, instructions: [...prevState.instructions, '']}))
    }

    // dynamic ingredient inputs are almost identical to instructions, main difference is it's an array of objects and not strings

    ingredientOnChange = (event) => {
        event.persist()
        let index = parseInt(event.target.id.split('-')[3])
        let ingredients_attributes = [...this.state.ingredients_attributes]
        ingredients_attributes[index] = { ...ingredients_attributes[index], [event.target.name]: event.target.value}
        this.setState({...this.state, ingredients_attributes})
    }

    removeIngredient = (event) => {
        let index = parseInt(event.target.name)
        let ingredients_attributes = [...this.state.ingredients_attributes]
        ingredients_attributes = [...ingredients_attributes.slice(0, index), ...ingredients_attributes.slice(index+1)]
        this.setState({...this.state, ingredients_attributes})

    }
      addIngredientInput = () => {
        this.setState(prevState => ({...prevState, ingredients_attributes: [...prevState.ingredients_attributes, {name: '', amount: ''}]}))
    }

    imageOnChange = (event) => {
        event.persist()
        // set the image to the value of the file, this is what will need to be sent to backend for use with cloudinary
        this.setState({image: event.target.files[0]})
    }

    recipeOnChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // instructions are stored in backend as string
        const recipe = {...this.state, instructions: this.state.instructions.join('\n')}
        this.isEdit ? this.props.editRecipe(recipe, this.props) : this.props.addRecipe(recipe, this.props)
    }

    renderIngredientInputs = () => {

        // map over the ingredients array and display an input field for each ingredient
        
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

    // almost identical to renderIngredientInputs
    renderInstructionInputs = () => {
        return(
        <Fragment>
            {this.state.instructions.map((step, index) => {
                return (
                    <Fragment key={`instruction-${index+1}`}>
                        {this.renderRemoveInstructionButton(index)}
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
        return(
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <h1>Recipe Form</h1>
                    <Form.Group>
                        <Form.Label>Image Upload</Form.Label>
                        <Form.Control type="file" name="image" onChange={this.imageOnChange}/>
                    </Form.Group>
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
        )
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