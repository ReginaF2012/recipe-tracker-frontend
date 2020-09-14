import React from 'react';
import RecipeCard from '../../components/Recipes/RecipeCard';
import { CardGroup } from 'react-bootstrap';

// container component for recipes
export default function Recipes(props){

    const makeRecipeCards = (recipes) => {
        // if there are recipes, map over them and render recipe cards
        if(recipes.length> 0){
            return recipes.map((recipe, index) => {
                return (
                    <div key={`recipe-${index+1}`}className="row with-margin">
                        <RecipeCard recipe={recipe}/>
                    </div>
                )
            })
        } else {
            // otherwise inform the user there are no recipes
            return <p>No recipes yet...</p>
        }
    }


    return (
        <CardGroup>
            {console.log(props)}
            {makeRecipeCards(props.recipes)}
        </CardGroup>   
    )

}

