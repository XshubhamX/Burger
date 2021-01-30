import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
import order from '../../components/Order/Order'

export const purchaseBurgerSuccess = (id,ordeData)=>{
    return{
        type:actionTypes.purchaseBurgerSuccess,
        orderId:id,
        orderData:ordeData
    }
}
export const purchaseBurgerFail = (error)=>{
    return{
        type:actionTypes.purchaseBurgerFail,
        error:error
    }
}

export const purchaseBurgerStart = ()=>{
    return {
        type:actionTypes.purchaseBurgerStart
    }
}

export const purchaseBurger = (orderData,token)=>{
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post( '/orders.json?auth='+token, orderData )
            .then( response => {
                console.log(response)
                dispatch(purchaseBurgerSuccess(response.data.name,order))
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error))
            } );
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.purchaseInit
    }
}

export const fetchOrdersSuccess = () => {
    return {
        type:actionTypes.fetchIngredientsFailed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    }
}

export const fetchOrderSuccess = (fetchedOrders) => {
    return{
        type:actionTypes.fetchOrderSuccess,
        orderData:fetchedOrders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type : actionTypes.fetchOrderFail
    }
}

export const fetchOrderStart = () => {
    return {
        type : actionTypes.fetchOrderStart
    }
}

export const orderInit = (token,userId) =>{
    return dispatch =>{
        dispatch(fetchOrderStart())
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrderFail(err))
            })
        }   
}