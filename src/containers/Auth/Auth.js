import React , {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Loading from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

class Auth extends Component{

    state = {
        authForm:{
        email: {
            elementType: 'input',
            elementConfig: {
                type : 'email',
                placeholder : 'Mail Address',
                name : 'Email'
            },
            value: '',
            validation:{
                required:true,
                isEmail : true,
                minLength : 5
            },
            valid:false,
            clicked:false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type : 'password',
                placeholder : 'password',
                name : 'password'
            },
            value: '',
            validation:{
                required:true,
                minLength : 6
            },
            valid:false,
            clicked:false
        },

    },
    isSignUp : true
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

onChangeHandler = (event,inputIdentifier)=>{
    const updateControls = {
        ...this.state.authForm,
        [inputIdentifier]:{
            ...this.state.authForm[inputIdentifier],
            value:event.target.value,
            valid : this.checkValidity(event.target.value,this.state.authForm[inputIdentifier].validation),
            clicked:true
        }
    }
    this.setState({
        authForm:updateControls
    })
}

onSubmitHandler = (event)=>{
    event.preventDefault()
    console.log(this.state.authForm.email.value)
    this.props.onInitAuth(this.state.authForm.email.value,this.state.authForm.password.value,this.state.isSignUp)
}

toggleAuthType = () =>{
    this.setState(prevState =>{
        return{
        isSignUp:!prevState.isSignUp
        }
    })
}

componentDidMount = ()=>{
    if(!this.props.building&&this.props.authPath!=='/'){
        this.props.onSetAuthPath()
    }
}

    render(){

        const formElementArray = []

        for(let key in this.state.authForm){
            formElementArray.push({
                id:key,
                config:this.state.authForm[key]
            })
        }

        let form =formElementArray.map(x =>(
            <Input key={x.id}
                className = {classes.Input}
                elementType = {x.config.elementType} 
                elementConfig={x.config.elementConfig} 
                value = {x.config.value} 
                name = {x.config.elementConfig.name}
                changed = {(event)=>this.onChangeHandler(event,x.id)}
                inValid = {x.config.valid} 
                clicked = {x.config.clicked}/>
        ))

        if(this.props.loading){
            form=<Loading/>
        }

        let err = null;

        if(this.props.error){
            err = (<p>{this.props.error}</p>)
        }

        let authRedirect = null;

        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authPath}/>
        }

        return(
            <div className = {classes.Auth}>
                {authRedirect}
                {err}
                <form  onSubmit = {this.onSubmitHandler}>
                    {form}
                    <Button btnType = 'Success'>Submit</Button>
                </form>
                <Button btnType = 'Danger' clicked={this.toggleAuthType}>{this.state.isSignUp?'Swith To Sign In':'Switch To Sign Up'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token,
        building:state.burgerBuilder.building,
        authPath:state.auth.authPath
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onInitAuth : (email, password,signUp)=> dispatch(actions.authInit(email, password,signUp)),
        onSetAuthPath: ()=>dispatch(actions.authPath('/'))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);