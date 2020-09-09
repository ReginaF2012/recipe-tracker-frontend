import { Container, Image, Button } from 'react-bootstrap';
import React from 'react';
import { Component } from 'react';
import { deleteRecipe } from '../../actions/recipesActions';
import { connect } from 'react-redux';

export class Recipe extends Component{

    instructionsArr = this.props.recipe.instructions.split('\n')


    renderInstructions = () => {
        if(this.instructionsArr.length > 1){
            return (
                <div className="recipe-instructions">
                    <h3>Instructions</h3>
                    <ol className="instructions-list">
                        {this.instructionsArr.map((step, index) => {
                            return <li key={`step-${index+1}`}>{step}</li>
                        })}
                    </ol>
                </div>
            )
        } else {
            return (
                <div className="recipe-instructions">
                    <h3>Instructions</h3>
                    <p>{this.instructionsArr[0]}</p>
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
                        {this.props.recipe.ingredients.map((ingredient, index) => {
                        const amount = ingredient.recipes_ingredients[0].amount
                        return <li key={`ingredient-${index+1}`}>{amount} {ingredient.name}</li>
                        })}
                    </ul>
                </div>
                {this.renderInstructions()}
            </div>
            
                { this.props.user.id === this.props.recipe.user_id && (
                    <div className="btns-container">
                        <Button variant="primary" size="lg" block>
                            Edit This Recipe
                        </Button>
                        <Button variant="danger" size="lg" block>
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
        deleteRecipe: (recipeId) => ( dispatch(deleteRecipe(recipeId)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)