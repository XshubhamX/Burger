import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore,compose ,applyMiddleware,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BurgerBuilderReducer from './store/reducers/burgerBuilder'
import OrderReducer from './store/reducers/order'
import thunk from 'redux-thunk'
import authReducer from './store/reducers/auth'


const composeEnhancers = process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose

const rootReducer =combineReducers({
    order : OrderReducer,
    burgerBuilder :BurgerBuilderReducer,
    auth :authReducer
} )


const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
))

const app = (
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
);
 
ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
