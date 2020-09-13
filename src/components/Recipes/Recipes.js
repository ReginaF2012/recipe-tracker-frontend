import React from 'react';
import { Component } from 'react';
import RecipeCards from './RecipeCards';
import { CardGroup } from 'react-bootstrap';


export default class Recipes extends Component{

    makeRecipeCards = (recipes) => {
        if(recipes.length> 0){
            return recipes.map((recipe, index) => {
                return <div key={`recipe-${index+1}`}className="row with-margin">{RecipeCards(recipe)}</div>
            })
        } else {
            return <p>No recipes yet...</p>
        }
    }

        render(){

            return (
                <CardGroup>
                    {this.makeRecipeCards(this.props.recipes)}
                </CardGroup>
                
            )
        }
}

