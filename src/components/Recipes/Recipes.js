import React from 'react';
import { Component } from 'react';
import RecipeCards from './RecipeCards';
import { CardColumns } from 'react-bootstrap';
import { connect } from 'react-redux';

class Recipes extends Component {

    makeRecipeCards = () => {
         return this.props.recipes.map(recipe => {
            return RecipeCards(recipe)
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
    return { alerts: state.alerts }
}

export default connect(mapStateToProps)(Recipes)

