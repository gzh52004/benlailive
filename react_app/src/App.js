import React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'


import Nav from './component/Nav'
import Cart from './page/cart'
import Home from './page/home'
import List from './page/list'
import Login from './page/login'
import Mine from './page/mine'
import Newcomer from './page/newcomer'
import Reg from './page/reg'
// import './App.scss'


function App(props) {

    console.log('Appprops', props);
    return (
        <div>
            {
                props.location.pathname == '/newcomer' || props.location.pathname == '/cart' || props.location.pathname == '/login' ? null : <Nav props={props} />
            }
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/list" component={List} />
                <Route path="/newcomer" component={Newcomer} />
                <Route path="/cart" component={Cart} />
                <Route path="/mine" component={Mine} />
                <Route path="/login" component={Login} />
                <Route path="/reg" component={Reg} />
                <Route path="/notfound" render={() => <div><h1>找不到该页面</h1></div>} />
                <Redirect from='/' to="/home" exact />
                <Redirect to="/notfound" />
            </Switch>
        </div>
    )
}
App = withRouter(App)
export default App