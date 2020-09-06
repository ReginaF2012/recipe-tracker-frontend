import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Recipe from '../Recipes/Recipe';
import { CardColumns } from 'react-bootstrap';

class Recipes extends Component {

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

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes
    }
}


export default connect(mapStateToProps)(Recipes)