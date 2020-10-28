import React,{useState} from 'react'
import './login.scss'
import {Button,Icon} from 'antd-mobile';
import pic1 from './pic1.png'

function Login() {
        //点击眼睛明文/密文显示密码
        const changeType = function(){
            let aaa =  document.getElementsByClassName("ul1-li2-input")
            let bbb = document.getElementsByClassName("ul1-li2-a1")
            let ccc = document.getElementsByClassName("ul1-li2-a1-none")
            if(aaa[0].type === "password"){
                aaa[0].setAttribute("type","text")
                bbb[0].style.display="none"
                ccc[0].style.display="block"
            }else{
                aaa[0].setAttribute("type","password")
                bbb[0].style.display="block"
                ccc[0].style.display="none"
            }
        }

        //登录按钮是否可以点击
        const [user,changeuse] = useState({username:'',password:''})
        const buttonState = function(){
            if(user.username != "" && user.password !=""){
                    let result = "ul1-li4-button"
                    return result
                }
        }


    return (
        <div className="login">
            <div className="return"><Icon type="left" /></div>
            <div className="content">
            <img className="pic1" src={pic1} alt=""></img>   
            <ul className="ul1">
                <li className="ul1-li1">
                    <p className="icon-user"></p>
                    <p className="ul1-li1-p">
                        <input type="text" value={user.username} onChange={(e) => {
                    let value = {
                        ...user,
                        username:e.target.value
                    }
                    changeuse(value)
                }}         
                className="ul1-li1-input" 
                placeholder="请输入手机号/邮箱">
                    </input>
                    </p>
                    </li>
                <li className="ul1-li2">
                <p className="icon-suo"></p>
                <p className="ul1-li2-p">
                    <input type="password" value={user.password} onChange={
                    (e)=>{
                        let value={
                            ...user,
                            password:e.target.value
                        }
                        changeuse(value)
                    }
                } 
                className="ul1-li2-input" placeholder="请输入密码">
                    </input>
                    </p>
                <a className="ul1-li2-a1" style={{display:"block"}} onClick={changeType}></a>
                <a className="ul1-li2-a1-none" style={{display:"none"}} onClick={changeType}></a>
                <a className="ul1-li2-a2" href="">忘记密码</a>
                </li>
                <li>
            <p style={{display:"none"}} className="ul1-li3-p">yyy</p>
                    <Button type="primary" className={buttonState()}>登录</Button>
                </li>
                <li className="ul1-li4"><a className="ul1-li4-a2">注册账号</a></li>
            </ul>
            </div>
        </div>
    )
}

export default Login