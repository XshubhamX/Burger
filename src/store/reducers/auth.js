import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token : null,
    userId:null,
    error:null,
    loading:null,
    authPath:'/',
}

const authStart = (state,action)=>{
    return {
        ...state,
        loading:true,
        error:null,
    }
}
const authSuccess = (state,action)=>{
    return {
        ...state,
        token:action.idToken,
        userId:action.userId,
        loading:false,
        error:null,
    }
}
const authFail = (state,action)=>{
    return {
        ...state,
        loading:false,
        error:action.error,
    }
}
const logout = (state)=>{
    return {
        ...state,
        token:null,
        userId:null

    }
}

const setAuth = (state,action)=>{
    return{
        ...state,
        authPath:action.path
    }
}

const reducer = (state=initialState,action)=>{
    switch (action.type){
        case (actionTypes.authStart):
            return authStart(state,action)
        case (actionTypes.authSuccess):
            return authSuccess(state,action)
        case (actionTypes.authFail):
            return authFail(state,action)
        case (actionTypes.logout):
            return logout(state)
        case (actionTypes.setAuth):
            return setAuth(state,action)
        default:
            return state
    }
};

export default reducer;