
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { Redirect, Route, } from 'react-router-dom'
import Request from '../../utils/GetHomeCategory'

import './list.scss'
const memu = [
    { id: '5f94598c108e4b4264d0f927', title: '镇店之宝', },
    { id: '5f945a7e9a935622a46d9336', title: '水果', },
    { id: '5f945aa03be7481d1c63fec2', title: '蔬菜', },
    { id: '5f945abfcf1101043c7eac27', title: '肉禽蛋品', },
    { id: '5f945b224bc9310dec81fdb3', title: '水产海鲜', },
    { id: '5f945b3dee037a3a80bc35be', title: '熟食面点', },
    { id: '5f945b5bd2ff5b233414e880', title: '粮油副食', },
    { id: '5f945b7818573f47ac49b1a5', title: '乳品烘培', },
    { id: '5f945b9257d66e14d83c6a49', title: '休闲食品', },
    { id: '5f945bb8ac12ce1064eb3235', title: '酒水茶饮', },
    { id: '5f945bcd57ab9520d8a98231', title: '厨房用品', },
    { id: '5f945be96573641d146795c0', title: '鲜花花艺', },
    { id: '5f945bfec3e3ae224cf3ebea', title: '礼品礼盒', },
    { id: '5f945c1313a18b1facf5d4ae', title: '扶贫助农', },
]

function List(props) {
    const [id, changeId] = useState(memu[0].id)
    const [data, changeData] = useState({})
    const [currentID, changecurrentID] = useState(memu[0].id)//高亮
    useEffect(() => {

        Request.get('/classify/select', {
            params: {
                findQuery: { _id: id }
            }
        }).then(res => {
            console.log(res.data.msg.list[0]);
            changeData(res.data.msg.list[0])
        })

    }, [id])
    useLayoutEffect(() => {
        // console.log(props.location.pathname.slice(6));
        changecurrentID(props.location.pathname.slice(6))
        changeId(props.location.pathname.slice(6))
    })
    // const changeID = useCallback(function (id) {
    //     changeId(id)
    // }, [])
    return (
        <div className="list">
            <section className="container">
                <div className="category-top"><div className="category-top__location">
                    广州
  </div> <div className="category-top__search">
                        褚橙
    <a href="#" className="category-top__search-clear"></a></div></div>
                <div className="category__body">
                    <ul className="category__list">
                        {
                            memu.map((item) => <li key={item.id} className="category__item"

                            ><a
                                onClick={() => {
                                    console.log(props);
                                    changeId(item.id)
                                    changecurrentID(item.id)
                                    props.history.push('/list/' + item.id)

                                }}
                                className={currentID == item.id ? "category__link nuxt-link-exact-active nuxt-link-active" : "category__link nuxt-link-exact-active"} aria-current="page">
                                    {item.title}
                                </a></li>)
                        }



                    </ul>
                    {


                        // console.log(data.category ? data.category[0].parentSysNo : 123)
                        //  data.menu(item => {
                        //     if (item.sysNo == data.category[0].parentSysNo) {
                        //         return item.name
                        //     }
                        // })[0] 
                    }
                    {

                        <div className="category__main">
                            <ul className="category__ads"></ul>
                            <a href="#" className="category__link-super">全部{data.menu && data.category ? data.menu.filter(item => {
                                if (item.sysNo == data.category[0].parentSysNo) {
                                    return item.name
                                }
                            })[0].name : null}</a>
                            {
                                data.category ? data.category.map(item => <dl className="category__level-2" key={item.name}>
                                    <dt ><a href="/showCategory/search.html?c2=2230" className="category__link-2">
                                        {item.name}
                                    </a></dt>
                                    <dd>
                                        <ul className="category__group">
                                            {
                                                item.children.map(item => <li key={item.name} className="category__item"><a className="category__item-link"><img src={item.imgUrl} alt="褚橙/云冠橙" className="category__item-img" /> <span className="category__item-name">
                                                    {item.name}</span></a></li>
                                                )}
                                        </ul>
                                    </dd>
                                </dl>) : null}

                        </div>
                    }
                </div>

            </section>
            {/* <Route to="/list/:id" component={List} /> */}
            <Redirect from='/list' to="/list/5f94598c108e4b4264d0f927" exact />
        </div>
    )
}
export default List