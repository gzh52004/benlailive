
import React from 'react'
import Carousel from '../../component/Carousel'
import './home.scss'
function Home() {
    return (
        <div className='home'>

            <section className="container">
                <div>
                    <div className="index-top">
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
                <ul className="main-nav">
                    <div className="main-nav__item">
                        <li className="main-nav__item">
                            <a href="/app/main/162" className="main-nav__link main-nav__link--current">推荐</a>
                        </li>
                        <li className="main-nav__item">
                            <a href="/app/main/160" className="main-nav__link">水果</a>
                        </li>
                        <li className="main-nav__item"><a href="/app/main/154" className="main-nav__link">蔬菜</a>
                        </li>
                        <li className="main-nav__item"><a href="/app/main/150" className="main-nav__link">肉禽</a>
                        </li>
                        <li className="main-nav__item"><a href="/app/main/158" className="main-nav__link">水产 </a></li><li className="main-nav__item"><a href="/app/main/146" className="main-nav__link"> 粮油
      </a></li><li className="main-nav__item"><a href="/app/main/156" className="main-nav__link">
                            熟食
      </a></li><li className="main-nav__item"><a href="/app/main/152" className="main-nav__link">
                            乳品
      </a></li><li className="main-nav__item"><a href="/app/main/148" className="main-nav__link">
                            零食
      </a></li><li className="main-nav__item"><a href="/app/main/144" className="main-nav__link">
                            酒饮
      </a></li><li className="main-nav__item"><a href="/app/main/142" className="main-nav__link">
                            厨具
      </a></li></div></ul>
                <div className="main__body">
                    <div className="main__wrapper">
                        <ul className="main__floors">
                            <Carousel />
                            <li data-type="1" className="main__floor">

                            </li>
                            <li data-type="18" className="main__floor">
                                <a href="#" url-type="6" className="ad floor-18__ad">
                                    <img src="https://image.benlailife.com/AppHomePageImage/8575d2327e604a9e9b23d7d850febd23_n-n.jpg" alt="" className="ad__img" />
                                </a>
                            </li>
                            <li data-type="3" className="main__floor"><a href="#" url-type="6" className="ad floor-3__ad">
                                <img src="https://image2.benlailife.com/AppHomePageImage/fb7cbdaf84444a5d9998786bd9622e4f_n-n.jpg" alt="" className="ad__img" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default Home