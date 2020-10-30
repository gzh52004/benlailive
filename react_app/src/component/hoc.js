import React from 'react'
import {Redirect} from 'react-router-dom'
// const {render} = require("react-dom")

export function withUser(MyComponent){
    return function OuterComponent(props){
        let currentUser = localStorage.getItem('currentUser');
        try{
            currentUser = currentUser
        }catch(err){
            currentUser = ""
        }
        return <MyComponent {...props} currentUser={currentUser}/>
    }
}

export function withAuth(InnerComponent){
    @withUser
    class OuterComponent extends React.Component{
        componentDidMount(){
        }
        render(){console.log('withAuth.props',this.props)
            const {currentUser,location:{pathname}} = this.props;
            if(currentUser){
                 // 用户登录后显示内容
                return <InnerComponent {...this.props} />
            }else{
                return <Redirect to={"/login?targetUrl="+pathname} />
            }
        }
    }
    return OuterComponent
}