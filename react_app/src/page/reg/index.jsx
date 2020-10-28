import React from 'react'
import './reg.scss'
import {Button,Icon} from 'antd-mobile';
import pic1 from './pic1.png'

function Reg() {
    const changeType = function(){
        let aaa =  document.getElementsByClassName("ul1-li2-input")
        let bbb = document.getElementsByClassName("ul1-li2-a1")
        let ccc = document.getElementsByClassName("ul1-li2-a1-none")
        console.log(aaa[0].type)
        if(aaa[0].type === "password"){
            aaa[0].setAttribute("type","text")
            console.log(bbb[0].style.display)
            bbb[0].style.display="none"
            ccc[0].style.display="block"
        }else{
            aaa[0].setAttribute("type","password")
            bbb[0].style.display="block"
            ccc[0].style.display="none"
        }
        
    }
    return (
        <div className="reg">
            <div className="return"><Icon type="left" /></div>
            <div className="content">

            <img className="pic1" src={pic1} alt=""></img>   
            <ul className="ul1">
                <li className="ul1-li1"><p className="icon-user"></p><p className="ul1-li1-p"><input type="text" className="ul1-li1-input" placeholder="请输入手机号/邮箱"></input></p></li>
                <li className="ul1-li2">
                <p className="icon-suo"></p><p className="ul1-li2-p"><input type="password" className="ul1-li2-input" placeholder="请输入密码"></input></p>
                <a className="ul1-li2-a1" style={{display:"block"}} onClick={changeType}></a>
                <a className="ul1-li2-a1-none" style={{display:"none"}} onClick={changeType}></a>
                </li>
                <li><Button type="primary">注册</Button></li>
                <li className="ul1-li4"><a className="ul1-li4-a2">登录账号</a></li>
            </ul>
            </div>
        </div>
    )
}

export default Reg