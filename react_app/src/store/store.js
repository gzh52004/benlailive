import React,{useReducer} from 'react'

const initState = {
    goodslist:[
        { id: 1, name: "goods1", price: 98, qty: 2 },
        { id: 2, name: "goods2", price: 198, qty: 2 },
        { id: 3, name: "goods3", price: 998, qty: 1 },
    ]
}

const reducer = function(state,action) {
    switch (action.type) {
        // {type:'add_to_cart',goods}
        case 'add_to_cart':
            return {
                ...state,
                goodslist: [action.goods, ...state.goodslist]
            }

        // {type:'remove_from_cart',id}
        case 'remove_from_cart':
            return {
                ...state,
                goodslist: state.goodslist.filter(item => item.id != action.id)
            }
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
    console.log(state,dispatch,1234)
    return (
        <MyContext.Provider value={{state,dispatch}}>
            {props.children}
        </MyContext.Provider>
    )
}