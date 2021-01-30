import React, { Component } from 'react';
import { Route, Switch ,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/logout/logout'
import  * as actions from './store/actions/index'
import {withRouter} from 'react-router-dom'

class App extends Component {

  componentDidMount(){
    this.props.autoSignUp()
  }

  render () {

    let routes = (
      <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to = '/'/>
      </Switch>
    )

    if(this.props.isAuth){
      routes=(
        <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path='/logout' component={Logout}/>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuth : state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    autoSignUp: ()=>dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
