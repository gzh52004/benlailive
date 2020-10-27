import request from '../../utils/request'
import React,{useState,use} from 'react'
import antdMB ,{ Icon, Checkbox } from 'antd-mobile'
import {useHistory}  from 'react-router-dom'

import ProductCart from '../../component/cart/product_cart'
import GoodSelect from '../../component/cart/goodselect'

import '../../assets/public/common.css'
import './index.scss'
// let findQuery = {
//     _id:'5f953467bceb3b39304c7e48'
// }


//  request.get("/home/Gethomepage",{params:{
//      findQuery
//  }}).then(res => {
//      console.log(res.data)
//  })



function Cart() {
    const history = useHistory();
    const [ischeck,changeCheck] = useState(false)
    
    return (
        <>
       <header> 
           <Icon type='left' size='lg' onClick={() => {
               history.goBack(-1)
           }}></Icon>
           <div className="cart_title">
               <h3>购物车</h3>
               <p>配送至：上海市</p>
           </div>
       
        <div className="edit">
        <p>编辑</p>
        <Icon type='ellipsis' size='md'></Icon>
        </div>
       </header>

       <div className="white_space"></div>
       <ProductCart></ProductCart>

       <GoodSelect></GoodSelect>
       <div className="white_space3"></div>
       
       <footer>
       <div className="allcheck">
       <Checkbox key={ischeck} checked={ischeck} onClick={()=> {
           changeCheck(!ischeck);
       }}>
       </Checkbox>
       <span>全选</span>
       </div>
       <div className="accounting">
           <div className="allPrice">
               合计:<span>￥0</span>
           </div>
           <a href="###">
               去结算
           </a>
       </div>
       </footer>
       </>
    )
}
export default Cart