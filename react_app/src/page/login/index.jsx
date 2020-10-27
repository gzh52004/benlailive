import React from 'react'
import './login.scss'
import {Button,Icon} from 'antd-mobile';
import pic1 from './pic1.png'

function Login() {
    changeIcon={
        
    }
    return (
        <div className="login">
            <div className="return"><Icon type="left" /></div>
            <div className="content">

            <img className="pic1" src={pic1} alt=""></img>   
            <ul className="ul1">
                <li className="ul1-li1"><p className="icon-user"></p><p className="ul1-li1-p"><input type="text" className="ul1-li1-input" placeholder="请输入手机号/邮箱"></input></p></li>
                <li className="ul1-li2">
                <p className="icon-suo"></p><p className="ul1-li2-p"><input type="password" className="ul1-li2-input" placeholder="请输入密码"></input></p>
                <a href="" onClick={changeIcon} className="ul1-li2-a1"></a>
                <a className="ul1-li2-a2" href="">忘记密码</a>
                </li>
                <li><Button type="primary">登录</Button></li>
                <li className="ul1-li4"><a className="ul1-li4-a2">注册账号</a></li>
            </ul>
            </div>
        </div>
    )
}

export default Login