import React, { useCallback, useEffect, useState, useLayoutEffect, useRef } from 'react'
import { Layout, Menu, Breadcrumb, Button, Dropdown, message, Input, Pagination } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, DownOutlined, HomeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

import './home.scss'
import Api from '../../utils/api'
import { Redirect, Route } from 'react-router-dom';
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
    const inputidref = useRef(null)
    const inputSPref = useRef(null)
    const inputPriceref = useRef(null)
    const [inputid, changeinputid] = useState('')//id
    const [inputshangpin, changeinputshangpin] = useState('')//商品
    const [inputprice, changeinputprice] = useState('')//商品
    const [name, changename] = useState('')//登录用户名
    const [id, changeid] = useState(homedatas[0].id)//首页数据id
    const [alldata, changealldata] = useState([])//渲染到页面的数据
    const [cpment, changecpment] = useState(1)//切换组件
    //goods
    const [goodsDatas, changegoods] = useState([])
    const [page, changepage] = useState(1)
    const [pageSize, changepageSize] = useState(8)
    const [goodsid, changegoodsid] = useState('');//goodsID

    //获取用户名
    useEffect(() => {
        (async () => {
            // console.log(JSON.parse(localStorage.getItem('name')));
            changename(JSON.parse(localStorage.getItem('name')))

            console.log(props.location.pathname.slice(11));
            // changeid(props.location.pathname.slice(11))
            let data = await Api.homedata({
                findQuery: { _id: id }
            })
            // console.log(data.msg.list[0].data.filter((item, index) => index > 4).map(item => item.modelSEDetail).flat());//所有水果数据
            if (data.msg.list) {
                // console.log(data.msg.list[0].data.filter((item, index) => index > 4));//水果的大分类
                // console.log(data.msg.list[0].data.splice(5).map(item => item.modelSEDetail).flat());
                // data.msg.list[0].data.splice(5).map(item => item.modelSEDetail).flat()
                changealldata(data.msg.list[0].data.filter((item, index) => index > 4).map(item => item.modelSEDetail).flat())
            }

        })()
    }, [id])
    useLayoutEffect(() => {
        // console.log(props.location.pathname.slice(6));
        changeid(props.location.pathname.slice(11))
    })
    //根据id获取首页商品数据
    const homelist = useCallback((ids) => {
        // console.log(ids);
        props.history.push('/home/home/' + ids);
        changeid(ids)
    }, [])
    //模糊查询
    const search = useCallback(() => {
        // console.log('search', inputid, inputshangpin);
        if (inputshangpin.trim() && !inputid.trim()) {
            Api.searchdataID({
                findQuery: { productName: inputshangpin.trim() }
            }).then(res => {
                console.log(res);
                let arr = []
                if (res.code == 2004) {

                    res.msg.list.forEach(item => {
                        let obj = {}
                        obj.product = item;
                        arr.push(obj)
                    })
                    console.log(arr);
                    changealldata(arr)
                    changegoods(res.msg.list)//goods
                    changeinputshangpin('')//清空
                    inputSPref.current.focus();

                } else {
                    changealldata([])
                    message.error(`找不到对应商品`);
                    changeinputshangpin('')//清空
                    inputSPref.current.focus();
                }

            })
        } else {
            Api.searchdataID({
                findQuery: { productSysNo: inputid.trim() }
            }).then(res => {
                console.log(res);
                let arr = []
                if (res.code == 2004) {
                    res.msg.list.forEach(item => {
                        let obj = {}
                        obj.product = item;
                        arr.push(obj)
                    })
                    console.log(arr);
                    changealldata(arr)//首页
                    changegoods(res.msg.list)//goods
                    changeinputid('')//清空
                    inputidref.current.focus();
                } else {
                    changealldata([])
                    message.error(`找不到对应商品`);
                    changeinputid('')//清空
                    inputidref.current.focus();
                }

            })
        }
    }, [inputid, inputshangpin])
    //价格排序
    const priceSearch = useCallback(() => {
        Api.searchprice({
            findQuery: { _id: id }
        }).then(res => {
            console.log(res);
            // let arr = []
            // if (res.code == 2004) {

            //     res.msg.list.forEach(item => {
            //         let obj = {}
            //         obj.product = item;
            //         arr.push(obj)
            //     })
            //     console.log(arr);
            //     changealldata(arr)
            // } else {
            //     changealldata([])
            //     message.error(`找不到对应商品`);
            // }

        })

    })
    //获取输入id
    const iddata = useCallback((e) => {
        // console.log(e.currentTarget.value);
        changeinputid(e.currentTarget.value)
    })
    //获取输入商品信息
    const shangpindata = useCallback((e) => {
        // console.log(e.currentTarget.value);
        changeinputshangpin(e.currentTarget.value)
    })
    //获取输入商品价格
    const pricedata = useCallback((e) => {
        console.log(e.currentTarget.value);
        changeinputprice(e.currentTarget.value)
    })
    const onClick = ({ key }) => {
        if (key == 2) {
            message.error(`退出成功`);
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



    const gotoGoods = useCallback(() => {
        changecpment(2)
        props.history.push('/home/goods')
        inputSPref.current.focus();
    })
    const changepageFn = useCallback(function (page, pageSize) {
        console.log(page, pageSize);
        changepage(page)
        changepageSize(pageSize)
    })
    useEffect(() => {
        if (cpment == 2) {
            Api.goodsdata({
                pageSize,
                page,
            }).then(res => {
                console.log(res);
                if (res.code == 2004) {
                    changegoods(res.msg.list)
                }
            })
        }

    }, [cpment, pageSize, page])
    //删除商品
    // useEffect(() => {
    //     if (cpment == 2) {
    //         Api.deleteGoods(
    //             { _id: goodsid }
    //         ).then(res => {
    //             console.log(res);
    //         })
    //     }
    // }, [goodsid])
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
                <Layout className="main" >
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<HomeOutlined />} title="首页商品"
                                onClick={() => {
                                    changecpment(1)
                                }}
                            >
                                {
                                    homedatas.map(item => <Menu.Item active={item.id}
                                        onClick={homelist.bind(null, item.id)}
                                        key={item.id}>{item.title}</Menu.Item>)
                                }
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="商品管理"
                                onClick={gotoGoods}
                            >
                                <Menu.Item key="10">商品详情</Menu.Item>
                                <Menu.Item key="8">订单管理</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<UserOutlined />} title="用户信息">
                                <Menu.Item key="9">会员管理</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={cpment == 1 ? { padding: '0 24px 24px' } : { padding: '0 24px 24px', display: 'none' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><h2 style={{ color: 'red' }}>首页商品信息</h2></Breadcrumb.Item>
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
                                商品搜索：<Input type="text" style={{ height: 32, width: 150 }}
                                    onChange={shangpindata} value={inputshangpin} ref={inputSPref}
                                />
                                id搜索：<Input style={{ height: 32, width: 80 }} ref={inputidref}
                                    onChange={iddata} value={inputid} />
                                <div className="right">
                                    <Button type="primary" htmlType="submit"
                                        onClick={search}
                                    >查询</Button>
                                </div>
                            </div>
                            <table >
                                <thead>
                                    <tr className="tr">
                                        <th>序号</th>
                                        <th>id</th>
                                        <th style={{ flex: 2 }}>产品描述</th>
                                        <th
                                            onClick={priceSearch}
                                        >价格</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        alldata.length ? alldata.map((item, index) => <tr className="activetwo" key={item.product.productSysNo * Math.random()}>
                                            <td>{index + 1}</td>
                                            <td>{item.product.productSysNo}</td>
                                            <td style={{ flex: 2 }}>{item.product.productName}</td>
                                            <td>{item.product.price.price}</td>
                                            <td>
                                                {/* <button >完成</button> */}
                                                {/* <button>删除</button> */}
                                                <Button type="primary" htmlType="submit" >删除</Button>
                                            </td>
                                        </tr>) : null
                                    }

                                </tbody>
                            </table>
                        </Content>
                    </Layout>
                    <Layout style={cpment == 2 ? { padding: '0 24px 24px' } : { padding: '0 24px 24px', display: 'none' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><h2 style={{ color: 'red' }}>全部商品信息</h2></Breadcrumb.Item>
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
                                商品：<Input type="text" style={{ height: 32, width: 150 }}
                                    onChange={shangpindata} value={inputshangpin} ref={inputSPref}
                                />
                                id：<Input style={{ height: 32, width: 80 }} ref={inputidref}
                                    onChange={iddata} value={inputid} />
                                     价格：<Input style={{ height: 32, width: 80 }} ref={inputPriceref}
                                    onChange={pricedata} value={inputprice} />
                                <div className="right">
                                    <Button type="primary" htmlType="submit"
                                        onClick={search}
                                    >查询</Button>
                                    <Button type="primary" htmlType="submit"
                                        onClick={search}
                                    >添加</Button>
                                    <Button type="primary" htmlType="submit"
                                        onClick={search}
                                    >修改</Button>
                                </div>
                            </div>
                            <table >
                                <thead>
                                    <tr className="tr">
                                        <th>序号</th>
                                        <th>id</th>
                                        <th style={{ flex: 2 }}>产品描述</th>
                                        <th
                                            onClick={priceSearch}
                                        >价格</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        goodsDatas.length ? goodsDatas.map((item, index) => <tr className="activetwo" key={item._id}>
                                            <td>{(page - 1) * pageSize + index + 1}</td>
                                            <td>{item.productSysNo}</td>
                                            <td style={{ flex: 2 }}>{item.productName}</td>
                                            <td>{item.price.price}</td>
                                            <td>
                                                {/* <button >完成</button> */}
                                                {/* <button>删除</button> */}
                                                <Button type="primary" htmlType="submit"
                                                    onClick={() => {
                                                        console.log(item._id);
                                                        changegoodsid(item._id)
                                                    }}
                                                >删除</Button>
                                            </td>
                                        </tr>) : null
                                    }

                                </tbody>
                            </table>
                            <Pagination defaultCurrent={1} total={700} pageSizeOptions={[5, 8, 10, 20]} onChange={changepageFn} style={{ paddingTop: 20 }} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            {/* <Redirect from='/home' to="/home/home/5f95340fff761e23c8a2a92f" exact /> */}
            {/* <Route to="/home/goods" component={} /> */}
        </div>
    )
}

export default Home 