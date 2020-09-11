import React from 'react';
import { Component } from 'react';
import RecipeCards from './RecipeCards';
import { CardColumns } from 'react-bootstrap';


export default class Recipes extends Component{

    makeRecipeCards = (recipes) => {
        if(recipes.length> 0){
            return recipes.map(recipe => {
                return RecipeCards(recipe)
            })
        } else {
            return <p>No recipes yet...</p>
        }
    }

        render(){
            return (
                <CardColumns >  
                    {this.makeRecipeCards(this.props.recipes)}
                </CardColumns>

            )
        }
}

