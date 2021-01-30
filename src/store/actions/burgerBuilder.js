import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const addIngredient = (name)=>{
    return {
        type : actionTypes.addIngredient,
        ingredientName :name
    }
}
export const removeIngredient = (name)=>{
    return {
        type : actionTypes.removeIngredient,
        ingredientName :name
    }
}

export const setIngredients = (ingredients)=>{
    return{
        type:actionTypes.setIngredients,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed = ()=>{
    return{
        type:actionTypes.fetchIngredientsFailed,
    }
}

export const initIngredients = ()=>{
    return dispatch=>{
        axios.get( 'https://burger-app-c467d-default-rtdb.firebaseio.com/ingrediente.json' )
            .then( response => {
                dispatch(setIngredients(response.data))
            } )
            .catch( error => {
                dispatch(fetchIngredientsFailed())
            } );
    }
}