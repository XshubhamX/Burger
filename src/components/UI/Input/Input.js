import React from 'react'
import classes from './Input.css'

const input = (props)=>{

    let inputElement = null
    let inputClasses = [classes.InputElement]

    if(!props.inValid && props.clicked){
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType){
        case('input'):
            inputElement = <input 
                className = {inputClasses.join(' ')} 
                {...props.elementConfig}
                value = {props.value}
                onChange ={props.changed}
                />
            break;
        case('textarea'):
            inputElement = <textarea 
                className = {inputClasses.join(' ')} 
                {...props.elementConfig}
                value = {props.value}
                onChange ={props.changed}
                />
            break;
        case('select'):
            inputElement = <select
                className = {classes.InputElement} 
                value = {props.value}
                onChange ={props.changed}
                >
                    <option value = {props.elementConfig.options[0].value}>{props.elementConfig.options[0].displayValue}</option>
                    <option value = {props.elementConfig.options[1].value}>{props.elementConfig.options[1].displayValue}</option>
                </select>
            break;
        default:
            inputElement = <input 
                className = {inputClasses} 
                {...props.elementConfig}
                value = {props.value}
                onChange ={props.changed}
                />
    }
 
    return(
        <div className = {classes.Input}>
            <label className = {classes.Label}>{props.name}</label>
            {inputElement}
        </div>
    )
}

export default input;