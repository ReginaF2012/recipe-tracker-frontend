import React from 'react';
import { Component } from 'react';
import Recipe from '../Recipes/Recipe';
import { CardColumns } from 'react-bootstrap';

export default class Recipes extends Component {

    makeRecipeCards = () => {
         return this.props.recipes.map(recipe => {
            return Recipe(recipe)
         })
    }

    render(){
        return (
            <CardColumns >  
                {this.makeRecipeCards()}
            </CardColumns>

        )
    }
}

