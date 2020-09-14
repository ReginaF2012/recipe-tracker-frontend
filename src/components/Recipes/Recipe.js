import { Container, Image, Button } from 'react-bootstrap';
import React from 'react';
import { Component } from 'react';
import { deleteRecipe } from '../../actions/recipesActions';
import { connect } from 'react-redux';

export class Recipe extends Component{

 
    // handle click for delete button
    handleDeleteClick = () => {
        this.props.deleteRecipe(this.props.recipe.id, this.props)
    }

    // to be called in render
    renderIngredients = () => {
        // map over the ingredient array
        return this.props.recipe.ingredients.map((ingredient, index) => {
            // the amount is stored on a join table between recipe and ingredient
            const amount = ingredient.recipes_ingredients[0].amount 
            // return li with amount followed by ingredient name
            return <li key={`ingredient-${index+1}`}>{amount} {ingredient.name}</li>
        })
    }

    // to be called in render
    renderInstructions = () => {
        // the instructions come in as a string with newline characters between
        // steps, I want to display them as a list so splitting them on the newline character
        let instructionsArr = this.props.recipe.instructions.split('\n')

        // display the steps in an ordered list
        return (
            <div className="recipe-instructions">
                <h3>Instructions</h3>
                <ol className="instructions-list">
                    {instructionsArr.map((step, index) => {
                        return <li key={`step-${index+1}`}>{step}</li>
                    })}
                </ol>
            </div>
        )
    }


    render(){
        // split the prep time and cook time into number and unit ex) "1 hour" => ["1", "hour"]
        const [recipePrepTimeNum, recipePrepTimeUnit] = this.props.recipe.prep_time.split(" ")
        const [recipeCookTimeNum, recipeCookTimeUnit] = this.props.recipe.cook_time.split(" ")
        return (
        <Container className="recipe-container">
            <div className="recipe-header">
               <h2>{this.props.recipe.name}</h2>
               <div className="recipe-image-container">
                  <Image src={this.props.recipe.image_url} alt={this.props.recipe.name+' image'} fluid /> 
               </div>
                <h3>Summary</h3>
                <p className="recipe-summary">{this.props.recipe.summary}</p> 
            </div>
            
            <div className="recipe-prep-info">
                <ul className="prepTime-servings">
                    <li className="prepTime-item"><span className="timer-icon"><i className="fas fa-clock fa-3x"></i></span></li>
                    <li className="prepTime-item" >
                        <p className="prepTime-item-type" >Prep</p>
                        <span className="prepTime-item-time">{recipePrepTimeNum}{recipePrepTimeUnit && recipePrepTimeUnit[0]}</span>
                    </li>
                    <li className="prepTime-item" >
                        <p className="prepTime-item-type" >Cook</p>
                        <span className="prepTime-item-time">{recipeCookTimeNum}{recipeCookTimeUnit && recipeCookTimeUnit[0]}</span>
                    </li>
                    <li className="prepTime-item" >
                        <p className="prepTime-item-type" >Servings</p>
                        <span className="prepTime-item-time">{this.props.recipe.servings}</span>
                    </li>
            </ul>
            </div>
            <div className="recipe-ingredients-instructions-container">
                <div className="ingredients-list">
                    <h3>Ingredients</h3>
                    <ul>
                        { this.renderIngredients() }
                    </ul>
                </div>
                {this.renderInstructions()}
            </div>

            {/* if the recipe belongs to the user, let them click the edit and delete buttons */}
                { this.props.user.id === this.props.recipe.user_id && (
                    <div className="btns-container">
                        <Button onClick={() => {this.props.history.push(`/recipes/${this.props.recipe.id}/edit`)}} variant="primary" size="lg" block>
                            Edit This Recipe
                        </Button>
                        <Button onClick={this.handleDeleteClick} variant="danger" size="lg" block>
                            Delete This Recipe
                        </Button>
                    </div>
                ) }
           
            
            
        </Container>
    )}
}

// need to grab the user to see if the recipe belongs to that user
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

// for the delete button
const mapDispatchToProps = (dispatch) => {
    return {
        deleteRecipe: (recipeId, ownProps) => ( dispatch(deleteRecipe(recipeId, ownProps)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)