import React,{useReducer} from 'react'
import {getItem,setItem,clearItem} from '../utils/localstorage'

const key1 = "hot_product";
const key2 = "cold_product";

const initState = {
    hot_product:getItem(key1) || [],
    cold_product:getItem(key2) || [],
    totalPrice:0,
    postPrice_hot:99.00,
    postPrice_cold:99.00
}


const reducer = function(state,action) {
    switch (action.type) {
        // {type:'add_to_cart',goods}
        
        case 'add_to_cart':        
            if(action.item.promotionsTags.filter(item => item === "冷链配")) {
                action.item.ischeck = false
                action.item.num = 1;
                state = {
                    ...state,
                    cold_product: [ ...state.cold_product,action.item]
                }
                setItem(key2,state.cold_product)
                return state
                
            } else{
                action.item.ischeck = false;
                action.item.num = 1;
                state={
                    ...state,
                    hot_product: [...state.hot_product,action.item]
                }
                setItem(key1,state.hot_product)
                return  state
            }
        case   "product_select":

            if(action.item.promotionsTags.filter(item => item === "冷链配")) {

             
                state = {
                    ...state,
                    cold_product:state.cold_product.map(item => {if(item.productSysNo === action.item.productSysNo){
                        item.ischeck = !item.ischeck
                    } 
                    return item
                    })
                }
                setItem(key2,state.cold_product)
                return state
                
            } else{
                state={
                    ...state,
                    hot_product: state.hot_product.map(item => {if(item.productSysNo === action.item.productSysNo){
                        item.ischeck = !item.ischeck
                    } 
                    return item
                    })
                }
                setItem(key1,state.hot_product)
                return  state
            }
        case "prev_num":
            if(action.item.promotionsTags.filter(item => item === "冷链配")) {
                state = {
                    ...state,
                    cold_product:state.cold_product.map(item => {if(item.productSysNo === action.item.productSysNo){
                        if(item.num > 1) {
                            item.num--;
                        } else{
                            item.num = 1
                        }
                    } 
                    return item
                    })
                }
                setItem(key2,state.cold_product)
                return state
                
            } else{
                state={
                    ...state,
                    hot_product: state.hot_product.map(item => {if(item.productSysNo === action.item.productSysNo){
                        if(item.num > 1) {
                            item.num--;
                        } else{
                            item.num = 1
                        }
                    } 
                    return item
                    })
                }
                setItem(key1,state.hot_product)
                return  state
            }
        case "inc_num":
        if(action.item.promotionsTags.filter(item => item === "冷链配")) {
            state = {
                ...state,
                cold_product:state.cold_product.map(item => {if(item.productSysNo === action.item.productSysNo){
                    if(item.num < 99) {
                        item.num++
                    } else {
                        item.num = 99
                    }
                   
                } 
                return item
                })
            }
            setItem(key2,state.cold_product)
            return state
            
        } else{
            state={
                ...state,
                hot_product: state.hot_product.map(item => {if(item.productSysNo === action.item.productSysNo){
                    if(item.num < 99) {
                        item.num++
                    } else {
                        item.num = 99
                    }
                } 
                return item
                })
            }
            setItem(key1,state.hot_product)
            return  state
        }
        case "change_num":
            
        if(action.payload.item.promotionsTags.filter(item => item === "冷链配")) {
            state = {
                ...state,
                cold_product:state.cold_product.map(item => {if(item.productSysNo === action.payload.item.productSysNo){
                    if(action.payload.num < 99) {
                        item.num = action.payload.num
                    } else {
                        item.num = 99
                    }
                    
                } 
                return item
                })
            }
            setItem(key2,state.cold_product)
          
            return state
            
        } else{
            state={
                ...state,
                hot_product: state.hot_product.map(item => {if(item.productSysNo === action.payload.item.productSysNo){
                    if(action.payload.num < 99) {
                        item.num = action.payload.num
                    } else {
                        item.num = 99
                    }
                } 
                return item
                })
            }
            setItem(key1,state.hot_product)
            return  state
        }
        case "math_price":
            let price1 = 0;
            let price3 ;
            let price4;
            let price2 = 0;
            if(state.cold_product.length) {
                state.cold_product.forEach(item => {
                    if(item.ischeck) {
                        price1 = price1 + item.num * Number(item.price.price)
                    }
                })
                price1=price1.toFixed(1)
                price3 = 99.00 - price1
            }
            if(state.hot_product.length) {
                 state.hot_product.forEach(item => {
                    if(item.ischeck) {
                        price1 = price1 + item.num * Number(item.price.price)
                    }
                })
                price2=price2.toFixed(1)
                price4 =99.00 - price2
            }
            return {
                ...state,
                totalPrice:price1 + price2,
                postPrice_hot:price4,
                postPrice_cold:price3
            }
        case 'remove_from_cart':
            state = {
                ...state,
                hot_product: state.hot_product.filter(item => item.productSysNo != action.item.productSysNo),
                cold_product: state.cold_product.filter(item => item.productSysNo != action.item.productSysNo)
            }
            setItem(key1,state.hot_product)
            setItem(key2,state.cold_product)
            return state
        // {type:'clear_cart'}
        case 'clear_cart':
            
            return {
                ...state,
                goodslist: []
            }
        // {type:'change_qty',id,qty}
        case 'change_qty':
            const goodslist = state.goodslist.map(item => {
                if (item.id === action.id) {
                    item.qty = action.qty
                }
                return item;
            })
            return {
                ...state,
                goodslist
            }
        default:
            throw new Error('error');
    }
}

export const MyContext = React.createContext()

export const Provider = (props) => {
    const [state,dispatch] = useReducer(reducer,initState)
    
    
    return (
        <MyContext.Provider value={{state,dispatch}}>
            {props.children}
        </MyContext.Provider>
    )
}