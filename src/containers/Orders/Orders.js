import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux' 
import Loading from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount() {
        this.props.onInitOrder(this.props.token,this.props.userId)
    }

    render () {
        let summary = null;
        if(this.props.loading){
            summary = (
                <Loading />
            )
        }
        else if(!this.props.loading){
            summary = (
                <div>
                {this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
            )
        }

        return summary
    }
}

const mapStateToProps = state=>{
    return{
        loading:state.order.loading,
        orders:state.order.orders,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onInitOrder : (token,userId)=>dispatch(actions.orderInit(token,userId))
    }
}

export default connect( mapStateToProps ,mapDispatchToProps)(withErrorHandler(Orders, axios));