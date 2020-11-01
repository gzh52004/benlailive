import React,{useReducer} from 'react'
import {getItem,setItem,clearItem} from '../utils/localstorage'

const key1 = "hot_product";
const key2 = "cold_product";

const initState = {
    hot_product:getItem(key1) || [],
    cold_product:getItem(key2) || [],
    totalPrice:0,
    postPrice_hot:99.00,
    postPrice_cold:99.00,
    allcheck:false,
    check_hot:false,
    check_cold:false
}


const reducer = function(state,action) {
    switch (action.type) {
        // {type:'add_to_cart',goods}
        
        case 'add_to_cart': 
            if(action.item.promotionsTags.filter(item => item === "冷链配").length) {
               
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

            if(action.item.promotionsTags.filter(item => item === "冷链配").length) {

             
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
            if(action.item.promotionsTags.filter(item => item === "冷链配").length) {
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
        if(action.item.promotionsTags.filter(item => item === "冷链配").length) {
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
            
        if(action.payload.item.promotionsTags.filter(item => item === "冷链配").length) {
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
                        price2 = price2 + item.num * Number(item.price.price)
                    }
                })
                price2=price2.toFixed(1)
                price4 =99.00 - price2
            }
            return {
                ...state,
                totalPrice:price1*1 + price2*1,
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

        case 'checkAll':
            let cold = true;
            let hot = true;
            if(state.cold_product.length) {
                cold = state.cold_product.every(item => item.ischeck == true);
                state.check_cold = cold ;
            }
            if(state.hot_product.length) {
                hot = state.hot_product.every(item => item.ischeck == true);
                state.check_hot = hot;
            }
            return {
                ...state,
                allcheck:cold && hot
            }
            return
        // {type:'change_qty',id,qty}
        case 'del_product':
            state = {
                ...state,
                cold_product:state.cold_product.filter(item=> item.ischeck != true),
                hot_product:state.hot_product.filter(item=> item.ischeck != true),
            }
            setItem(key2,state.cold_product)
            setItem(key1,state.hot_product)
            return state
        case 'allSelect':

              state.cold_product.map(item => item.ischeck = action.allcheck);
            // console.log(cold1)

            state.hot_product.forEach(item=> item.ischeck = action.allcheck)
           
            return {
                ...state,
                allcheck:action.allcheck,
                check_cold:action.allcheck,
                check_hot:action.allcheck
            }
        case "select_hot":

            
                state.hot_product.forEach(item => item.ischeck = !state.check_hot)
                if(state.cold_product.length) {
                    state.allcheck = state.check_cold && !state.check_hot
                } else {
                    state.allcheck = !state.check_hot
                }
                
                return {
                    ...state,
                    check_hot:!state.check_hot,
                    
                }
            
        case "select_cold":
            
                state.cold_product.forEach(item => item.ischeck = !state.check_cold)
                if(state.hot_product.length) {
                state.allcheck= !state.check_cold && state.check_hot
                } else {
                    state.allcheck = !state.check_cold
                }
                return {
                    ...state,
                    check_cold:!state.check_cold,
                   
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