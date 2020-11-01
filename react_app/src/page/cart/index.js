import request from '../../utils/request'
import React,{useState,useContext,useCallback,useEffect} from 'react'
import antdMB ,{ Icon, Checkbox ,Modal} from 'antd-mobile'
import {useHistory}  from 'react-router-dom'

import ProductCart from '../../component/cart/product_cart'
import GoodSelect from '../../component/cart/goodselect'


import {MyContext} from "../../store/store"
import '../../assets/public/common.css'
import './index.scss'


const alert = Modal.alert;
function Cart() {


    const{state,dispatch} = useContext(MyContext)
    const history = useHistory();
    
    const [isDel,changeDel] = useState(false)
    useEffect(function() {
        dispatch({type:'math_price'})
    },[])
    const checked = useCallback((allcheck)=>{
        dispatch({type:"allSelect",allcheck})
    })
    const sure_Del = useCallback(() => {
        dispatch({type:"del_product"})
    })
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
        <p onClick={() => {
            changeDel(!isDel)
            let allcheck = false
            checked(allcheck);
        }}>{isDel ? "完成":"编辑"}</p>
        <Icon type='ellipsis' size='md'></Icon>
        </div>
       </header>

       <div className="white_space"></div>
       <ProductCart></ProductCart>

       <GoodSelect del={!isDel}></GoodSelect>
       <div className="white_space3"></div>
       
       <footer>
       <div className="allcheck">
       <Checkbox key={state.allcheck} checked={state.allcheck} onClick={()=> {
        

           checked(!state.allcheck)
       }}>
       </Checkbox>
       <span>全选</span>
       </div>
       <div className="accounting">
           { isDel ? null : <div className="allPrice">
               合计:<span>￥{state.totalPrice}</span>
           </div>}
           {isDel ? <a  onClick={() =>
                                    alert("",'确定要删除该商品吗', [
                                      { text: '取消', onPress: () => {} },
                                      { text: '确定', onPress: () => {
                                         
                                          sure_Del();
                                          let allcheck = false
                                          checked(false);
                                        } },
                                    ])}>删除</a>:<a >
               去结算
           </a>}
       </div>
       </footer>
       </>
    )
}
// Cart = withAuth(Cart)
export default Cart