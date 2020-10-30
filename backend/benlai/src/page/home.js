import React, { useCallback, useEffect, useState, useLayoutEffect } from 'react'
import { Layout, Menu, Breadcrumb, Button, Dropdown, message } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, DownOutlined, HomeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

import './home.scss'
import Api from '../utils/api'
import { Redirect } from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const homedatas = [
    // { id: '5f966c424df73a2010257ee5', title: '推荐', },
    { id: '5f95340fff761e23c8a2a92f', title: '水果', },
    { id: '5f953467bceb3b39304c7e48', title: '蔬菜', },
    { id: '5f9534c6a4f30e0908d9df21', title: '肉禽', },
    { id: '5f9534f6e181b6041436ff0c', title: '水产', },
    { id: '5f95359745425c0cf870720c', title: '粮油', },
    { id: '5f9535eb6586091148e3ea43', title: '熟食', },
    { id: '5f9536715919801b88a11c2b', title: '乳品', },
    { id: '5f95362cd68519478498cb56', title: '零食', },
    { id: '5f9536aa6899df20dcd6833e', title: '酒饮', },
    { id: '5f9536ff3d483f20a43d6348', title: '厨具', },
]
function setCookie(key, val, iday) {
    //key 键名，val 键值， iday 多少天后失效
    let time = new Date();
    let today = time.getDate();//日
    time.setDate(today + iday);
    document.cookie = key + '=' + val + ';expires=' + time + ';path=/';
}
function Home(props) {
    const [name, changename] = useState('')//登录用户名
    const [id, changeid] = useState(homedatas[0].id)//首页数据id
    const [alldata, changealldata] = useState([])//渲染到页面的数据
    //获取用户名
    useEffect(() => {


        (async () => {
            // console.log(JSON.parse(localStorage.getItem('name')));
            changename(JSON.parse(localStorage.getItem('name')))
            // console.log(props.location.pathname.slice(11));
            // changeid(props.location.pathname.slice(11))
            let data = await Api.homedata({
                findQuery: { _id: id }
            })
            // console.log(data.msg.list[0].data.splice(5).map(item => item.modelSEDetail).flat());
            console.log(data.msg.list[0].data.filter((item, index) => index > 4));
            console.log(data.msg.list[0].data.filter((item, index) => index > 4).map(item => item.modelSEDetail).flat());
            if (data.msg.list[0]) {
                // let datas = data.msg.list[0].data.splice(5).map(item => item.modelSEDetail).flat()
                changealldata(data.msg.list[0].data.filter((item, index) => index > 4).map(item => item.modelSEDetail).flat())
            }

        })()
    }, [id])
    // useLayoutEffect(() => {
    //     // console.log(props.location.pathname.slice(6));
    //     changeid(props.location.pathname.slice(6))
    // }, [])
    //根据id获取首页商品数据
    const homelist = useCallback((ids) => {
        console.log(ids);
        props.history.push('/home/home/' + ids)
    }, [id])
    const onClick = ({ key }) => {
        if (key == 2) {
            message.info(`退出成功`);
            //清除cookie
            setCookie('token', '', -1);
            props.history.push('/login')
        } if (key == 1) {
            message.info(`个人信息`);
        }
    };
    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="1">个人信息</Menu.Item>
            <Menu.Item key="2">退出</Menu.Item>
        </Menu>
    );
    return (

        <div className="home">
            <Layout style={{ height: '100%' }}>
                <Header className="header">
                    <h1 style={{ color: '#58bc58' }}>本来生活网后台系统</h1>

                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            欢迎，{name}<DownOutlined />
                        </a>
                    </Dropdown>
                    {/* <Button type="link">退出</Button> */}
                </Header>
                <Layout className="main">
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<HomeOutlined />} title="首页商品">
                                {
                                    homedatas.map(item => <Menu.Item
                                        onClick={homelist.bind(null, item.id)}
                                        key={item.id}>{item.title}</Menu.Item>)
                                }
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<UserOutlined />} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><h2 style={{ color: 'red' }}>用户信息</h2></Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <div className="title">
                                用户名：<input type="text" />id：<input type="text" /><div className="right"><button>查询</button><button>添加</button></div>
                            </div>
                            <table >
                                <thead>
                                    <tr className="tr">
                                        <th>序号</th>
                                        <th>id</th>
                                        <th style={{ flex: 2 }}>产品描述</th>
                                        <th>价格</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        alldata.length ? alldata.map((item, index) => <tr className="activetwo" key={item.sysNo}>
                                            <td>{index + 1}</td>
                                            <td>{item.sysNo}</td>
                                            <td style={{ flex: 2 }}>{item.product.productName}</td>
                                            <td>{item.product.price.price}</td>
                                            <td>
                                                <button >完成</button>
                                                <button>删除</button>
                                            </td>
                                        </tr>) : null
                                    }

                                </tbody>
                            </table>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            <Redirect from='/home' to="/home/home/5f95340fff761e23c8a2a92f" />
        </div>
    )
}

export default Home 