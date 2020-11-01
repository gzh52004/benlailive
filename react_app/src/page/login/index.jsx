import React,{useState} from 'react'
import './login.scss'
import {Button,Icon} from 'antd-mobile';
import CryptoJS from 'crypto-js';
import pic1 from './pic1.png'
import {NavLink} from 'react-router-dom'
import request from '../../component/request'
import {useHistory}  from 'react-router-dom'

function Login(props) {
    const history = useHistory();
    const [dis4,changeType2] = useState("none")
    const [dis5,changeMsg] = useState("")
    const checkInput = async function(){
        if(user.username.length != 11){
            (function (){
                changeType2("block")
            })();
            (function (){
                changeMsg("账号格式错误")
            })()
            
             }else{
                (function (){
                    changeType2("none")
                })();
               const {data} = await request.get('/user/checkname?',{
                    params:{
                        name:user.username
                    }
                })
                if(data.code === 2000){
                    user.password = CryptoJS.SHA256(user.passowrd).toString();
                    // console.log(user.password,666)
                    (function (){
                        changeType2("none")
                    })()
                    const {data} = await request.get('user/login',{
                        params:{
                            name:user.username,
                            pwd:user.password
                        }
                    })
                    console.log(data,"嘤嘤嘤")
                    if(data.code===2005){
                        props.history.push({
                                    pathname: '/home',
                                    state: { name: user.username }
                                })
                                console.log(user.username)
                                // const pathname = search.match(/targetUrl\=([\w-\]+)/)
                                localStorage.setItem('currentUser',data.token)
                                localStorage.setItem('INFO',user.username)
                                sessionStorage.setItem('currentUser',data.token)
                                sessionStorage.setItem('INFO',user.username)
                    }
                    // console.log(data)
                }else{
                    (function (){
                        changeType2("block")
                    })();
                    (function (){
                        changeMsg("账号或密码错误")
                    })()
                }
                }
        }
        //点击眼睛明文/密文显示密码
        const [type,changeType] = useState("password")
        const [display1,changeDis1] = useState("block")
        const [display2,changeDis2] = useState("none")
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
            <div className="return"><Icon onClick={()=>{history.goBack(-1)}} type="left" /></div>
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
                    <input type={type} value={user.password} onChange={
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
                <a className="ul1-li2-a1" style={{display:display1}} onClick={() => {
                    changeType("text")
                    changeDis1("none")
                    changeDis2("block")
                }}></a>
                <a className="ul1-li2-a1-none" style={{display:display2}} onClick={()=>{
                    changeType("password")
                    changeDis2("none")
                    changeDis1("block")
                }}></a>
                <a className="ul1-li2-a2" href="">忘记密码</a>
                </li>
                <li>
            <p style={{display:dis4}} className="ul1-li3-p">{dis5}</p>
                    <Button type="primary" onClick={checkInput} className={buttonState()}>登录</Button>
                    </li>
                <li className="ul1-li4"><NavLink className="ul1-li4-a2" to="/reg">注册账号</NavLink></li>
            </ul>
            </div>
        </div>
    )
}

export default Login