import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Recipe from '../Recipes/Recipe';
import { CardColumns } from 'react-bootstrap';

export default class Recipes extends Component {

    makeRecipeCards = () => {
         return this.props.recipes.map(recipe => {
            return Recipe(recipe)
         })
    }

    render(){
        {console.log(this.props)}
        return (
            <CardColumns >  
                {this.makeRecipeCards()}
            </CardColumns>

        )
    }
}

