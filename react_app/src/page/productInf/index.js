import React,{useEffect,useState,useContext,useCallback} from 'react';
import {useHistory} from "react-router-dom"
import request from "../../utils/request"
import { Toast,Icon} from 'antd-mobile';

import {MyContext} from "../../store/store"
import '../../assets/public/common.css'
import './index.scss'

function productInf () {
const history = useHistory();
 const [product,getProduct] = useState({})
 const {state,dispatch} = useContext(MyContext)
    useEffect(() => {
     
        let arr = history.location.pathname.split("/")
        let result =  request.get("/good/selectGood",{params:{
            findQuery:{
                _id:arr[2]
            }
         }}).then(res => {
            getProduct(res.data.msg.list[0])
             
         }).catch((err) => {
             alert(err)
         })
        //  console.log(result)
    },[])
    const addCart = useCallback((item) => {
        dispatch({type:"add_to_cart",item})
    })
    return (
        <div>
            <div className ="head"> 
            <Icon type='left' size='lg' onClick={() => {
               history.goBack(-1)
           }}></Icon></div>
        <img src={product.imageUrl}></img>
        <div className="infomation">
            <div className="price">
    <p>￥<span>{product.price ? product.price.price : null}</span></p>
                <p>￥{product.price ? product.price.origPrice : null}</p>
    {product.promotionsTags ? product.promotionsTags.map(item => <span key={item} className="tag">{item}</span>): null}
            </div>
    <div className="name">{product.productName}</div>
    <div className="text">{product.promotionWord}</div>
    <div className="white_space"></div>
        </div>
        <div className="join"> 
        <div onClick={
            () =>{
                addCart(product)
                Toast.success('加入购物车成功', 1);
            }
           
         }>加入购物车</div>
        </div>
        </div>

       
    )
}

export default productInf