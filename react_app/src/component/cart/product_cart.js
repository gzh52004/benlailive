import React,{useContext, useState} from 'react'
import {useHistory}  from 'react-router-dom'
import antdMB ,{ Checkbox } from 'antd-mobile'

import {MyContext} from '../../store/store'
import '../../assets/public/common.css'
import './index.scss'

function ProductCart () {
    const state = useContext(MyContext)
    console.log(state)
    
    const history = useHistory();
    const [num,changenum] = useState(1)
    return (
       <div>
            <div className="none">
                <p className="title">购物车里还没有好吃的，您可以</p>
                <a onClick={()=> {
                    history.push('/home')
                }}>回首页逛逛</a>
            </div>
            <div className="have">
                <div className="tit">
                
                <p>还差99.00元包邮<a>去凑单</a></p>
                </div>
                <ul className='card'>
                    <li>
                    <Checkbox></Checkbox>
                    <div className="product_inf">
                        <img src="http://47.115.142.170:60005/uploads/homeImg/4defebb8-c619-4ec0-aaee-19ce9bcab961.jpg"/>    
                        <div className="inf">
                            <h3>乐纯纤酵青黄柠檬风味酸乳220g*3</h3>
                            <div className="price">
                                <p>￥<span>29.9</span></p>
                                <div className="quantity"><a className="jian" onClick={
                                    () => {
                                        if(num > 1) {
                                            changenum(num - 1)
                                        } else {
                                            changenum(1)
                                        }
                                        
                                    }
                                }>-</a><input value={num}
                                onChange={(e) => {
                                   let result = e.target.value
                                   changenum(result)
                                }}
                                /><a className="jia" onClick={
                                    () => {
                                        
                                            changenum(num + 1)
                                        
                                        
                                    }}>+</a></div>
                            </div>
                        </div>        
                    </div>
                    </li>
                </ul>
                <div className="white_space2"></div>
            </div>
        </div>  
    )
}

export default ProductCart;