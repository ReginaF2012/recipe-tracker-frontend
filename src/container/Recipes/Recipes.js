import React from 'react';
import RecipeCard from '../../components/Recipes/RecipeCard';
import { CardGroup } from 'react-bootstrap';


export default function Recipes({recipes}){

    const makeRecipeCards = (recipes) => {
        if(recipes.length> 0){
            return recipes.map((recipe, index) => {
                return (
                    <div key={`recipe-${index+1}`}className="row with-margin">
                        <RecipeCard recipe={recipe}/>
                    </div>
                )
            })
        } else {
            return <p>No recipes yet...</p>
        }
    }


    return (
        <CardGroup>
            {makeRecipeCards(recipes)}
        </CardGroup>   
    )

}

