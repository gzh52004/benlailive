import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'


import Nav from './component/Nav'
// import Cart from './page/cart'
// import Home from './page/home'
// import List from './page/list'
// import Login from './page/login'
// import Mine from './page/mine'
// import Newcomer from './page/newcomer'
import './App.scss'

const Home = lazy(() => import('./page/home'))
// const Nav = lazy(() => import('./component/Nav'))
const Cart = lazy(() => import('./page/cart'))
const List = lazy(() => import('./page/list'))
const Login = lazy(() => import('./page/login'))
const Reg = lazy(() => import('./page/reg'))
const Mine = lazy(() => import('./page/mine'))
const Newcomer = lazy(() => import('./page/newcomer'))
const productInf = lazy(() => import('./page/productInf'))
function App(props) {

    // console.log('Appprops', props);
    return (
        <div>
            {
                props.location.pathname == '/newcomer' || props.location.pathname == '/cart' || props.location.pathname == '/login' ? null : <Nav props={props} />
            }
            <Suspense fallback={<div>loading...</div>}>
                <Switch>
                    <Route path="/productInf/:_id" component={productInf} />
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
            </Suspense>
        </div>
    )
}


App = withRouter(App)
export default App