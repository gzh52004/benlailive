import axios from 'axios'

const com = axios.create({
    baseURL: 'http://47.115.142.170:60005'
});

//登录
export const login = async (params, config = {}) => {
    // console.log(params, config)
    let { data } = await com.get('/user/login', {
        ...config,
        params
    })
    return data
}

//首页数据
export const homedata = async (params, config = {}) => {
    // console.log(params, config)
    let { data } = await com.get('/home/Gethomepage', {
        ...config,
        params
    })
    return data
}

//根据id查询数据
export const searchdataID = async (params, config = {}) => {
    // console.log(params, config)
    let { data } = await com.get('/good/selectGood', {
        ...config,
        params
    })
    return data
}
//查询所有商品数据
export const goodsdata = async (params, config = {}) => {
    // console.log(params, config)
    let { data } = await com.get('/good/selectGood', {
        ...config,
        params
    })
    return data
}

//根据价格排序
export const searchprice = async (params, config = {}) => {
    // console.log(params, config)
    let { data } = await com.get('/home/Gethomepage', {
        ...config,
        params
    })
    return data
}
//删除商品
export const deleteGoods = async (params, config = {}) => {
    // console.log(params, config)
    let { data } = await com.delete('/good/delGood', {
        ...config,
        params
    })
    return data
}
//添加商品
export const addGoods = async (formData) => {
    // console.log(params, config)
    let { data } = await com.post('/good/newGood',
        formData
        , { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    return data
}

//查询所有用户信息
export const userdata = async (params, config = {}) => {
    // console.log(params, config)
    let { data } = await com.get('/user/allUser', {
        ...config,
        params
    })
    return data
}
export default {
    login,
    homedata,
    searchdataID,
    searchprice,
    goodsdata,
    deleteGoods,
    addGoods,
    userdata
}