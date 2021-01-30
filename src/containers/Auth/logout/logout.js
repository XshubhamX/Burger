import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as  actions from '../../../store/actions/index'
import { Redirect } from 'react-router-dom'

export class logout extends Component {

    componentDidMount(){
        this.props.onLogoutInit()
    }

    render() {
        return (
             <Redirect to ='/'/>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogoutInit : ()=>dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(logout)
