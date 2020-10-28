
import React, { useState } from 'react'
import { NavLink, Route, Redirect } from 'react-router-dom'


import './home.scss'
import Homemain from './homeMain'
const memu = [
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
function Home() {


    return (
        <div className='home'>
            <section className="container">
                <div >
                    <div className="index-top" style={{ position: "fixed", top: 0 }}>
                        <a href="#" className="index-top__city" style={{ opacity: 1 }}>上海</a>
                        <div className="index-top__input">
                            <a href="#" className="index-top__clear">
                                <img src="//image.benlailife.com/mstatic/img/login_n_ico05.b19588a.png" className="index-top__clear-img"></img>
                            </a>
                            <input autoComplete="off" name="quersy" type="text" value="" placeholder="褚橙" readOnly="readonly" className="index-top__text"></input>
                        </div>
                        <div className="index-top__uhide" style={{ opacity: 1 }}>
                            <a href="/userHome" className="index-top__uhide--personal" style={{ display: 'none' }}></a>
                            <a href="#/login" className="index-top__uhide--link" style={{ opacity: 1 }}>登录</a>
                        </div>
                    </div>

                </div>
                <ul className="main-nav" style={{ position: "fixed", top: '0.88rem', background: "#fff", zIndex: 2 }}>
                    <div className="main-nav__item">
                        {
                            memu.map(item => <li className="main-nav__item" key={item.id}>
                                <NavLink to={`/home/main/${item.id}`} activeClassName='main-nav__link--current'
                                    className="main-nav__link">{item.title}</NavLink>
                            </li>)
                        }
                    </div>
                </ul>
                {/* <li data-type="1" className="main__floor">

                        </li>
                        <li data-type="18" className="main__floor">
                            <a href="#" url-type="6" className="ad floor-18__ad">
                                <img src="https://image.benlailife.com/AppHomePageImage/8575d2327e604a9e9b23d7d850febd23_n-n.jpg" alt="" className="ad__img" />
                            </a>
                        </li>
                        <li data-type="3" className="main__floor"><a href="#" url-type="6" className="ad floor-3__ad">
                            <img src="https://image2.benlailife.com/AppHomePageImage/fb7cbdaf84444a5d9998786bd9622e4f_n-n.jpg" alt="" className="ad__img" /></a>
                        </li> */}
                <Route to="/home/main/:id" component={Homemain} />
                <Redirect from='/home' to="/home/main/5f95340fff761e23c8a2a92f" exact />
            </section>

        </div>

    )
}
export default Home