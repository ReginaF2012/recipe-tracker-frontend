import { Container, Image, Button } from 'react-bootstrap';
import React from 'react';
import { Component } from 'react';
import { deleteRecipe } from '../../actions/recipesActions';
import { connect } from 'react-redux';

export class Recipe extends Component{

 

    handleDeleteClick = () => {
        this.props.deleteRecipe(this.props.recipe.id, this.props)
    }

    renderIngredients = () => {
        return this.props.recipe.ingredients.map((ingredient, index) => {
            const amount = ingredient.recipes_ingredients[0].amount 
            return <li key={`ingredient-${index+1}`}>{amount} {ingredient.name}</li>
        })
    }

    renderInstructions = () => {
        let instructionsArr = this.props.recipe.instructions.split('\n')

        if(instructionsArr.length > 1){
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
        } else {
            return (
                <div className="recipe-instructions">
                    <h3>Instructions</h3>
                    <p>{instructionsArr[0]}</p>
                </div>
            )
        }
    }


    render(){
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

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteRecipe: (recipeId, ownProps) => ( dispatch(deleteRecipe(recipeId, ownProps)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)