import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        order:{
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type : 'text',
                        placeholder : 'Your Name',
                        name : 'Name'
                    },
                    value: '',
                    validation:{
                        required:true,
                    },
                    valid:false,
                    clicked:false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type : 'text',
                        placeholder : 'Your Street',
                        name : 'Street'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    clicked:false
                } ,
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type : 'text',
                        placeholder : 'ZIP',
                        name : 'ZIP Code'
                    },
                    value: '',
                    validation:{
                        required:true,
                        minLength:4,
                        maxLength:7,
                        isNumeric:true
                    },
                    valid:false,
                    clicked:false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type : 'text',
                        placeholder : 'Your Country',
                        name : 'Country'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    clicked:false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type : 'email',
                        placeholder : 'Your Email',
                        name : 'Email'
                    },
                    value: '',
                    validation:{
                        required:true,
                        isEmail:true,
                        minLength:5,
                    },
                    valid:false,
                    clicked:false
                },
                deliveryMethod:{
                    elementType: 'select',
                    elementConfig: {
                        options:[{value : 'fastest' ,displayValue:'Fastest'},
                        {value : 'cheapest' ,displayValue:'Cheapest'}
                    ]},
                    value: 'fastest',
                    validation : {},
                    valid :true
                }
        },
        isValid : false

}

    onChangeHandler(event,id){
        const updatedOrder= {
        ...this.state.order
        }
        const updatedElement={
            ...updatedOrder[id]
        }

        updatedElement.value = event.target.value;
        updatedElement.clicked = true;
        updatedElement.valid= this.checkValidity(updatedElement.value, updatedElement.validation)
        updatedOrder[id] = updatedElement;

        let formIsValid = true;
        for(let key in updatedOrder){
            formIsValid = updatedOrder[key].valid && formIsValid
        }

        this.setState({
            order : updatedOrder,
            isValid : formIsValid
        })
        
    }

    checkValidity(value,rules){

        let isValid = true;

        if(rules.required){
            isValid = value.trim()!=='' && isValid;
        }

        if(rules.minLength){
            isValid = value.trim().length>=rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.trim().length<=rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }


    orderHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        
        for(let data in this.state.order){
            formData[data] = this.state.order[data].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData : formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token)

    }

    render () 
    {
            
    const formInputElements = []

    for(let key in this.state.order){
        formInputElements.push({
            id:key,
            config:this.state.order[key]
        })
    }
        let form = (
            <form onSubmit = {this.orderHandler}>
                {formInputElements.map(x=>
                    <Input  
                    key ={x.id}
                    elementType = {x.config.elementType} 
                    elementConfig={x.config.elementConfig} 
                    value = {x.config.value} 
                    name = {x.config.elementConfig.name}
                    changed = {(event)=>this.onChangeHandler(event,x.id)}
                    inValid = {x.config.valid} 
                    clicked = {x.config.clicked}
                    />
                )}

                <Button disabled = {!this.state.isValid} btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilder.ingredients,
        loading:state.order.loading,
        price:state.burgerBuilder.totalPrice,
        token : state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));