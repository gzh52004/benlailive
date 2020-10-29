import React, { useEffect, useState } from 'react'
import Carousel from '@/component/Carousel'
import Request from '@/utils/GetHomeCategory'
import axios from 'axios'
var source = axios.CancelToken.source()
function Homemain(props) {
    const [databanner, changeDatabanner] = useState([])//轮播图数据
    const [datalist, changeDatalist] = useState([])//页面轮播图下面导航数据
    const [datamap, changeDatamap] = useState([])//模版图数据
    const [datacart, changeDatacart] = useState([])//页面小购物车数据
    const [dataID, changes] = useState(props.location.pathname.slice(11))
    useEffect(() => {
        (async () => {
            changes(props.location.pathname.slice(11))//获取id
            // console.log('dataID', dataID);
            let { data: { msg } } = await Request.get('/home/Gethomepage', {
                params: {
                    findQuery: { _id: dataID }
                }

            })
            // console.log('Homemain', msg.list[0].data);
            if (msg.list) {
                const banner = msg.list[0].data[0];
                changeDatabanner(banner)
                const maps = msg.list[0].data.filter((item, index) => index < 5 && index > 2)
                changeDatamap(maps)
                const lists = msg.list[0].data.filter((item, index) => index < 3 && index > 0)
                changeDatalist(lists)
                const carts = msg.list[0].data.filter((item, index) => index > 4)
                changeDatacart(carts)
            }
        })()

        return function () {
            // source.cancel('组件卸载,取消请求');
            (state, callback) => {
                return
            }
        }
    }, [])

    // console.log('datalist', databanner, datalist, datamap, datacart);
    return (

        <div>
            <div className="main__body">
                <div className="main__wrapper">

                    <ul className="main__floors">
                        <Carousel databanner={databanner} />
                        <li data-type="23" className="main__floor">
                            {
                                datalist.map(item => <ul className="floor-23" key={item.modelID}>{
                                    item.list.map(item => <li key={item.sysNo} className="floor-23__item"><a href="#" url-type="6" className="ad floor-23__ad">
                                        <img src={item.img} alt="" className="ad__img" /></a></li>)
                                }
                                </ul>)
                            }
                        </li>
                        <li data-type="22" className="main__floor">
                            {
                                datacart.map(item => <div className="floor-22 " key={item.modelID}>
                                    <div href="#" className="floor-22__title"><img src={item.banner.img} className="floor-22__img" /></div>
                                    {
                                        item.modelSEDetail.map(item => <div key={item.sysNo} className="product-l"><a href="/gz/product/474472" className="product-l__pro"><dt className="product-l__left">  <img src={item.product.imageUrl} className="product-l__img" /></dt> <dd className="product-l__right"><p className="product-l__name">{item.product.productName}
                                        </p> <p className="product-l__text"> {item.product.promotionWord}</p> <p className="product-l__ico">冷链配</p> <p className="product-l__price">¥
                                    <span className="product-l__price--int">{item.product.price.price}</span><font className="product-l__price--old">¥{item.product.price.origPrice}
                                                </font></p></dd></a> <a href="#" className="product-l__btn"></a></div>)
                                    }
                                </div>)
                            }
                        </li>

                    </ul>
                    <div data-v-f01700b8="" className="index_new_foot"><dl data-v-f01700b8=""><dt data-v-f01700b8="" className="index_new_foot__dt"><a data-v-f01700b8="" href="/" className="index_new_foot__noline">手机站</a> <a data-v-f01700b8="" id="pchome" href="//www.benlai.com/Home/PC" className="index_new_foot__noline">电脑版</a> <a data-v-f01700b8="" id="openAppFoot" rel="nofollow" className="index_new_foot__noline">APP下载</a></dt> <dd data-v-f01700b8="" className="index_new_foot__dd">
                        ©  Benlai.com. All Rights Reserved.<br data-v-f01700b8="" />北京本来工坊科技有限公司&nbsp;&nbsp;&nbsp;4006-917-917
    </dd></dl></div>
                </div>
            </div>
        </div>
    )
}
export default (props) => <Homemain {...props} key={props.location.pathname} />