import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false
}

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 25,
    bacon: 20
};


const reducer = (state=initialState,action)=>{
    switch(action.type){
        case(actionTypes.addIngredient):
           return{
               ...state,
               ingredients:{
                   ...state.ingredients,
                   [action.ingredientName]:state.ingredients[action.ingredientName]+1
               },
               totalPrice : state.totalPrice+INGREDIENT_PRICES[action.ingredientName],
               building:true
            } 
        case(actionTypes.removeIngredient):
           return{
               ...state,
               ingredients:{
                   ...state.ingredients,
                   [action.ingredientName]:state.ingredients[action.ingredientName]-1
               },
               totalPrice : state.totalPrice-INGREDIENT_PRICES[action.ingredientName],
               building:true
            } 
        case(actionTypes.setIngredients):
            return{
                ...state,
                ingredients:action.ingredients,
                error:false,
                totalPrice:4,
                building:false
            }
        case(actionTypes.fetchIngredientsFailed):
            return{
                ...state,
                error:true
            }
        default:
            return state
    }
}

export default reducer