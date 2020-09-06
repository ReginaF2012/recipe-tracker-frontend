import React from 'react';
import { Component } from 'react';
import { fetchRecipes } from '../../actions/recipesActions';
import { connect } from 'react-redux';
import Recipe from '../Recipes/Recipe';
import { CardColumns } from 'react-bootstrap';

class Recipes extends Component {

    makeRecipeCards = () => {
         return this.props.recipes.map(recipe => {
            return Recipe(recipe)
         })
    }

    componentDidMount(){
        this.props.fetchRecipes()
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


const mapDispatchToProps = (dispatch) => {
    return {
            fetchRecipes: () => dispatch(fetchRecipes())
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)