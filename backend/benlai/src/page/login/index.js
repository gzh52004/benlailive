import React, { useEffect } from 'react'
import SHA256 from 'crypto-js/sha256'
import { Form, Input, Button, Checkbox, message } from 'antd';


import './login.scss'
import { login } from '../../utils/api'
// import axios from 'axios'



function setCookie(key, val, iday) {
    //key 键名，val 键值， iday 多少天后失效
    let time = new Date();
    let today = time.getDate();//日
    time.setDate(today + iday);
    document.cookie = key + '=' + val + ';expires=' + time + ';path=/';
}
//获取Cookie
function getCookie(key) {
    let str = document.cookie;
    // console.log(str);//name=小虎; age=18; adr=广东广州
    let arr = str.split('; ');
    // console.log(arr);
    for (let item of arr) {
        let arr2 = item.split('=');
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}
function Login(props) {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 16 },
    };
    const rules = {
        name: [
            { required: true, message: '用户名不能为空' },
        ],
        pwd: [
            { required: true, message: '密码不能为空' },
            { min: 6, max: 12, message: '密码长度为6到12位' }

        ]
    }
    useEffect(() => {
        if (getCookie('token')) {
            props.history.push('/home')
        }
    }, [])
    const onFinish = async (values) => {
        // console.log(values);
        values.pwd = SHA256(values.password).toString()
        console.log(values);
        // //登录
        const data = await login({
            name: values.name,
            pwd: values.pwd
        })
        console.log(data);
        if (data.code === 2005) {
            message.success('登录成功')

            //把用户信息存入redux
            // const action = { type: 'login', user: data.data }
            // store.dispatch(action)
            // console.log('newstate=', store.getState());
            // const actions = { type: 'update_user', user: { phone: 13888888888, password: 123456 } }
            // store.dispatch(actions)
            // console.log('actions=', store.getState());

            // props.dispatch({ type: 'login', user: data.data })


            // console.log('loginprops=', props);
            // props.login(data.data)
            //redux-saga
            // props.dispatch({ type: 'login_async', data: values })
            //获取到高阶组件传过来的组件名称（通过props.location.search 提取）
            // console.log('login-props', props.location.search);//?targeturl=add
            // const pathname = props.location.search.match(/targeturl\=([\/\w\-]+)/);
            // console.log(pathname);
            // let paths;
            // if (pathname) {
            //     paths = pathname[1]
            // }
            localStorage.setItem('name', JSON.stringify(values.name))
            //七天免登录 把token存到本地浏览器
            if (values.remember) {

                setCookie('token', data.token, 7);
            } else {
                // sessionStorage.setItem('user', JSON.stringify(data.token))
                setCookie('token', data.token, -1);
            }
            props.history.push('/home')

        } else {
            message.error('登录失败')
        }

    }
    return (
        <div className="login" style={{
            background: "url('./logo.jpg')"
        }}>
            <div className="box">
                <h1 style={{ color: 'blue', fontSize: 50 }}>本来生活网后台系统</h1>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}

                    onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={rules.name}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="pwd"
                        rules={rules.pwd}

                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>七天免登录</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
