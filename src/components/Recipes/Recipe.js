import { Container, Image } from 'react-bootstrap';
import React from 'react';

export default function Recipe({recipe}){

    const [recipePrepTimeNum, recipePrepTimeUnit] = recipe.prep_time.split(" ")
    const [recipeCookTimeNum, recipeCookTimeUnit] = recipe.cook_time.split(" ")

    const instructionsArr = recipe.instructions.split('\n')

    const renderInstructions = (instructions) => {
        if(instructions.length > 1){
            return (
                <div className="recipe-instructions">
                    <h3>Instructions</h3>
                    <ol className="instructions-list">
                        {instructions.map((step, index) => {
                            return <li key={`step-${index+1}`}>{step}</li>
                        })}
                    </ol>
                </div>
            )
        } else {
            return (
                <div className="recipe-instructions">
                    <h3>Instructions</h3>
                    <p>{instructions[0]}</p>
                </div>
            )
        }
    }

        return (
        <Container className="recipe-container">
            <div className="recipe-header">
               <h2>{recipe.name}</h2>
               <div className="recipe-image-container">
                  <Image src={recipe.image_url} alt={recipe.name+' image'} fluid /> 
               </div>
                <h3>Summary</h3>
                <p className="recipe-summary">{recipe.summary}</p> 
            </div>
            
            <div className="recipe-prep-info">
                <ul className="prepTime-servings">
                    <li className="prepTime-item"><span className="timer-icon"><i className="fas fa-clock fa-3x"></i></span></li>
                    <li className="prepTime-item" >
                        <p className="prepTime-item-type" >Prep</p>
                        <span className="prepTime-item-time">{recipePrepTimeNum}{recipePrepTimeUnit[0]}</span>
                    </li>
                    <li className="prepTime-item" >
                        <p className="prepTime-item-type" >Cook</p>
                        <span className="prepTime-item-time">{recipeCookTimeNum}{recipeCookTimeUnit[0]}</span>
                    </li>
                    <li className="prepTime-item" >
                        <p className="prepTime-item-type" >Servings</p>
                        <span className="prepTime-item-time">{recipe.servings}</span>
                    </li>
            </ul>
            </div>
            <div className="recipe-ingredients-instructions-container">
                <div className="ingredients-list">
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => {
                        const amount = ingredient.recipes_ingredients[0].amount
                        return <li key={`ingredient-${index+1}`}>{amount} {ingredient.name}</li>
                        })}
                    </ul>
                </div>
                {renderInstructions(instructionsArr)}
            </div>
            
        </Container>
    )
}