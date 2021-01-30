import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = ()=>{
    return{
        type: actionTypes.authStart
    }
}
export const authSuccess = (idToken,userId)=>{
    return{
        type:actionTypes.authSuccess,
        idToken:idToken,
        userId:userId
    }
}
export const authFail = (error)=>{
    return{
        type:actionTypes.authFail,
        error:error
    }
}
export const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return{
        type:actionTypes.logout,
    }
}
export const doLogout = (time)=>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout())
        }, time*1000);
    }
}
export const authInit = (email, password,signUp)=>{
    return dispatch =>{
        dispatch(authStart())
        const data = {
            email:email,
            password:password,
            returnSecureToken : true
        }
        let url = null;
        if(signUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKaerpN36Zwv_1j-t5CYLlp0hBwOisQUE'
        }
        if(!signUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKaerpN36Zwv_1j-t5CYLlp0hBwOisQUE'
        }
        axios.post(url,data)
        .then(response=>{
            const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(doLogout(response.data.expiresIn))
            }
        ).catch(error=>{
            dispatch(authFail(error.response.data.error.message))
            }
        )
    }
}

export const authPath = (path)=>{
    return{
        type:actionTypes.setAuth,
        path:path
    }
}

export const authCheckState = ()=>{
    return dispatch => {
        const token=localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'))
            if(expirationDate<=new Date()){
               dispatch(logout())
            }else{
                dispatch(authSuccess(token,localStorage.getItem('userId')))
                dispatch(doLogout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}

