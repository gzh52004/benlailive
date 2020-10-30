import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { MyContext } from '../../store/store'
import request from '../../utils/request'
// import '../../assets/public/common.css'
// import './index.scss'


function GoodSelect(props) {

    const { state, dispatch } = useContext(MyContext);
    const [goodList, getGood] = useState([])
    const history = useHistory()
    useEffect(() => {
        (async () => {
            let num = parseInt((Math.random() * 15) + 1)
            let result = await request.get("/good/selectGood", {
                params: {
                    page: num,
                    pageSize: 20
                }
            })
            // 

            getGood(result.data.msg.list)

        })()
    }, []);
    const add_cart = useCallback((item) => {
        dispatch({ type: "add_to_cart", item })
    }, [state])
    return (

        <div className="good_Select" style={props.del ? null : { display: "none" }}>

            <img className="good_img" src="https://image8.benlailife.com/bd83f17b-3e00-4f90-a576-a8ff760e3dd9"></img>
            <div className="product_list">
                {
                    goodList.map((item) =>
                        <dl className="product" key={item._id}>
                            <span className="joinCart" onClick={
                                add_cart.bind(null, item)
                            }></span>
                            <a className="main" onClick={() => {
                                history.push({
                                    pathname: "/productInf/" + item._id
                                })
                            }}>
                                <dt>
                                    <img src={item.imageUrl} />
                                </dt>
                                <dd>
                                    <div className="name">
                                        <p>{item.productName}</p>

                                    </div>
                                    <p className="price">￥<span>{item.price.price}</span> {
                                        item.price.hasOrigPrice ? <b>{item.price.origPrice}</b> : null
                                    }</p>
                                </dd>
                            </a>
                        </dl>
                    )
                }


            </div>
        </div>
    )
}

export default GoodSelect;