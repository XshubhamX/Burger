import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders:[],
    loading : false,
    purchased:false
}

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case actionTypes.purchaseInit:
            return{
                ...state,
                purchased:false
            }
        case actionTypes.purchaseBurgerStart:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.purchaseBurgerSuccess:

            const newOrder = {
                ...action.orderData,
                id : action.orderId,
            }
            return {
                ...state,
                loading:false,
                orders:state.orders.concat(newOrder),
                purchased:true
            }
        case actionTypes.purchaseBurgerFail:
            return {
                ...state,
                loading:false,
                purchased:true
            }
        case actionTypes.fetchOrderStart:
            return{
                ...state,
                loading:true
            }
        case actionTypes.fetchOrderFail:
            return{
                ...state,
                loading:false
            }
        case actionTypes.fetchOrderSuccess:
            return{
                ...state,
                loading:false,
                orders:action.orderData
            }
        default:
            return state
    }
}

export default reducer