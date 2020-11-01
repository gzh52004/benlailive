import React,{useContext, useState,useEffect,useCallback} from 'react'
import {useHistory}  from 'react-router-dom'
import antdMB ,{ Checkbox, Modal } from 'antd-mobile'

const alert = Modal.alert;

import {MyContext} from '../../store/store'
import '../../assets/public/common.css'
import './index.scss'

function ProductCart () {
    const {state,dispatch} = useContext(MyContext)
    // console.log(dispatch)
    
    const history = useHistory();
    // const [num,changenum] = useState(1)
    const select = useCallback((item) => {
        dispatch({type:'product_select',item})
        dispatch({type:'math_price'})
    },[state])
    const jian = useCallback((item) => {
        dispatch({type:"prev_num",item})
        dispatch({type:'math_price'})
    },[state])
    const jia = useCallback((item) => {
        dispatch({type:"inc_num",item})
        dispatch({type:'math_price'})
         
    },[state])
    const changenum = useCallback((item,num) => {

        dispatch({type:"change_num",payload:{item,num}})
    },[state])
    const del_pro = useCallback((item) => {
        dispatch({type:"remove_from_cart",item})
    })
    const controlAll = useCallback(() =>{
        dispatch({type:"checkAll"})
        
    })
    const coldCheck = useCallback(() => {
        // console.log(name)
        dispatch({type:"select_cold"})
    })
    const hotCheck = useCallback(() => {
        // console.log(name)
        dispatch({type:"select_hot"})
    })
    return (
       <div>
           { state.cold_product.length || state.hot_product.length ?   (() =>{
               let data = null
               let data1 = null
               if(state.cold_product.length) {
                 data = <div className="have">
                <div className="tit">
               <div><Checkbox checked={state.check_cold} onClick={() => {coldCheck()
                  dispatch({type:'math_price'})
            }}></Checkbox>冷链配</div>
    {state.postPrice_cold > 0 ? <p>还差{state.postPrice_cold ? state.postPrice_cold.toFixed(2): 99.00}元包邮<a>去凑单</a></p> : <p>已包邮</p>}
                </div>
                <ul className='card'>
                    {
                        state.cold_product.map((item) => 
                        <li key={item._id}>
                    <Checkbox checked={item.ischeck} onClick={() => {
                        select(item),
                        controlAll();
                    }}></Checkbox>
                    <div className="product_inf">
                        <img src={item.imageUrl}/>    
                        <div className="inf">
                            <h3>{item.productName}</h3>
                            <div className="price">
                                <p>￥<span>{item.price.price}</span></p>
                                <div className="quantity"><a className="jian" onClick={
                                    jian.bind(null,item)
                                }>-</a><input value={item.num}
                                onChange={(e) => {
                                   let result = e.target.value
                                   changenum(item,result)
                                }}
                                onBlur={ item.num == false ?  () =>
                                    alert("",'确定要删除该商品吗', [
                                      { text: '取消', onPress: () => {changenum(item,1)} },
                                      { text: '确定', onPress: () => {del_pro(item)} },
                                    ]) : null 
                                  }
                                /><a className="jia" onClick={
                                    jia.bind(null,item)
                                    }>+</a></div>
                            </div>
                        </div>        
                    </div>
                    </li>)
                    }
                </ul>
                <div className="white_space2"></div>
            </div>
               }
               if(state.hot_product.length) {
                data1 =  <div className="have">
                <div className="tit">
               <div><Checkbox checked={state.check_hot} onClick={ () => {hotCheck(); dispatch({type:'math_price'})}}></Checkbox>常温配</div>
    {state.postPrice_hot > 0 ? <p>还差{state.postPrice_hot ? state.postPrice_hot.toFixed(2): 99.00}元包邮<a>去凑单</a></p> : <p>已包邮</p>}
                </div>
                <ul className='card'>
                    {
                        state.hot_product.map((item) => 
                        <li key={item._id}>
                    <Checkbox checked={item.ischeck} onClick={() => {
                        select(item),
                        controlAll();
                    }}></Checkbox>
                    <div className="product_inf">
                        <img src={item.imageUrl}/>    
                        <div className="inf">
                            <h3>{item.productName}</h3>
                            <div className="price">
                                <p>￥<span>{item.price.price}</span></p>
                                <div className="quantity"><a className="jian" onClick={
                                    jian.bind(null,item)
                                }>-</a><input value={item.num}
                                onChange={(e) => {
                                   let result = e.target.value
                                   changenum(item,result)
                                }}
                                onBlur={ item.num == false ?  () =>
                                    alert("",'确定要删除该商品吗', [
                                      { text: '取消', onPress: () => {changenum(item,1)} },
                                      { text: '确定', onPress: () => {del_pro(item)} },
                                    ]) : null 
                                  }
                                /><a className="jia" onClick={
                                    jia.bind(null,item)
                                    }>+</a></div>
                            </div>
                        </div>        
                    </div>
                    </li>)
                    }
                </ul>
                <div className="white_space2"></div>
            </div>
              }
               return (<>{data} {data1}</>);
           })()  : <div className="none">
                <p className="title">购物车里还没有好吃的，您可以</p>
                <a onClick={()=> {
                    history.push('/home')
                }}>回首页逛逛</a>
            </div> }
            
           
        </div>  
    )
}

export default ProductCart;