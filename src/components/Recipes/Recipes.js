import React from 'react';
import { Component } from 'react';
import { fetchRecipes } from '../../actions/recipesActions';
import { connect } from 'react-redux';
import Recipe from '../Recipes/Recipe';

class Recipes extends Component {

    makeRecipeCards = () => {
         return this.props.recipes.map(recipe => {
            return Recipe(recipe)
         })
    }

    componentDidMount(){
        this.props.fetchRecipes()
        console.log("CDM props log", this.props.recipes)
    }

    render(){
        return (
        <div>{this.makeRecipeCards()}</div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log("MSTP log", state)
    return {
        recipes: state.recipes
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
            fetchRecipes: () => dispatch(fetchRecipes())
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)