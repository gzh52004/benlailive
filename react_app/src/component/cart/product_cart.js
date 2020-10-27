import React from 'react'
import {useHistory}  from 'react-router-dom'
import antdMB ,{ Checkbox } from 'antd-mobile'
import '../../assets/public/common.css'
import './index.scss'

function ProductCart () {
    return (
       <div>
            <div className="none">
                <p className="title">购物车里还没有好吃的，您可以</p>
                <a>回首页逛逛</a>
            </div>
            <div className="have">
                <div className="tit">
                <Checkbox >
                    <b>冷链配</b>
                   
                </Checkbox>
                <p>还差99.00元包邮<a>去凑单</a></p>
                </div>
            </div>
        </div>  
    )
}

export default ProductCart;