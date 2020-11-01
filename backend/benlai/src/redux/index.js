import { createStore } from 'redux'
import Api from '../utils/api'
const initState = {
    goodslist: { id: null, productName: '', price: {} }
}

const reducer = function (state = initState, action) {
    switch (action.type) {
        //添加商品
        case 'add_to_goods':
            console.log(action.goods);
            let formdata = new FormData()
            let prices = JSON.stringify(action.goods.price)
            formdata.append("price", prices)
            formdata.append("productSysNo", action.goods.id)
            formdata.append("productName", action.goods.productName)
            Api.addGoods(
                formdata
            ).then(res => {
                console.log(res);

            })
            return {
                goodslist: {
                    ...state.goodslist,
                    ...action.goods
                }
            }
        //修改商品价格
        case 'change_to_goods':
            console.log(action.goods);
            // let formdata = new FormData()
            // let prices = JSON.stringify(action.goods.price)
            // formdata.append("price", prices)
            // formdata.append("productSysNo", action.goods.id)
            // formdata.append("productName", action.goods.productName)
            // Api.addGoods(
            //     formdata
            // ).then(res => {
            //     console.log(res);

            // })
            return {
                goodslist: {
                    ...state.goodslist,
                    ...action.goods
                }
            }
        default:
            return state
    }

    // return state
}


const store = createStore(reducer)


export default store